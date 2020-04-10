export interface LMIFYOptions {
  stdout?: string | NodeJS.WriteStream,
  stderr?: string | NodeJS.WriteStream,
  rootDir?: string,
  packageManager?: string
}

export type PackageManager = {
  install(packages: string[], opts: InstallOpts): Promise<void|any>,
  uninstall(packages: string[]): Promise<void|any>
}

export interface InstallOpts {
  dev?: boolean
}
