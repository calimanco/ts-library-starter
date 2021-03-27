import { lstat, unlink, readdir, rmdir } from 'fs'
import { join } from 'path'

export default async function rmR(dirPath: string): Promise<void> {
  return await new Promise((resolve, reject) => {
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
            .then(() => {
              rmdir(dirPath, err => {
                if (err != null) {
                  reject(err)
                }
                resolve()
              })
            })
            .catch(err => {
              reject(err)
            })
        })
      } else {
        unlink(dirPath, err => {
          if (err != null) {
            reject(err)
          }
          resolve()
        })
      }
    })
  })
}
