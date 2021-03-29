import { mkdirSync } from 'fs'
import { execSync } from 'child_process'
import { join } from 'path'
import * as colors from 'colors'
import { getLang } from './common'

export default async function initDemoEnv(): Promise<boolean> {
  let isFinish = true

  try {
    console.log(getLang(30))
    execSync('npm i play-anywhere --save-dev --no-package-lock')
    mkdirSync(join(__dirname, '..', 'demos'))
    console.group(colors.underline.white(getLang(31)))
    console.log(colors.green(getLang(28)))
    console.groupEnd()
  } catch (err) {
    console.group(colors.underline.red(getLang(29)))
    console.log(colors.reset(err.message))
    console.groupEnd()
    isFinish = false
  }
  return isFinish
}
