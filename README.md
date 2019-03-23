# lmify

> Let Me Install it For You!

[![CircleCI](https://img.shields.io/circleci/project/github/nuxt/lmify.svg?style=flat-square)](https://circleci.com/gh/nuxt/lmify)
[![Codecov](https://img.shields.io/codecov/c/github/nuxt/lmify.svg?style=flat-square)](https://codecov.io/gh/nuxt/lmify)
[![npm](https://img.shields.io/npm/v/lmify.svg?style=flat-square)](https://www.npmjs.com/package/lmify)
[![npm](https://img.shields.io/npm/dt/lmify.svg?style=flat-square)](https://www.npmjs.com/package/lmify)

Programmatically install NPM depenendencies to the project!

## Features

- Support [Yarn](https://yarnpkg.com) and [NPM](https://docs.npmjs.com/cli/npm)
- Auto package manager detection
- Singleton  or Class API
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

Install one or more packages in rootDir using prefered package manager.

```js
const { install } = require('lmify')

await install('package-name')
```

### `setPackageManager(name)`

Set preferred package manager to use. By default it will be guessed.

```js
const { setPackageManager } = require('lmify')

setPackageManager('yarn')
```

### `setRootDir(rootDir)`

Set project root dir. This causes package manager detection to happen on next install.

```js
const { setRootDir } = require('lmify')

setRootDir(proccess.cwd())
```

### `addGranter(fn)`

Add a granter function to ask user before installing packages.

This function accepts an array of packages to be added and should return `Promise<Boolean>`.

Wihout a granter, install imediatelly adds package.

If multiple granter added, first response will be used (either deny or allow).

```js
const { addGranter } = require('lmify')

addGranter(async packages => {
  console.log('Installing packages:', packages)
  return true // Allow
})
```

### Class: `LMIFY`

You can choose between using singleton instance your creating a new instance of `LMIFY`:


```js
const LMIFY = require('lmify')

const constumInstance = new LMIFY(options)
```

#### `options`

- `stdout`: Defaults to `process.stdout`
- `stderr`: Defaults to `process.stderr`
- `rootDir`: Defaults to `process.cwd()`
- `packageManager`: Should be specified or `install` throws warning if nothing detected and does nothing

## License

MIT - Made with 💖 by Nuxt.js team!
