import prompt from 'prompt'
import * as colors from 'colors'
import { getLang } from './common'

const properties: prompt.RevalidatorSchema[] = [
  {
    name: 'remote',
    description: '',
    type: 'string',
    default: ''
  },
  {
    name: 'branch',
    description: '',
    type: 'string',
    required: true,
    default: 'main'
  },
  {
    name: 'firstCommitMsg',
    description: '',
    type: 'string',
    required: true,
    default: 'First commit.'
  },
  {
    name: 'isPush',
    description: '',
    pattern: /^(y(es)?|n(o)?)$/i,
    type: 'string',
    required: true,
    default: 'no',
    message: ''
  }
]

export default async function setGitConfig(): Promise<{
  remote: string
  branch: string
  firstCommitMsg: string
  isPush: string
}> {
  return await new Promise((resolve, reject) => {
    properties[0].description = colors.cyan(getLang(16))
    properties[1].description = colors.cyan(getLang(17))
    properties[2].description = colors.cyan(getLang(18))
    properties[3].description = colors.cyan(getLang(22))
    properties[3].message = colors.reset(getLang(23))

    prompt.get(properties, (err: any, res: any) => {
      if (err != null) {
        reject(err)
        return
      }
      resolve(res)
    })
  })
}
