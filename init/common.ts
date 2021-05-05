import { ILangPkg, ILangPkgInfo } from './types'
import path from 'path'
import fs from 'fs'
import { kebabCase } from 'lodash'
import { defaultLang } from './config'

export async function readLangDir(name: string): Promise<ILangPkgInfo[]> {
  const dirPath = path.join(__dirname, name)
  const result: ILangPkgInfo[] = []

  async function buildLangPkgInfo(
    filePath: string,
    file: string,
    name: string
  ): Promise<void> {
    return await new Promise((resolve, reject) => {
      fs.lstat(filePath, (err, stats) => {
        if (err != null) {
          reject(err)
          return
        }
        if (stats.isFile()) {
          const pkgInfo = {
            name,
            file,
            filePath
          }
          if (name === defaultLang) {
            result.unshift(pkgInfo)
          } else {
            result.push(pkgInfo)
          }
        }
        resolve()
      })
    })
  }

  const files = await fs.promises.readdir(dirPath)
  const promises = []
  for (const file of files) {
    const filePath = path.join(dirPath, file)
    const { name, ext } = path.parse(filePath)
    if (ext.toLocaleLowerCase() !== '.json') {
      continue
    }
    promises.push(buildLangPkgInfo(filePath, file, name))
  }
  await Promise.all(promises)
  if (result.length === 0) {
    throw new Error('Can not find any language package.')
  }
  return result
}

export function isDebug(): boolean {
  if (process.env.CI != null || process.argv.includes('--debug')) {
    return true
  }

  if (typeof process.env.npm_config_argv !== 'undefined') {
    const npmConfigArgv = JSON.parse(process.env.npm_config_argv)
    return npmConfigArgv.original?.includes('--debug')
  }
  return false
}

export function isSkipAsking(): boolean {
  if (process.env.CI != null || process.argv.includes('-y')) {
    return true
  }

  if (typeof process.env.npm_config_argv !== 'undefined') {
    const npmConfigArgv = JSON.parse(process.env.npm_config_argv)
    return npmConfigArgv.original?.includes('-y')
  }
  return false
}

const langPkgCache: { [propName: string]: ILangPkg } = {}
let langPkgPointer: string = ''

export async function setLangPkg(langPkgInfo: ILangPkgInfo): Promise<ILangPkg> {
  return await new Promise((resolve, reject) => {
    if (typeof langPkgCache[langPkgInfo.name] !== 'undefined') {
      resolve(langPkgCache[langPkgInfo.name])
    }
    fs.readFile(langPkgInfo.filePath, (err, buffer) => {
      if (err != null) {
        reject(err)
      }
      try {
        langPkgCache[langPkgInfo.name] = JSON.parse(buffer.toString())
        langPkgPointer = langPkgInfo.name
        resolve(langPkgCache[langPkgInfo.name])
      } catch (err) {
        reject(err)
      }
    })
  })
}

export function getLang(num: string | number): string {
  if (langPkgPointer !== '') {
    return langPkgCache[langPkgPointer][String(num)]
  }
  throw new Error('No language set')
}

export function getLibraryNameSuggested(): string {
  return kebabCase(path.basename(path.join(__dirname, '..')))
}
