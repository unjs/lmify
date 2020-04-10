import { LMIFY } from './lmify'

const instance = new LMIFY()

// @ts-ignore
instance.LMIFY = LMIFY

for (const method of Object.getOwnPropertyNames(LMIFY.prototype)) {
  if (method === 'constructor' || method[0] === '_') {
    continue
  }
  instance[method] = instance[method].bind(instance)
}

export default instance
