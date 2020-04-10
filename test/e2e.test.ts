import path from 'path'
import fs from 'fs-extra'
import { LMIFY } from '../src/lmify'

for (const name of ['npm', 'yarn']) {
  test('Install/Uninstall with ' + name, async () => {
    const rootDir = path.join(__dirname, 'fixtures', name)

    if (fs.existsSync(rootDir)) {
      fs.removeSync(rootDir)
      fs.mkdirSync(rootDir)
      fs.writeFileSync(path.join(rootDir, 'package.json'), '{}', 'utf-8')
    }

    const lmify = new LMIFY({
      rootDir,
      packageManager: name,
      stdout: 'ignore',
      stderr: 'ignore'
    })

    const resolveNodeModules = p => path.join(rootDir, 'node_modules', p)
    const existsNodeModules = p => fs.existsSync(resolveNodeModules(p))
    const readPkg = () => JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'))

    await lmify.install('std-env')
    await lmify.installDev('defu')
    expect(await existsNodeModules('std-env')).toBe(true)
    expect(await existsNodeModules('defu')).toBe(true)

    let pkg = readPkg()
    expect(Object.keys(pkg.dependencies)).toMatchObject(['std-env'])
    expect(Object.keys(pkg.devDependencies)).toMatchObject(['defu'])

    await lmify.uninstall('std-env')
    await lmify.uninstall('defu')

    expect(await existsNodeModules('std-env')).toBe(false)
    expect(await existsNodeModules('defu')).toBe(false)

    pkg = readPkg()
    expect(Object.keys(pkg.dependencies)).toMatchObject([])
    expect(Object.keys(pkg.devDependencies)).toMatchObject([])
  }, 60000)
}
