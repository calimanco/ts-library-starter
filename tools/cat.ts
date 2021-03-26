import { readFile } from 'fs'

readFile(process.argv[2], function (err, data) {
  if (err != null) {
    console.log(err)
    return
  }
  process.stdout.write(data)
})
