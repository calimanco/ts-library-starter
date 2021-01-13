// @ts-ignore
import * as prompt from 'prompt'
import { getLang } from './common'
import * as colors from 'colors'

const schema = {
  properties: {
    remote: {
      description: '',
      type: 'string',
      default: ''
    },
    branch: {
      description: '',
      type: 'string',
      required: true,
      default: 'main'
    },
    firstCommitMsg: {
      description: '',
      type: 'string',
      required: true,
      default: 'First commit.'
    },
    isPush: {
      description: '',
      pattern: /^(y(es)?|n(o)?)$/i,
      type: 'string',
      required: true,
      default: 'no',
      message: ''
    }
  }
}

export default function setGitConfig() {
  return new Promise<{
    remote: string
    branch: string
    firstCommitMsg: string
    isPush: string
  }>((resolve, reject) => {
    schema.properties.remote.description = colors.cyan(getLang(16))
    schema.properties.branch.description = colors.cyan(getLang(17))
    schema.properties.firstCommitMsg.description = colors.cyan(getLang(18))
    schema.properties.isPush.description = colors.cyan(getLang(22))
    schema.properties.isPush.message = colors.cyan(getLang(23))

    prompt.get(schema, (err: any, res: any) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}
