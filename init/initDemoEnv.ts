import { mkdirSync } from 'fs'
import { execSync } from 'child_process'
import { join } from 'path'
import chalk from 'chalk'
import { getLang } from './common'

export default async function initDemoEnv(): Promise<boolean> {
  let isFinish = true
  let log = ''

  try {
    console.log(getLang(30))
    log = execSync(
      'npm i play-anywhere --save-dev --no-package-lock'
    ).toString()
    mkdirSync(join(__dirname, '..', 'demos'))
    console.group(chalk.underline(getLang(31)))
    console.log(chalk.green(getLang(28)))
    console.groupEnd()
  } catch (err) {
    console.group(chalk.underline.red(getLang(29)))
    console.log(err.message)
    console.groupEnd()
    isFinish = false
  }
  if (process.env.DEBUG === 'on') {
    console.log(log.toString())
  }
  return isFinish
}
