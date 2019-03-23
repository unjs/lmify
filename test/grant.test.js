import LMIFY from '../src/index'

test('Grant by default', async () => {
  const lmify = new LMIFY()
  expect(await lmify._grant()).toBe(true)
})

test('Grant true', async () => {
  const lmify = new LMIFY()
  lmify.addGranter(() => Promise.resolve(true))
  expect(await lmify._grant()).toBe(true)
})

test('Grant false', async () => {
  const lmify = new LMIFY()

  lmify.addGranter(() => Promise.resolve(false))
  expect(await lmify._grant()).toBe(false)

  await lmify.init()

  const install = lmify.packageManager.install = jest.fn()

  await lmify.install('foo')
  expect(install).not.toBeCalled()
})
