import path from 'path'
import { detectPackageManager } from '../src/detect'

for (const name of ['npm', 'yarn']) {
  test('Detect ' + name, async () => {
    const rootDir = path.join(__dirname, 'fixtures', name)
    expect(await detectPackageManager(rootDir)).toBe(name)
  })
}

test('Detect yarn as priority if both yarn.lock and package-lock.json exists', async () => {
  const rootDir = path.join(__dirname, 'fixtures', 'yarn_and_npm')
  expect(await detectPackageManager(rootDir)).toBe('yarn')
})

test('Detect npm as fallback when no package-lock.json found', async () => {
  const rootDir = path.join(__dirname, 'fixtures', 'npm_fallback')
  expect(await detectPackageManager(rootDir)).toBe('npm')
})
