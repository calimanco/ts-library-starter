import * as colors from 'colors'
import * as path from 'path'
import removeItems from './removeItems'
import modifyContents from './modifyContents'
import renameItems from './renameItems'
import finalize from './finalize'
import initGit from './initGit'
import { getLang } from './common'
import { rmDirs, rmFiles, modifyFiles, renameFiles } from './config'
import { exec } from 'shelljs'

interface SetupConfig {
  libraryName: string
  description: string
  author: string
  email: string
  remote: string
  branch: string
  firstCommitMsg: string
  isPush: boolean
  year: string
}

export default async function setupLibrary(setupConfig: SetupConfig) {
  const {
    libraryName,
    description,
    author,
    email,
    remote,
    branch,
    firstCommitMsg,
    isPush,
    year
  } = setupConfig

  // 打印配置
  console.group(colors.underline.white(`${getLang(1)}`))
  Object.keys(setupConfig).forEach(key => {
    console.log(colors.reset(`${key}: ${(setupConfig as any)[key]}`))
  })
  console.groupEnd()
  console.log('')

  // 修改内容
  const isModifyFinished = await modifyContents(
    modifyFiles,
    [
      /--libraryname--/g,
      /--description--/g,
      /--author--/g,
      /--email--/g,
      /--remote--/g,
      /--branch--/g,
      /--year--/g
    ],
    [libraryName, description, author, email, remote, branch, year]
  )
  console.log('')

  // 文件改名
  const isRenameFinished = await renameItems(
    renameFiles,
    [/--libraryname--/g],
    [libraryName]
  )
  console.log('')

  // 清理目录和文件
  const isRemoveFinished = await removeItems(rmDirs.concat(rmFiles))
  console.log('')

  // 善后
  const isFinalizeFinished = await finalize()
  console.log('')

  // 初始化 git
  const isInitGitFinished = await initGit(
    author,
    email,
    remote,
    branch,
    firstCommitMsg,
    isPush
  )
  console.log('')

  if (
    isModifyFinished &&
    isRenameFinished &&
    isRemoveFinished &&
    isInitGitFinished &&
    isFinalizeFinished
  ) {
    console.log(colors.bold.cyan(getLang(14)))
  } else {
    console.log(colors.bold.yellow(getLang(15)))
  }
}
