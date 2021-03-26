import * as path from 'path'
import * as fs from 'fs'
import { kebabCase } from 'lodash'
import { defaultLang } from './config'

export interface LangPkg {
  [propName: string]: string
}

export interface LangPkgInfo {
  name: string
  file: string
  filePath: string
}

export async function readLangDir(name: string): Promise<LangPkgInfo[]> {
  const dirPath = path.resolve(__dirname, name)
  return await new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err != null) {
        reject(err)
        return
      }
      const result: LangPkgInfo[] = []
      const filteredResult = files.filter(i => {
        return (
          path.extname(i).toLocaleLowerCase() === '.json' &&
          fs.statSync(path.resolve(dirPath, i)).isFile()
        )
      })
      if (filteredResult.length === 0) {
        reject(new Error('Can not find any language package.'))
        return
      }
      filteredResult.forEach(file => {
        const filePath = path.resolve(dirPath, file)
        const name = path.basename(file)
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
        resolve(result)
      })
    })
  })
}

export function isSkipAsking(): boolean {
  if (process.env.CI != null || process.argv.includes('-y')) {
    return true
  }

  if (typeof process.env.npm_config_argv !== 'undefined') {
    const npmConfigArgv = JSON.parse(process.env.npm_config_argv)
    return (
      npmConfigArgv.original != null &&
      npmConfigArgv.original.indexOf('-y') > -1
    )
  }
  return false
}

const langPkgCache: { [propName: string]: LangPkg } = {}
let langPkgPointer: string = ''

export async function setLangPkg(langPkg: LangPkgInfo): Promise<LangPkg> {
  return await new Promise((resolve, reject) => {
    if (typeof langPkgCache[langPkg.name] !== 'undefined') {
      resolve(langPkgCache[langPkg.name])
    }
    fs.readFile(langPkg.filePath, (err, buffer) => {
      if (err != null) {
        reject(err)
      }
      try {
        langPkgCache[langPkg.name] = JSON.parse(buffer.toString())
        langPkgPointer = langPkg.name
        resolve(langPkgCache[langPkg.name])
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
