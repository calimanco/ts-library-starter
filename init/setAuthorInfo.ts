// @ts-ignore
import * as prompt from 'prompt'
import { getLang } from './common'
import * as colors from 'colors'

const schema = {
  properties: {
    author: {
      description: '',
      type: 'string',
      required: true,
      default: ''
    },
    email: {
      description: '',
      pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
      type: 'string',
      required: true,
      default: '',
      message: ''
    }
  }
}

export default function setAuthorInfo(
  defaultAuthor: string,
  defaultEmail: string
) {
  return new Promise<{ author: string; email: string }>((resolve, reject) => {
    schema.properties.author.description = colors.cyan(getLang(11))
    schema.properties.email.description = colors.cyan(getLang(12))
    schema.properties.email.message = colors.reset(getLang(13))

    if (defaultAuthor) {
      schema.properties.author.default = defaultAuthor
    }
    if (defaultEmail) {
      schema.properties.email.default = defaultEmail
    }

    prompt.get(schema, (err: any, res: any) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}
