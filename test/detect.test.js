import path from 'path'
import LMIFY from '../src/index'

for (const name of ['npm', 'yarn']) {
  test('Detect ' + name, async () => {
    const rootDir = path.join(__dirname, 'fixtures', name)
    const lmify = new LMIFY({ rootDir })
    await lmify.init()
    expect(lmify.packageManager.detectedPackageManager).toBe(name)
  })
}

test('No PackageManager', async () => {
  const rootDir = path.join(__dirname, 'fixtures', '404')

  const origin = global.console.warn
  global.console.warn = jest.fn()

  const lmify = new LMIFY({ rootDir })
  await lmify.init()
  expect(global.console.warn).toHaveBeenCalled()

  global.console.warn = origin
})
