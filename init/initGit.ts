import * as path from 'path'
import * as colors from 'colors'
import { exec } from 'shelljs'
import { getLang } from './common'

export default async function initGit(
  author: string,
  email: string,
  remote: string,
  branch: string,
  firstCommitMsg: string,
  isPush: boolean
) {
  let isFinish = true
  const resultMsg: string[] = []
  const errMsg: string[] = []

  const gitCommands = [
    `git init "${path.resolve(__dirname, '..')}"`,
    `git add -A`,
    `git config --local user.name "${author}"`,
    `git config --local user.email "${email}"`,
    `git commit -m "${firstCommitMsg}"`,
    `git branch -M "${branch}"`
  ]

  if (remote && remote.length > 0) {
    gitCommands.push(`git remote add origin "${remote}"`)

    if (isPush) {
      gitCommands.push(`git push -u origin ${branch}`)
    }
  }

  gitCommands.forEach(c => {
    try {
      let gitInitOutput = exec(c, {
        silent: true
      }).stdout
      if (gitInitOutput !== '') {
        resultMsg.push(gitInitOutput)
      }
    } catch (err) {
      errMsg.push(err.message)
    }
  })

  if (resultMsg.length !== 0) {
    console.group(colors.underline.white(getLang(19)))
    console.log(colors.green(resultMsg.join('\n')))
    console.groupEnd()
  }

  if (errMsg.length !== 0) {
    console.group(colors.underline.red(getLang(20)))
    console.log(colors.reset(errMsg.join('\n')))
    console.groupEnd()
    isFinish = false
  }

  return isFinish
}