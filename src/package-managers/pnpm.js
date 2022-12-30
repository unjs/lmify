export class Pnpm {
  constructor (options, workspace) {
    this.workspace = workspace
  }

  static async detect (workspace) {
    if (await workspace.exists('pnpm-lock.yaml')) {
      return true
    }
  }

  install (packages) {
    return this.workspace.exec('pnpm', [
      'add',
      ...packages
    ])
  }
}
