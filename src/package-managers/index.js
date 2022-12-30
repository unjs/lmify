import { NPM } from './npm'
import { Yarn } from './yarn'
import { Pnpm } from './pnpm'
import { Nop } from './nop'

export default {
  yarn: Yarn,
  pnpm: Pnpm,
  npm: NPM,
  nop: Nop
}
