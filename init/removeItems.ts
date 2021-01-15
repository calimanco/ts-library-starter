import * as path from 'path'
import * as colors from 'colors'
import { rm } from 'shelljs'
import { getLang } from './common'

export default async function removeItems(rmItems: string[]) {
  let isFinish = true
  const resultMsg: string[] = []
  const errMsg: string[] = []

  if (rmItems.length === 0) {
    return isFinish
  }

  rmItems.forEach(f => {
    try {
      rm('-rf', path.resolve(__dirname, '..', f))
      resultMsg.push(f)
    } catch (err) {
      errMsg.push(err.message)
    }
  })

  if (resultMsg.length !== 0) {
    console.group(colors.underline.white(getLang(2)))
    console.log(colors.red(resultMsg.join('\n')))
    console.groupEnd()
  }

  if (errMsg.length !== 0) {
    console.group(colors.underline.red(getLang(5)))
    console.log(colors.reset(errMsg.join('\n')))
    console.groupEnd()
    isFinish = false
  }

  return isFinish
}