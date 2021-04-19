import prompt from 'prompt'
import colors from 'colors'
import { getLang } from './common'

const properties: prompt.RevalidatorSchema[] = [
  {
    name: 'author',
    description: '',
    type: 'string',
    required: true,
    default: ''
  },
  {
    name: 'email',
    description: '',
    pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
    type: 'string',
    required: true,
    default: '',
    message: ''
  }
]

export default async function setAuthorInfo(
  defaultAuthor: string,
  defaultEmail: string
): Promise<{ author: string; email: string }> {
  return await new Promise((resolve, reject) => {
    properties[0].description = colors.cyan(getLang(11))
    properties[1].description = colors.cyan(getLang(12))
    properties[1].message = colors.reset(getLang(13))

    if (defaultAuthor != null) {
      properties[0].default = defaultAuthor
    }
    if (defaultEmail != null) {
      properties[1].default = defaultEmail
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
