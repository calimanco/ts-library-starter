import { ILangPkg, ILangPkgInfo } from './types'
import prompt from 'prompt'
import chalk from 'chalk'
import { setLangPkg } from './common'

const properties: prompt.RevalidatorSchema[] = [
  {
    name: 'lang',
    pattern: /0/,
    description: chalk.cyan('Please set your language. (number)'),
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
    chalk.underline(`${langPkgList.length} language packages found`)
  )
  console.log(
    langPkgList.map((langPkg, idx) => `${idx}: ${langPkg.name}`).join('\n')
  )
  console.groupEnd()

  properties[0].pattern = new RegExp(`[0-${maxIndex}]`)
  properties[0].message = `Must respond 0 to ${maxIndex}`

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
