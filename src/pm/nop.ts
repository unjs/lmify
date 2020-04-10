import { LMIFY } from '../lmify'
import { PackageManager, InstallOpts } from '../types'

export class NOP implements PackageManager {

  constructor(private lmify: LMIFY) { }

  install(packages: string[] = [], opts: InstallOpts = {}) {
    return Promise.resolve()
  }

  uninstall(packages: string[] = []) {
    return Promise.resolve()
  }
}
