import * as execa from 'execa'

declare class Lmify {

  // for initalize
  init(): void
  _init(): Promise<void>
  
  // options
  setPackageManager(name: 'npm' | 'yarn'): void
  setRootDir(): void

  // permissions
  addGranter(granter: () => Promise<boolean>): void
  _grant(packages: string): Promise<boolean>

  // commands
  install(packages: string[]): Promise<void> | execa.ExecaReturns
}

declare module 'lmify' {
  export default Lmify
}
