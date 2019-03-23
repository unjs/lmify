import LMIFY from '../src/index'

test('setRootDir', () => {
  LMIFY.setRootDir('404')
  expect(LMIFY.instance.options.rootDir).toBe('404')
  LMIFY.setRootDir(process.cwd())
})

test('setPackageManager', async () => {
  LMIFY.setPackageManager('foo')
  expect(LMIFY.instance.options.packageManager).toBe('foo')
  await expect(LMIFY.instance.init()).rejects.toThrow('Unknown package manager: foo')
  delete LMIFY.instance._initPromise
})

test('install', async () => {
  LMIFY.setPackageManager('nop')
  await LMIFY.instance.init()
  jest.spyOn(LMIFY.instance.packageManager, 'install')

  await LMIFY.instance.install()
  await LMIFY.instance.install([])
  expect(LMIFY.instance.packageManager.install).not.toHaveBeenCalled()

  await LMIFY.instance.install('boo')
  expect(LMIFY.instance.packageManager.install).toHaveBeenCalled()
})
