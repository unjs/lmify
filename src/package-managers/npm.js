
export class NPM {
  constructor(workspace) {
    this.workspace = workspace
  }

  static async detect(workspace) {
    if (await workspace.exists('package-lock.json')) {
      return true
    }
  }

  install(packages) {
    return this.workspace.exec('npm', [
      'install',
      ...packages
    ])
  }
}
