import path from 'path'
import fs from 'fs-extra'
import execa from 'execa'

export class Workspace {
  constructor(options) {
    this.options = options
  }

  path(filePath) {
    return path.join(this.options.rootDir, filePath)
  }

  exists(filePath) {
    return fs.exists(this.path(filePath))
  }

  exec(cmd, args) {
    return execa(cmd, args, {
      stdout: this.options.stdout,
      stderr: this.options.stderr,
      cwd: this.options.rootDir
    })
  }
}
