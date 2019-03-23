# lmify -- Let me install it for you!

[![CircleCI](https://img.shields.io/circleci/project/github/nuxt/lmify.svg?style=flat-square)](https://circleci.com/gh/nuxt/lmify)
[![Codecov](https://img.shields.io/codecov/c/github/nuxt/lmify.svg?style=flat-square)](https://codecov.io/gh/nuxt/lmify)
[![npm](https://img.shields.io/npm/v/lmify.svg?style=flat-square)](https://www.npmjs.com/package/lmify)
[![npm](https://img.shields.io/npm/dt/lmify.svg?style=flat-square)](https://www.npmjs.com/package/lmify)

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

Install one or more packages in rootDir using prefered package manager.

```js
const { install } = require('lmify')

await install('package-name')
```

### `addGranter(fn)`

Add a granter function to ask user before installing packages. This function accepts an array of packages to be added and should return `Promise<Boolean>`

Wihout a granter, install imediatelly adds package.

If multiple granter added, first response will be used (either deny or allow).

```js
const { addGranter } = require('lmify')

addGranter(async packages => {
  console.log('Installing packages:', packages)
  return true // Allow
})
```

### `LMIFY` class

You can choose between using singleton instance your creating a new instance of `LMIFY`:


```js
const LMIFY = require('lmify')

const constumInstance = new LMIFY(options)
```

#### `options`

- `stdout`: Defaults to `process.stdout`
- `stderr`: Defaults to `process.stderr`
- `rootDir`: Defaults to `process.cwd()`
- `packageManagerName`: Should be specified or `install` throws error if nothing detected

## License

MIT - Made with 💖 by Nuxt.js team!
