import { Workspace } from './workspace'
import { PackageManager } from './package-manager'

export default class LMIFY {
  constructor(options) {
    this.options = {
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
    this._workspace = new Workspace(this.options)
    this._packageManager = new PackageManager(this.options, this._workspace)
    await this._packageManager.init()
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
    if (!Array.isArray(packages)) {
      packages = [packages]
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

  static foo() {

  }
}

// Static methods
const instance = new LMIFY()
LMIFY.instance = instance
for (const method of ['install', 'addGranter']) {
  LMIFY[method] = LMIFY.instance[method].bind(LMIFY.instance)
}
