import { Workspace } from './workspace'
import { PackageManager } from './package-manager'

export default class LMIFY {
  constructor(options) {
    this._options = {
      stdout: process.stdout,
      stderr: process.stderr,
      rootDir: process.cwd(),
      ...options
    }

    this._granters = []
  }

  init() {
    if (!this._initPromise) {
      this._initPromise = this._init()
    }
    return this._initPromise
  }

  async _init() {
    this._workspace = new Workspace(this._options)
    this._packageManager = new PackageManager(this._options, this._workspace)
    await this._packageManager.detect()
  }

  setPackageManager(name) {
    this._options.packageManager = name
  }

  setRootDir(rootDir) {
    this._options.rootDir = rootDir
    delete this._initPromise
  }

  addGranter(granter) {
    this._granters.push(granter)
  }

  _grant(packages) {
    if (!this._granters.length) {
      return Promise.resolve(true)
    }
    return Promise
      .race(this._granters.map(granter => granter(packages)))
      .then(r => Boolean(r))
  }

  async install(packages) {
    if (!packages) {
      return
    }

    if (!Array.isArray(packages)) {
      packages = [packages]
    }

    if (!packages.length) {
      return
    }

    const [ grant ] = await Promise.all([
      this._grant(packages),
      this.init()
    ])

    if (!grant) {
      return
    }

    return this._packageManager.install(packages)
  }
}

// Static methods
const instance = new LMIFY()
LMIFY.instance = instance
for (const method of ['install', 'addGranter']) {
  LMIFY[method] = LMIFY.instance[method].bind(LMIFY.instance)
}
