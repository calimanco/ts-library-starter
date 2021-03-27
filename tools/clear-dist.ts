import { join } from 'path'
import rmR from './rmR'

const distDir = join(__dirname, '..', 'dist')

rmR(distDir)
  .then(() => {
    console.log('Clear dist done!')
  })
  .catch(err => {
    if (err != null) {
      console.error(err)
    }
  })
