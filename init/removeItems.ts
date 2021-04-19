import path from 'path'
import colors from 'colors'
import rmR from '../tools/rmR'
import { getLang } from './common'

export default async function removeItems(rmItems: string[]): Promise<boolean> {
  const length = rmItems.length
  let isFinish = true
  const resultMsg: string[] = []
  const errMsg: string[] = []

  if (length === 0) {
    return isFinish
  }

  await new Promise<void>(resolve => {
    for (const f of rmItems) {
      rmR(path.join(__dirname, '..', f))
        .then(() => {
          resultMsg.push(f)
          if (length === resultMsg.length + errMsg.length) {
            resolve()
          }
        })
        .catch(err => {
          errMsg.push(err.message)
          if (length === resultMsg.length + errMsg.length) {
            resolve()
          }
        })
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
