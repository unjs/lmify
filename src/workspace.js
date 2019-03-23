import path from 'path'
import fs from 'fs-extra'
import execa from 'execa'

export class Workspace {
  constructor(rootDir = process.cwd()) {
    this.rootDir = rootDir
    this.stdout = process.stdout
    this.stderr = process.stderr
  }

  path(filePath) {
    return path.join(this.rootDir, filePath)
  }

  exists(filePath) {
    return fs.exists(this.path(filePath))
  }

  exec(cmd, args, ...options) {
    return execa(cmd, args, {
      stdout: this.stdout,
      stderr: this.stderr,
      cwd: this.rootDir,
      ...options
    })
  }
}
