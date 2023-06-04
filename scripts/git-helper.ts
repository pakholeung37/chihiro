import simpleGit from 'simple-git'
import process from 'process'

export const git = simpleGit()

// 获取本地仓库状态
export const gitStatus = async () => {
  const status = await git.status()
  return status
}

// 获取当前分支仅支持 develop 与 release/1.*.x
export const gitCurrentBranch = async () => {
  const branch = process.env.GITTAR_BRANCH
  if (branch) return branch
  const branchs = await git.branch()
  return branchs.current
}

// 添加到
export async function commit(msg: string) {
  await git.add('.')
  await git.commit(msg, { '--no-verify': null })
}

// 打分支
export async function tag(tagName: string, desc = `${tagName}`) {
  await git.addAnnotatedTag(tagName, desc)
}

// 推送
export async function push() {
  const branch = await gitCurrentBranch()
  await git.push('origin', branch)
  await git.pushTags('origin')
}

// 恢复
export async function reset() {
  await git.checkout('.')
}
