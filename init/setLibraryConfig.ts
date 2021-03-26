import * as prompt from 'prompt'
import * as colors from 'colors'
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
  }
]

export default async function setLibraryName(
  defaultName: string
): Promise<{ libraryName: string; description: string }> {
  return await new Promise((resolve, reject) => {
    properties[0].description = colors.cyan(getLang(8))
    properties[0].message = colors.reset(getLang(9))
    properties[1].description = colors.cyan(getLang(21))

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
