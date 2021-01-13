import * as path from 'path'
import * as fs from 'fs'
import * as colors from 'colors'
import { getLang } from './common'

function modifyPkgFile() {
  const jsonPackage = path.resolve(__dirname, '..', 'package.json')
  return new Promise<string>((resolve, reject) => {
    fs.readFile(jsonPackage, (err, buffer) => {
      if (err) {
        reject(err)
        return
      }
      const pkg = JSON.parse(buffer.toString())
      delete pkg.scripts.postinstall
      fs.writeFile(jsonPackage, JSON.stringify(pkg, null, 2), err => {
        if (err) {
          reject(err)
          return
        }
        resolve('package.json updated')
      })
    })
  })
}

export default async function finalize() {
  let isFinish = true
  const resultMsg: string[] = []
  const errMsg: string[] = []

  try {
    const res = await modifyPkgFile()
    resultMsg.push(res)
  } catch (err) {
    errMsg.push(err.message)
  }

  if (resultMsg.length !== 0) {
    console.group(colors.underline.white(getLang(24)))
    console.log(colors.blue(resultMsg.join('\n')))
    console.groupEnd()
  }

  if (errMsg.length !== 0) {
    console.group(colors.underline.red(getLang(25)))
    console.log(colors.reset(errMsg.join('\n')))
    console.groupEnd()
    isFinish = false
  }

  return isFinish
}
