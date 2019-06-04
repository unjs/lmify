export class Nop {
  static detect() {
    return Promise.resolve(false)
  }

  install() {
    return Promise.resolve()
  }

  uninstall() {
    return Promise.resolve()
  }
}
