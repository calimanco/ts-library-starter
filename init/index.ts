import { ISetupConfig } from './types'
import prompt from 'prompt'
import * as colors from 'colors'
import * as which from 'which'
import { execSync } from 'child_process'
import {
  readLangDir,
  isSkipAsking,
  getLang,
  getLibraryNameSuggested,
  setLangPkg
} from './common'

import setLanguage from './setLanguage'
import setLibraryConfig from './setLibraryConfig'
import setAuthorInfo from './setAuthorInfo'
import setGitConfig from './setGitConfig'
import setupLibrary from './setupLibrary'
import { langDir } from './config'

// 清屏
process.stdin.write('\x1B[2J\x1B[0f')

const setupConfig: ISetupConfig = {
  libraryName: '',
  description: '',
  author: '',
  email: '',
  remote: '',
  branch: 'main',
  firstCommitMsg: 'First commit.',
  isPush: false,
  isDemoEnv: true,
  year: new Date().getFullYear().toString()
}

// @ts-ignore
// eslint-disable-next-line no-import-assign
prompt.message = ''
prompt.start()

// 检查 git 支持。
if (which.sync('git') == null) {
  console.log(
    colors.red(
      'Sorry, this script requires git. Please make sure you have git and re-run "npm install".'
    )
  )
  process.exit(1)
}

// 获取 git 的用户名和邮箱
setupConfig.author = execSync('git config user.name').toString().trim()
setupConfig.email = execSync('git config user.email').toString().trim()

// 获取建议的库名
setupConfig.libraryName = getLibraryNameSuggested()

void main()

async function main(): Promise<void> {
  // 读取语言包
  console.log(colors.cyan(`Loading language packages...`))
  const langPkgList = await readLangDir(langDir)

  // 检查是否是跳过询问。
  if (isSkipAsking()) {
    console.log(colors.cyan(`Skip asking question`))
    await setLangPkg(langPkgList[0])
    await setupLibrary(setupConfig)
    process.exit(0)
  }

  // 配置阶段
  try {
    // 设置语言
    await setLanguage(langPkgList)

    // 欢迎语
    console.log(colors.magenta(`\n${getLang(0)}\n`))

    // 设置库名
    const { libraryName, description, isDemoEnv } = await setLibraryConfig(
      setupConfig.libraryName
    )
    setupConfig.libraryName = libraryName.trim()
    setupConfig.description = description.trim()
    setupConfig.isDemoEnv = isDemoEnv.toLowerCase().charAt(0) === 'y'

    // 设置用户名和邮箱
    const { author, email } = await setAuthorInfo(
      setupConfig.author,
      setupConfig.email
    )
    setupConfig.author = author.trim()
    setupConfig.email = email.trim()

    // 设置 git 配置
    const { remote, branch, firstCommitMsg, isPush } = await setGitConfig()
    setupConfig.remote = remote.trim()
    setupConfig.branch = branch.trim()
    setupConfig.firstCommitMsg = firstCommitMsg.trim()
    setupConfig.isPush = isPush.toLowerCase().charAt(0) === 'y'
  } catch (error) {
    console.error(getLang(10), error)
    process.exit(1)
  }

  // 执行阶段
  try {
    await setupLibrary(setupConfig)
  } catch (error) {
    console.error(getLang(26), error)
    process.exit(1)
  }
}
