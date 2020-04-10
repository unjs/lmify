import { LMIFYOptions, InstallOpts } from './types';
export declare class LMIFY {
    private options;
    private packageManager?;
    private _initPromise?;
    constructor(options?: LMIFYOptions);
    init(): Promise<void>;
    invalidate(): void;
    _init(): Promise<void>;
    setPackageManager(name: string): void;
    setRootDir(rootDir: string): void;
    exec(cmd: string, args: (string | undefined)[], opts?: {}): any;
    do(action: string, opts: object): Promise<any>;
    doPackages(action: string, packages?: string | string[], opts?: {}): Promise<any>;
    install(packages: string | string[], opts?: InstallOpts): Promise<any>;
    installDev(packages: string | string[], opts?: InstallOpts): Promise<any>;
    uninstall(packages: string | string[], opts?: {}): Promise<any>;
}
