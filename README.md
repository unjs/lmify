# lmify

> Let me install it for you!

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![packagephobia][packagephobia-src]][packagephobia-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![Dependencies][david-dm-src]][david-dm-href]
[![Standard JS][standard-js-src]][standard-js-href]

Programmatically install NPM dependencies to the project!

## Features

- Support [Yarn](https://yarnpkg.com) and [NPM](https://docs.npmjs.com/cli/npm)
- Auto package manager detection
  - Using Yarn if `yarn.lock`
  - Using NPM if `package-lock.json` or `package.json`
- Singleton or Class API
- Optional granters

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

### `setPackageManager(name)`

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

### `addGranter(fn)`

Add a granter function to ask the user before installing packages.

This function accepts an array of packages to be added and should return `Promise<Boolean>`.

Without a granter, install immediately adds package.

If multiple granters added, the first response will be used (either deny or allow).

```js
const { addGranter } = require('lmify')

addGranter(async packages => {
  console.log('Installing packages:', packages)
  return true // Allow
})
```

### Class: `LMIFY`

You can choose between using singleton instance or creating a new instance of `LMIFY`:


```js
const LMIFY = require('lmify')

const constumInstance = new LMIFY(options)
```

#### `options`

- `stdout`: Defaults to `process.stdout`
- `stderr`: Defaults to `process.stderr`
- `rootDir`: Defaults to `process.cwd()`
- `packageManager`: Better if specified or `install` will throw a warning if no package manager is detected

## License

MIT - Made with 💖 by Nuxt.js team!

<!-- Badges -->
[npm-version-src]: https://flat.badgen.net/npm/dt/lmify
[npm-version-href]: https://npmjs.com/package/lmify

[npm-downloads-src]: https://flat.badgen.net/npm/v/lmify
[npm-downloads-href]: https://npmjs.com/package/lmify

[circle-ci-src]: https://flat.badgen.net/circleci/github/nuxt/lmify
[circle-ci-href]: https://circleci.com/gh/nuxt/lmify

[codecov-src]: https://flat.badgen.net/codecov/c/github/nuxt/lmify
[codecov-href]: https://codecov.io/gh/nuxt/lmify

[david-dm-src]: https://flat.badgen.net/david/dep/nuxt/lmify
[david-dm-href]: https://david-dm.org/nuxt/lmify

[standard-js-src]: https://flat.badgen.net/badge/code%20style/standard/f2a
[standard-js-href]: https://standardjs.com

[packagephobia-src]: https://flat.badgen.net/packagephobia/install/lmify
[packagephobia-href]: https://packagephobia.now.sh/result?p=lmify
