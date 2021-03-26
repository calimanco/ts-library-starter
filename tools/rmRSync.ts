import { existsSync, readdirSync, lstatSync, unlinkSync, rmdirSync } from 'fs'
import { join } from 'path'

export default function rmRSync(dirPath: string): void {
  if (existsSync(dirPath)) {
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
