import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const dependencyList = [
  'chalk',
  'prompt',
  'which',
  '@types/which',
  '@types/prompt'
]

try {
  const jsonPackage = join(__dirname, '..', 'package.json')
  let pkg = JSON.parse(readFileSync(jsonPackage).toString())
  if (pkg.scripts['clear-init-dependencies'] == null) {
    console.log(
      'The dependencies have been cleaned up, you don’t need to run the script repeatedly.'
    )
    process.exit(0)
  }
  const listStr = dependencyList.reduce((result, i) => {
    result += ' ' + i
    return result
  }, '')
  console.log('Cleaning up dependencies, please wait...')
  // run npm
  execSync(`npm uninstall${listStr} --no-audit`)
  // edit package.json
  pkg = JSON.parse(readFileSync(jsonPackage).toString())
  delete pkg.scripts['clear-init-dependencies']
  writeFileSync(jsonPackage, JSON.stringify(pkg, null, 2) + '\n')
  // log
  console.group('Uninstalled')
  console.log(dependencyList.join('\n'))
  console.groupEnd()
  console.log('Package.json updated.')
  console.log('You can delete this script by yourself.')
  console.log('')
} catch (err) {
  console.error(err)
}
