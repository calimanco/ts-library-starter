import { execSync } from 'child_process'

const dependencyList = [
  'colors',
  'prompt',
  'which',
  '@types/which',
  '@types/prompt'
]

try {
  const listStr = dependencyList.reduce((result, i) => {
    result += ' ' + i
    return result
  }, '')
  console.log('Cleaning up dependencies, please wait...')
  execSync(`npm uninstall${listStr}`)
  console.group('Uninstalled')
  console.log(dependencyList.join('\n'))
  console.groupEnd()
} catch (err) {
  console.error(err)
}
