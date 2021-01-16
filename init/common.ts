import * as path from 'path'
import * as fs from 'fs'
import kebabCase from 'lodash.kebabcase'
import { defaultLang } from './config'

export interface LangPkg {
  [propName: string]: string
}

export interface LangPkgInfo {
  name: string
  file: string
  filePath: string
}

export function readLangDir(name: string) {
  const dirPath = path.resolve(__dirname, name)
  return new Promise<LangPkgInfo[]>((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
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
  if (process.env.CI != null || process.argv.indexOf('-y') > -1) {
    return true
  }

  if (typeof process.env.npm_config_argv !== 'undefined') {
    const npm_config_argv = JSON.parse(process.env.npm_config_argv)
    return (
      npm_config_argv.original && npm_config_argv.original.indexOf('-y') > -1
    )
  }
  return false
}

const langPkgCache: { [propName: string]: LangPkg } = {}
let langPkgPointer: string = ''

export function setLangPkg(langPkg: LangPkgInfo) {
  return new Promise((resolve, reject) => {
    if (typeof langPkgCache[langPkg.name] !== 'undefined') {
      resolve(langPkgCache[langPkg.name])
    }
    fs.readFile(langPkg.filePath, (err, buffer) => {
      try {
        langPkgCache[langPkg.name] = JSON.parse(buffer.toString())
        langPkgPointer = langPkg.name
        resolve(langPkg)
      } catch (error) {
        reject(error)
      }
    })
  })
}

export function getLang(num: string | number) {
  if (langPkgPointer !== '') {
    return langPkgCache[langPkgPointer][String(num)]
  }
  throw 'No language set'
}

export function getLibraryNameSuggested() {
  return kebabCase(path.basename(path.resolve(__dirname, '..')))
}
