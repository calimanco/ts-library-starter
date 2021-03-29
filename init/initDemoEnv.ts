import { mkdirSync } from 'fs'
import { execSync } from 'child_process'
import { join } from 'path'
import * as colors from 'colors'
import { getLang } from './common'

export default async function initDemoEnv(): Promise<boolean> {
  let isFinish = true

  try {
    execSync('npm i play-anywhere --save-dev')
    mkdirSync(join(__dirname, 'demos'))
    console.log(colors.green(getLang(28)))
  } catch (err) {
    console.group(colors.underline.red(getLang(29)))
    console.log(colors.reset(err.message))
    console.groupEnd()
    isFinish = false
  }
  return isFinish
}