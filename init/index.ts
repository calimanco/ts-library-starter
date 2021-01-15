// @ts-ignore
import * as prompt from 'prompt'
import * as colors from 'colors'
import { echo, exec, which, exit, config } from 'shelljs'
import {
  readLangDir,
  isSkipAsking,
  getLang,
  getLibraryNameSuggested
} from './common'

import setLanguage from './setLanguage'
import setLibraryConfig from './setLibraryConfig'
import setAuthorInfo from './setAuthorInfo'
import setGitConfig from './setGitConfig'
import setupLibrary from './setupLibrary'
import { langDir } from './config'

// 清屏
echo('\x1B[2J\x1B[0f')

config.fatal = true

const setupConfig = {
  libraryName: '',
  description: '',
  author: '',
  email: '',
  remote: '',
  branch: 'main',
  firstCommitMsg: 'First commit.',
  isPush: false,
  year: new Date().getFullYear().toString()
}

prompt.start()
prompt.message = ''

// 检查 git 支持。
if (!which('git')) {
  console.log(
    colors.red(
      'Sorry, this script requires git. Please make sure you have git and re-run "npm install".'
    )
  )
  exit(1)
}

// 获取 git 的用户名和邮箱
setupConfig.author = exec('git config user.name', {
  silent: true
}).stdout.trim()
setupConfig.email = exec('git config user.email', {
  silent: true
}).stdout.trim()

// 获取建议的库名
setupConfig.libraryName = getLibraryNameSuggested()

main()

async function main() {
  // 检查是否是跳过询问。
  if (isSkipAsking()) {
    console.log(colors.cyan(`Skip asking question`))
    await setupLibrary(setupConfig)
    exit(0)
  }

  // 读取语言包
  console.log(colors.cyan(`Loading language packages...`))
  const langPkgList = await readLangDir(langDir)

  try {
    // 设置语言
    await setLanguage(langPkgList)

    // 欢迎语
    console.log(colors.magenta(`\n${getLang(0)}\n`))

    // 设置库名
    const { libraryName, description } = await setLibraryConfig(
      setupConfig.libraryName
    )
    setupConfig.libraryName = libraryName.trim()
    setupConfig.description = description.trim()

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
    exit(1)
  }

  await setupLibrary(setupConfig)
}
