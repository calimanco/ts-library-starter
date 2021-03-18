import * as path from 'path'
import * as fs from 'fs'

const distDir = path.join(__dirname, '..', 'dist')

rimraf(distDir)

function rimraf(dirPath: string): void {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(function (entry) {
      const entryPath = path.join(dirPath, entry)
      if (fs.lstatSync(entryPath).isDirectory()) {
        rimraf(entryPath)
      } else {
        fs.unlinkSync(entryPath)
      }
    })
    fs.rmdirSync(dirPath)
  }
}
