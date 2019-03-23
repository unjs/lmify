export class Yarn {
  constructor(options, workspace) {
    this.workspace = workspace
  }

  static async detect(workspace) {
    if (await workspace.exists('yarn.lock')) {
      return true
    }
  }

  install(packages) {
    return this.workspace.exec('yarn', [
      'add',
      ...packages
    ])
  }
}
