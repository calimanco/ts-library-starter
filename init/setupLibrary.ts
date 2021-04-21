import { ISetupConfig } from './types'
import chalk from 'chalk'
import removeItems from './removeItems'
import modifyContents from './modifyContents'
import renameItems from './renameItems'
import finalize from './finalize'
import initGit from './initGit'
import initDemoEnv from './initDemoEnv'
import { getLang } from './common'
import { rmDirs, rmFiles, modifyFiles, renameFiles } from './config'

export default async function setupLibrary(
  setupConfig: ISetupConfig
): Promise<void> {
  const {
    libraryName,
    description,
    author,
    email,
    remote,
    branch,
    firstCommitMsg,
    isPush,
    isDemoEnv,
    year
  } = setupConfig

  // 打印配置
  console.group(chalk.underline(`${getLang(1)}`))
  for (const key of Object.keys(setupConfig) as Array<
    keyof typeof setupConfig
  >) {
    console.log(`${key}: ${setupConfig[key] as string}`)
  }
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

  // 初始化 demo 环境
  let isInitDemoEnv = true
  if (isDemoEnv) {
    isInitDemoEnv = await initDemoEnv()
    console.log('')
  }

  // 清理目录和文件
  const isRemoveFinished = await removeItems(rmDirs.concat(rmFiles))
  console.log('')

  // 善后
  const isFinalizeFinished = await finalize(setupConfig)
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
    isInitDemoEnv &&
    isInitGitFinished &&
    isFinalizeFinished
  ) {
    console.log(chalk.cyan(getLang(14)))
  } else {
    console.log(chalk.yellow(getLang(15)))
  }
  console.log('')
  console.log(getLang(32))
  console.log('npm run clear-init-dependencies')
  console.log('')
}
