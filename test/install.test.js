import path from 'path'
import fs from 'fs-extra'
import LMIFY from '../src/index'

for (const name of ['npm', 'yarn']) {
  test('Install with ' + name, async () => {
    const rootDir = path.join(__dirname, 'fixtures', name)

    const lmify = new LMIFY({
      rootDir,
      stdout: 'ignore',
      stderr: 'ignore'
    })

    await lmify.install(['is-nan', 'std-env'])

    expect(await fs.exists(path.join(rootDir, 'node_modules', 'is-nan'))).toBe(true)
    expect(await fs.exists(path.join(rootDir, 'node_modules', 'std-env'))).toBe(true)
  }, 20000)
}
