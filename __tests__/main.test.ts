import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {fileURLToPath} from 'url'
import {expect, test} from '@jest/globals'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'dist', 'main', 'index.cjs')
  const options: cp.ExecFileSyncOptions = {
    env: process.env,
    stdio: 'pipe'
  }
  try {
    console.log(cp.execFileSync(np, [ip], options).toString())
  } catch (error) {
    console.error(error)
  }
})
