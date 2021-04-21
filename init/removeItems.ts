import path from 'path'
import chalk from 'chalk'
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
    console.group(chalk.underline(getLang(2)))
    console.log(chalk.red(resultMsg.join('\n')))
    console.groupEnd()
  }

  if (errMsg.length !== 0) {
    console.group(chalk.underline.red(getLang(5)))
    console.log(errMsg.join('\n'))
    console.groupEnd()
    isFinish = false
  }

  return isFinish
}
