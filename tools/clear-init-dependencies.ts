import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

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
  // run npm
  execSync(`npm uninstall${listStr}`)
  // edit package.json
  const jsonPackage = path.join(__dirname, '..', 'package.json')
  const pkg = JSON.parse(readFileSync(jsonPackage).toString())
  delete pkg.scripts['clear-init-dependencies']
  writeFileSync(jsonPackage, JSON.stringify(pkg, null, 2) + '\n')
  // log
  console.group('Uninstalled')
  console.log(dependencyList.join('\n'))
  console.groupEnd()
} catch (err) {
  console.error(err)
}
