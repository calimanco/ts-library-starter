// @ts-ignore
import * as prompt from 'prompt'
import * as colors from 'colors'
import { LangPkgInfo, setLangPkg } from './common'

const schema = {
  properties: {
    lang: {
      pattern: /0/,
      description: colors.cyan('Please set your language. (number)'),
      default: 0,
      message: '',
      required: true
    }
  }
}

export default function setLanguage(langPkgList: LangPkgInfo[]) {
  const maxIndex = langPkgList.length - 1

  console.group(
    colors.underline.white(`${langPkgList.length} language packages found`)
  )
  console.log(
    colors.reset(
      langPkgList.map((langPkg, idx) => `${idx}: ${langPkg.name}`).join('\n')
    )
  )
  console.groupEnd()

  schema.properties.lang.pattern = new RegExp(`[0-${maxIndex}]`)
  schema.properties.lang.message = colors.reset(`Must respond 0 to ${maxIndex}`)

  return new Promise((resolve, reject) => {
    prompt.get(schema, function (err: any, res: any) {
      if (err) {
        reject(err)
      }
      setLangPkg(langPkgList[res.lang])
        .then(langPkg => {
          resolve(langPkg)
        })
        .catch(err => {
          reject(err)
        })
    })
  })
}
