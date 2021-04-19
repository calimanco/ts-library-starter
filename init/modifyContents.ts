import path from 'path'
import fs from 'fs'
import colors from 'colors'
import { getLang } from './common'

async function replaceInfile(
  filePath: string,
  from: RegExp[],
  to: string[]
): Promise<void> {
  return await new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, buffer) => {
      if (err != null) {
        reject(err)
        return
      }
      let content = buffer.toString()
      let point = 0
      for (const reg of from) {
        content = content.replace(reg, to[point])
        point += 1
      }
      fs.writeFile(filePath, content, err => {
        if (err != null) {
          reject(err)
          return
        }
        resolve()
      })
    })
  })
}

export default async function modifyContents(
  modifyFiles: string[],
  from: RegExp[],
  to: string[]
): Promise<boolean> {
  const length = modifyFiles.length
  let isFinish = true
  const resultMsg: string[] = []
  const errMsg: string[] = []

  if (length === 0) {
    return isFinish
  }

  await new Promise<void>(resolve => {
    for (const f of modifyFiles) {
      replaceInfile(path.resolve(__dirname, '..', f), from, to)
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
    console.group(colors.underline.white(getLang(4)))
    console.log(colors.yellow(resultMsg.join('\n')))
    console.groupEnd()
  }

  if (errMsg.length !== 0) {
    console.group(colors.underline.red(getLang(7)))
    console.log(colors.reset(errMsg.join('\n')))
    console.groupEnd()
    isFinish = false
  }

  return isFinish
}
