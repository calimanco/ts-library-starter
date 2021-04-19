import { ILangPkg, ILangPkgInfo } from './types'
import prompt from 'prompt'
import * as colors from 'colors'
import { setLangPkg } from './common'

const properties: prompt.RevalidatorSchema[] = [
  {
    name: 'lang',
    pattern: /0/,
    description: colors.cyan('Please set your language. (number)'),
    default: 0,
    message: '',
    required: true
  }
]

export default async function setLanguage(
  langPkgList: ILangPkgInfo[]
): Promise<ILangPkg> {
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

  properties[0].pattern = new RegExp(`[0-${maxIndex}]`)
  properties[0].message = colors.reset(`Must respond 0 to ${maxIndex}`)

  return await new Promise((resolve, reject) => {
    prompt.get(properties, (err, res: any) => {
      if (err != null) {
        reject(err)
        return
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
