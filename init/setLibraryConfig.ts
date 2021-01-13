// @ts-ignore
import * as prompt from 'prompt'
import * as colors from 'colors'
import { getLang } from './common'

const schema = {
  properties: {
    libraryName: {
      description: '',
      pattern: /^[a-z\d]+(\-[a-z\d]+)*$/,
      type: 'string',
      required: true,
      default: '',
      message: ''
    },
    description: {
      description: '',
      type: 'string',
      default: ''
    }
  }
}

export default function setLibraryName(defaultName: string) {
  return new Promise<{ libraryName: string; description: string }>(
    (resolve, reject) => {
      schema.properties.libraryName.description = colors.cyan(getLang(8))
      schema.properties.libraryName.message = getLang(9)
      schema.properties.description.description = colors.cyan(getLang(21))

      if (defaultName) {
        schema.properties.libraryName.default = defaultName
      }

      prompt.get(schema, (err: any, res: any) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    }
  )
}
