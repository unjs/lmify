import path from 'path'
import LMIFY from '../src/index'

for (const name of ['npm', 'yarn']) {
  test('Install with ' + name, async () => {
    const rootDir = path.join(__dirname, 'fixtures', name)
    const lmify = new LMIFY(rootDir)
    await lmify.init()

    lmify._workspace.stdout = 'ignore'
    lmify._workspace.stderr = 'ignore'

    await lmify.install('std-env')
  })
}
