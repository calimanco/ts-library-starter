import prompt from 'prompt'
import chalk from 'chalk'
import { getLang } from './common'

const properties: prompt.RevalidatorSchema[] = [
  {
    name: 'libraryName',
    description: '',
    pattern: /^[a-z\d]+(-[a-z\d]+)*$/,
    type: 'string',
    required: true,
    default: '',
    message: ''
  },
  {
    name: 'description',
    description: '',
    type: 'string',
    default: ''
  },
  {
    name: 'isDemoEnv',
    description: '',
    pattern: /^(y(es)?|n(o)?)$/i,
    type: 'string',
    required: true,
    default: 'yes',
    message: ''
  }
]

export default async function setLibraryName(
  defaultName: string
): Promise<{ libraryName: string; description: string; isDemoEnv: string }> {
  return await new Promise((resolve, reject) => {
    properties[0].description = chalk.cyan(getLang(8))
    properties[0].message = getLang(9)
    properties[1].description = chalk.cyan(getLang(21))
    properties[2].description = chalk.cyan(getLang(27))
    properties[2].message = getLang(23)

    if (defaultName != null) {
      properties[0].default = defaultName
    }

    prompt.get(properties, (err: any, res: any) => {
      if (err != null) {
        reject(err)
        return
      }
      resolve(res)
    })
  })
}
