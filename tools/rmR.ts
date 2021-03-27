import {
  lstat,
  unlink,
  readdir,
  rmdir,
  existsSync,
  readdirSync,
  lstatSync,
  unlinkSync,
  rmdirSync
} from 'fs'
import { join } from 'path'

export default function rmRSync(dirPath: string): void {
  if (existsSync(dirPath)) {
    if (!lstatSync(dirPath).isDirectory()) {
      unlinkSync(dirPath)
      return
    }
    for (const entry of readdirSync(dirPath)) {
      const entryPath = join(dirPath, entry)
      if (lstatSync(entryPath).isDirectory()) {
        rmRSync(entryPath)
      } else {
        unlinkSync(entryPath)
      }
    }
    rmdirSync(dirPath)
  }
}

export default async function rmR(dirPath: string): void {
  return new Promise((resolve, reject) => {
    lstat(dirPath, (err, stats) => {
      if (err != null) {
        reject(err)
        return
      }
      if (stats.isDirectory()) {
        readdir(dirPath, (err, files) => {
          if (err != null) {
            reject(err)
            return
          }
          const promises = []
          for (const entry of files) {
            promises.push(rmR(join(dirPath, entry)))
          }
          Promise.all(promises)
          rmdir()
        })

      } else {
        unlink(dirPath, err => {
          if (err != null) {
            reject(err)
          }
        })
      }
    })
  })
}
