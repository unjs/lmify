import packageManagers from './pm'
import { detectPackageManager } from './detect'
import { LMIFYOptions, PackageManager, InstallOpts } from './types'

export class LMIFY {
  private options: LMIFYOptions
  private packageManager?: PackageManager
  private _initPromise?: Promise<void>

  constructor(options?: LMIFYOptions) {
    this.options = {
      stdout: process.stdout,
      stderr: process.stderr,
      rootDir: process.cwd(),
      packageManager: null,
      ...options
    }
  }

  create(options?: LMIFYOptions) {
    return new LMIFY(options)
  }

  init() {
    if (!this._initPromise) {
      this._initPromise = this._init()
    }
    return this._initPromise
  }

  invalidate() {
    delete this._initPromise
  }

  async _init() {
    if (!this.options.packageManager) {
      this.options.packageManager = await detectPackageManager(this.options.rootDir)
    }
    const PM = packageManagers[this.options.packageManager]
    if (!PM) {
      throw new Error('Unknown package manager: ' + this.options.packageManager)
    }
    this.packageManager = new PM(this)
  }

  setPackageManager(name: string) {
    this.options.packageManager = name
    this.invalidate()
  }

  setRootDir(rootDir: string) {
    this.options.rootDir = rootDir
    this.invalidate()
  }

  exec(cmd: string, args: (string | undefined)[], opts = {}) {
    const execa = require('execa')
    return execa(cmd, args.filter(x => x !== undefined), {
      stdout: this.options.stdout,
      stderr: this.options.stderr,
      cwd: this.options.rootDir,
      ...opts
    })
  }

  async do(action: string, ...args) {
    await this.init()
    if (typeof this.packageManager[action] === 'undefined') {
      // eslint-disable-next-line
      throw new TypeError('Action not supported by package manager:' + action)
    }
    return this.packageManager[action](...args)
  }

  doPackages(action: string, packages: string | string[] = [], opts = {}) {
    if (packages && !Array.isArray(packages)) {
      packages = [packages]
    }
    if (!packages.length) {
      return
    }

    return this.do(action, packages, opts)
  }

  install(packages: string | string[], opts: InstallOpts = {}) {
    return this.doPackages('install', packages, opts)
  }

  installDev(packages: string | string[], opts: InstallOpts = {}) {
    return this.install(packages, { dev: true, ...opts })
  }

  uninstall(packages: string | string[], opts = {}) {
    return this.doPackages('uninstall', packages, opts)
  }
}
