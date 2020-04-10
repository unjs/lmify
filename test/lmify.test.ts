import LMIFY from '../src/index'

test('setRootDir', () => {
  LMIFY.setRootDir('404')
  // @ts-ignore
  expect(LMIFY.options.rootDir).toBe('404')
  LMIFY.setRootDir(process.cwd())
})

test('setPackageManager', async () => {
  LMIFY.setPackageManager('foo')
  // @ts-ignore
  expect(LMIFY.options.packageManager).toBe('foo')
  await expect(LMIFY.init()).rejects.toThrow('Unknown package manager: foo')
  // @ts-ignore
  delete LMIFY._initPromise
})

test('install', async () => {
  LMIFY.setPackageManager('nop')
  await LMIFY.init()
  // @ts-ignore
  jest.spyOn(LMIFY.packageManager, 'install')

  await LMIFY.install([])

  // @ts-ignore
  expect(LMIFY.packageManager.install).not.toHaveBeenCalled()

  await LMIFY.install('boo')
  // @ts-ignore
  expect(LMIFY.packageManager.install).toHaveBeenCalled()
})
