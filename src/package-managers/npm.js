
export class NPM {
  constructor (options, workspace) {
    this.workspace = workspace
  }

  static async detect (workspace) {
    if (await workspace.exists('package-lock.json')) {
      return true
    }
    if (await workspace.exists('package.json')) {
      return true
    }
  }

  install (packages) {
    return this.workspace.exec('npm', [
      'install',
      ...packages
    ])
  }
}
