import fs from 'fs'
import glob from 'fast-glob'
import semver from 'semver'
import { execSync } from 'child_process'
import { gitCurrentBranch, commit, tag, push, reset } from './git-helper'
// eslint-disable-next-line import/no-relative-packages
import pkg from '../packages/app/package.json'

export async function modifyPkg(version: string) {
  if (!version || version === '') {
    console.log('Please provide a version as the second argument')
    process.exit(1)
  }

  return glob(['standalone/*/package.json', 'packages/*/package.json']).then(
    (packages) => {
      packages.forEach((packagePath) => {
        const packageJson = JSON.parse(
          fs.readFileSync(packagePath) as unknown as string,
        )
        packageJson.version = version
        fs.writeFileSync(
          packagePath,
          JSON.stringify(packageJson, null, 2) + '\n',
        )
      })
    },
  )
}

// 获取最新版本需要根据 package.json 中的 trantor version 来对当前主版本进行判定
export const getTrantorVersion = async (branch: string) => {
  const trantorVersion = semver.parse(pkg.version, true)

  console.log('branch ==================>', branch)
  let nextTrantorVersion
  if (!trantorVersion) throw new Error('Please use correct trantor version.')
  if (branch === 'develop') {
    // 开发版本
    nextTrantorVersion = semver.inc(trantorVersion, 'prerelease', 'beta')
  }
  if (/^release/.test(branch)) {
    // 正式版本
    nextTrantorVersion = semver.inc(trantorVersion, 'patch')
  }
  if (/^feature/.test(branch)) {
    // feature 分支版本
    const sem = semver.parse(trantorVersion)!
    nextTrantorVersion = `${sem.major}.${sem.minor}.${
      sem.patch
    }-dev-${Date.now()}`
  }
  if (!nextTrantorVersion) throw new Error('Please use next trantor version.')
  console.log(trantorVersion.version, '===>', nextTrantorVersion)
  return {
    current: trantorVersion.version,
    next: nextTrantorVersion,
  } as { current: string; next: string }
}

function writeVersionToEnv(version: string) {
  const env = process.env
  if (env.METAFILE) {
    console.log('write version to env file')
    execSync(`echo "trantor-version=${version}" >> $METAFILE`)
  } else {
    console.log('METAFILE is not set')
  }
}
// 版本发布
export const bump = async () => {
  const branch = await gitCurrentBranch()
  const { next } = await getTrantorVersion(branch)
  try {
    console.log('start publishing version ' + next)
    console.log('bump version')
    await modifyPkg(next)
    console.log('commit')
    await commit(next)
    await writeVersionToEnv(next)
    // 如果不是develop分支，直接丢弃
    if (branch === 'develop') {
      console.log('create tag ' + next)
      await tag(next)
      console.log('push to remote')
      await push()
    }
  } catch (e) {
    await reset()
    throw e
  }
}

bump()
