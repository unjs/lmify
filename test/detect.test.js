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

test('Detect yarn as priority if both yarn.lock and package-lock.json exists', async () => {
  const rootDir = path.join(__dirname, 'fixtures', 'yarn_and_npm')
  const lmify = new LMIFY({ rootDir })
  await lmify.init()
  expect(lmify.packageManager.detectedPackageManager).toBe('yarn')
})

test('Detect npm as fallback when no package-lock.json found', async () => {
  const rootDir = path.join(__dirname, 'fixtures', 'npm_fallback')
  const lmify = new LMIFY({ rootDir })
  await lmify.init()
  expect(lmify.packageManager.detectedPackageManager).toBe('npm')
})

test('No PackageManager', async () => {
  const rootDir = path.join(__dirname, 'fixtures', '404')

  const origin = global.console.warn
  global.console.warn = jest.fn()

  const lmify = new LMIFY({ rootDir })
  await lmify.init()
  expect(global.console.warn).toHaveBeenCalled()

  global.console.warn = origin
})
