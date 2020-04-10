import { LMIFY } from '../lmify'
import { PackageManager } from '../types'

export class NOP implements PackageManager {
  constructor (private lmify: LMIFY) { }

  install () {
    return Promise.resolve()
  }

  uninstall () {
    return Promise.resolve()
  }
}
