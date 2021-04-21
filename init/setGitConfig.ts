import prompt from 'prompt'
import chalk from 'chalk'
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
    properties[0].description = chalk.cyan(getLang(16))
    properties[1].description = chalk.cyan(getLang(17))
    properties[2].description = chalk.cyan(getLang(18))
    properties[3].description = chalk.cyan(getLang(22))
    properties[3].message = getLang(23)

    prompt.get(properties, (err: any, res: any) => {
      if (err != null) {
        reject(err)
        return
      }
      resolve(res)
    })
  })
}
