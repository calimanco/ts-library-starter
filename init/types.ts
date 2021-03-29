export interface ISetupConfig {
  libraryName: string
  description: string
  author: string
  email: string
  remote: string
  branch: string
  firstCommitMsg: string
  isPush: boolean
  isDemoEnv: boolean
  year: string
}

export interface ILangPkg {
  [propName: string]: string
}

export interface ILangPkgInfo {
  name: string
  file: string
  filePath: string
}
