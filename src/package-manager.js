import PackageManagers from './package-managers'

export class PackageManager {
  constructor(options, workspace) {
    this.options = options
    this.workspace = workspace

    this.detectedPackageManager = null
    this.packageManagers = {}
  }

  async detect() {
    // Detect PM if no preferred one is set
    if (!this.options.packageManager) {
      for (const name in PackageManagers) {
        if (await PackageManagers[name].detect(this.workspace)) {
          this.detectedPackageManager = name
          break
        }
      }
    }

    // Validate it
    this.getPackageManager()
  }

  getPackageManager() {
    const name = this.options.packageManager || this.detectedPackageManager

    if (!name) {
      throw new Error('No PackageManager detected in ' + this.options.rootDir)
    }

    if (!this.packageManagers[name]) {
      if (!PackageManagers[name]) {
        throw new Error('Unknown package manager: ' + name)
      }

      this.packageManagers[name] = new PackageManagers[name](this.options, this.workspace)
    }

    return this.packageManagers[name]
  }

  install(packages) {
    return this.getPackageManager().install(packages)
  }
}
