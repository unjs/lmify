import { LMIFY } from '../lmify'
import { PackageManager, InstallOpts } from '../types'

export class Yarn implements PackageManager {
  constructor (private lmify: LMIFY) {}

  install (packages: string[] = [], opts: InstallOpts = {}) {
    return this.lmify.exec('yarn', [
      'add',
      opts.dev ? '--dev' : undefined,
      ...packages
    ])
  }

  uninstall (packages: string[] = []) {
    return this.lmify.exec('yarn', [
      'remove',
      ...packages
    ])
  }
}
