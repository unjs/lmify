import PackageManagers from './package-managers'

export class PackageManager {
  constructor(workspace, preferredPackageManager) {
    this.workspace = workspace
    this.preferredPackageManager = preferredPackageManager
    this.packageManager = null
  }

  async init() {
    // Detect PM if no preferred one is set
    if (!this.preferredPackageManager) {
      for (const name in PackageManagers) {
        if (await PackageManagers[name].detect(this.workspace)) {
          this.preferredPackageManager = name
          break
        }
      }
    }

    // If nothing detected, use npm
    if (!this.preferredPackageManager) {
      throw new Error('No PackageManager detected in ' + this.workspace.rootDir)
    }

    // Instantiate PM
    this.packageManager = new PackageManagers[this.preferredPackageManager](this.workspace)
  }

  install(packages) {
    return this.packageManager.install(packages)
  }
}
