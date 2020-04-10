import { LMIFY } from '../lmify'
import { PackageManager, InstallOpts } from '../types'

export class NPM implements PackageManager {
  constructor (private lmify: LMIFY) { }

  install (packages: string[] = [], opts: InstallOpts = {}) {
    return this.lmify.exec('npm', [
      'install',
      opts.dev ? '-D' : undefined,
      ...packages
    ])
  }

  uninstall (packages: string[] = []) {
    return this.lmify.exec('npm', [
      'uninstall',
      ...packages
    ])
  }
}
