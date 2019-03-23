import { Socket } from 'net'

const originalStdout = process.stdout
const originalStdErr = process.stderr

export function mockStd() {
  process.stdout = new Socket()
  process.stderr = new Socket()
}

export function restoreStd() {
  process.stdout = originalStdout
  process.stderr = originalStdErr
}
