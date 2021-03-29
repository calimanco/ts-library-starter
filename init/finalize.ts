import { ISetupConfig } from './types'
import * as path from 'path'
import * as fs from 'fs'
import * as colors from 'colors'
import { getLang } from './common'

async function modifyPkgFile(setupConfig?: ISetupConfig): Promise<string> {
  const jsonPackage = path.resolve(__dirname, '..', 'package.json')
  return await new Promise((resolve, reject) => {
    fs.readFile(jsonPackage, (err, buffer) => {
      if (err != null) {
        reject(err)
        return
      }
      const pkg = JSON.parse(buffer.toString())
      delete pkg.scripts.postinstall
      if (setupConfig?.isDemoEnv === true) {
        pkg.scripts['dev:web'] = 'play-anywhere demos'
      }
      fs.writeFile(jsonPackage, JSON.stringify(pkg, null, 2) + '\n', err => {
        if (err != null) {
          reject(err)
          return
        }
        resolve('package.json updated')
      })
    })
  })
}

async function modifyGitignore(): Promise<string> {
  const gitignore = path.resolve(__dirname, '..', '.gitignore')
  return await new Promise((resolve, reject) => {
    fs.readFile(gitignore, (err, buffer) => {
      if (err != null) {
        reject(err)
        return
      }
      const str = buffer.toString().replace('package-lock.json', '')
      fs.writeFile(gitignore, str, err => {
        if (err != null) {
          reject(err)
          return
        }
        resolve('.gitignore updated')
      })
    })
  })
}

export default async function finalize(
  setupConfig: ISetupConfig
): Promise<boolean> {
  let isFinish = true
  const resultMsg: string[] = []
  const errMsg: string[] = []
  const taskList: Array<(setupConfig?: ISetupConfig) => Promise<string>> = [
    modifyPkgFile,
    modifyGitignore
  ]
  const length = taskList.length

  await new Promise<void>(resolve => {
    for (const task of taskList) {
      task(setupConfig)
        .then(res => {
          resultMsg.push(res)
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
