# lmify

> Let me install it for you!

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![packagephobia][packagephobia-src]][packagephobia-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![Dependencies][david-dm-src]][david-dm-href]
[![Standard JS][standard-js-src]][standard-js-href]

Programmatically install node dependencies to the project automatically detecting Yarn and NPM!

## Install

Using yarn:

```bash
yarn add lmify
```

Using npm:

```bash
npm install lmify
```

## Usage

### `install(package|packages)`

Install one or more packages in rootDir using the preferred package manager.

```js
const { install } = require('lmify')

await install('package-name')
```

### `setPackageManager(name: npm|yarn|nop)`

Set preferred package manager to use. By default, it will be guessed.

```js
const { setPackageManager } = require('lmify')

setPackageManager('yarn')
```

### `setRootDir(rootDir)`

Set project root dir. This causes package manager detection to happen on the next install.

```js
const { setRootDir } = require('lmify')

setRootDir(proccess.cwd())
```
### `create(options)`

Create new instance of LMIFY:

```js
const { create } = require('lmify')

const constumInstance = create(options)
```

#### `options`

- `stdout`: Defaults to `process.stdout`
- `stderr`: Defaults to `process.stderr`
- `rootDir`: Defaults to `process.cwd()`
- `packageManager`: Better if specified or `install` will throw an error if no package manager is detected

## License

MIT - Made with 💖 by Nuxt.js team!

<!-- Badges -->
[npm-version-src]: https://flat.badgen.net/npm/dt/lmify
[npm-version-href]: https://npmjs.com/package/lmify

[npm-downloads-src]: https://flat.badgen.net/npm/v/lmify
[npm-downloads-href]: https://npmjs.com/package/lmify

[github-actions-ci-src]: https://github.com/nuxt/lmify/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/nuxt/lmify/actions?query=workflow%3Aci

[codecov-src]: https://flat.badgen.net/codecov/c/github/nuxt/lmify
[codecov-href]: https://codecov.io/gh/nuxt/lmify

[david-dm-src]: https://flat.badgen.net/david/dep/nuxt/lmify
[david-dm-href]: https://david-dm.org/nuxt/lmify

[standard-js-src]: https://flat.badgen.net/badge/code%20style/standard/f2a
[standard-js-href]: https://standardjs.com

[packagephobia-src]: https://flat.badgen.net/packagephobia/install/lmify
[packagephobia-href]: https://packagephobia.now.sh/result?p=lmify
