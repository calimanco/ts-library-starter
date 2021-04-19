import path from 'path'
import colors from 'colors'
import { rename } from 'fs'
import { getLang } from './common'

function renameFile(name: string, from: RegExp[], to: string[]): string {
  let result = name
  let point = 0
  for (const reg of from) {
    result = name.replace(reg, to[point])
    point += 1
  }
  return result
}

export default async function renameItems(
  renameItems: string[][],
  from: RegExp[],
  to: string[]
): Promise<boolean> {
  const length = renameItems.length
  let isFinish = true
  const resultMsg: string[] = []
  const errMsg: string[] = []

  if (length === 0) {
    return isFinish
  }

  await new Promise<void>(resolve => {
    for (const f of renameItems) {
      const newName = renameFile(f[1], from, to)
      rename(
        path.resolve(__dirname, '..', f[0]),
        path.resolve(__dirname, '..', newName),
        err => {
          if (err != null) {
            errMsg.push(err.message)
            if (length === resultMsg.length + errMsg.length) {
              resolve()
            }
            return
          }
          resultMsg.push(`${f[0]} => ${newName}`)
          if (length === resultMsg.length + errMsg.length) {
            resolve()
          }
        }
      )
    }
  })

  if (resultMsg.length !== 0) {
    console.group(colors.underline.white(getLang(3)))
    console.log(colors.green(resultMsg.join('\n')))
    console.groupEnd()
  }

  if (errMsg.length !== 0) {
    console.group(colors.underline.red(getLang(6)))
    console.log(colors.reset(errMsg.join('\n')))
    console.groupEnd()
    isFinish = false
  }

  return isFinish
}
