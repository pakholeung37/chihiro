declare module '*.png'
declare module '*.svg'
declare module '*.scss'

interface Window {
  TRuntime: any
  TDesignEditor: any
}

declare module '*?worker' {
  class ViteWorker extends Worker {
    constructor()
  }

  export default ViteWorker
}

interface ImportMetaEnv {
  readonly VITE_SERVER_ENV: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
