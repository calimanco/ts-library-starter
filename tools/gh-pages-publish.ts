import { readFileSync, closeSync, openSync } from 'fs'
import { execSync } from 'child_process'
import { URL } from 'url'

let repoUrl
const pkg = JSON.parse(readFileSync('package.json').toString())
if (typeof pkg.repository === 'object') {
  if (!Object.prototype.hasOwnProperty.call(pkg.repository, 'url')) {
    throw new Error('URL does not exist in repository section.')
  }
  repoUrl = pkg.repository.url
} else {
  repoUrl = pkg.repository
}

const parsedUrl = new URL(repoUrl)
const repository = `${parsedUrl.host !== '' ? parsedUrl.host : ''}${
  parsedUrl.pathname !== '' ? parsedUrl.pathname : ''
}`
const ghToken = process.env.GH_TOKEN

if (ghToken == null) {
  throw new Error('The ghToken does not exist in environment.')
}

console.log('Deploying docs!!!')
process.chdir('docs')
process.env.OLDPWD = process.cwd()
closeSync(openSync('.nojekyll', 'w'))
execSync('git init')
execSync('git add .')
execSync('git config user.name "--author--"')
execSync('git config user.email "--email--"')
execSync('git commit -m "docs(docs): update gh-pages"')
execSync(
  `git push --force --quiet "https://${ghToken}@${repository}" master:gh-pages`
)
console.log('Docs deployed!!')
