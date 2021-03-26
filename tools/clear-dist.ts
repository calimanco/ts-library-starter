import { join } from 'path'
import rmRSync from './rmRSync'

const distDir = join(__dirname, '..', 'dist')

rmRSync(distDir)
