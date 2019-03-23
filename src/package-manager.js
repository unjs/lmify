import PackageManagers from './package-managers'

export class PackageManager {
  constructor(options, workspace) {
    this.options = options
    this.workspace = workspace

    this.packageManagerName = options.packageManagerName
    this.packageManager = null
  }

  async init() {
    // Detect PM if no preferred one is set
    if (!this.packageManagerName) {
      for (const name in PackageManagers) {
        if (await PackageManagers[name].detect(this.workspace)) {
          this.packageManagerName = name
          break
        }
      }
    }

    // If nothing detected, use npm
    if (!this.packageManagerName) {
      throw new Error('No PackageManager detected in ' + this.workspace.rootDir)
    }

    // Instantiate PM
    this.packageManager = new PackageManagers[this.packageManagerName](this.workspace, this.options)
  }

  install(packages) {
    return this.packageManager.install(packages)
  }
}
