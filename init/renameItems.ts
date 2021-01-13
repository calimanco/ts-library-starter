import * as path from 'path'
import * as colors from 'colors'
import { mv } from 'shelljs'
import { getLang } from './common'

function rename(name: string, from: RegExp[], to: string[]) {
  let result = name
  from.forEach((reg, idx) => {
    result = name.replace(reg, to[idx])
  })
  return result
}

export default async function renameItems(
  renameItems: string[][],
  from: RegExp[],
  to: string[]
) {
  let isFinish = true
  const resultMsg: string[] = []
  const errMsg: string[] = []

  if (renameItems.length === 0) {
    return isFinish
  }

  renameItems.forEach(f => {
    try {
      // f[0] 是原文件
      // f[1] 是新文件
      const newName = rename(f[1], from, to)
      mv(
        path.resolve(__dirname, '..', f[0]),
        path.resolve(__dirname, '..', newName)
      )
      resultMsg.push(`${f[0]} => ${newName}`)
    } catch (err) {
      errMsg.push(err.message)
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
