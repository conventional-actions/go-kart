import * as core from '@actions/core'
import * as exec from '@actions/exec'
import {parseInputFiles} from './utils'

async function run(): Promise<void> {
  try {
    const outputPath = core.getInput('output_path') || 'gokart.sarif'
    const packages = parseInputFiles(core.getInput('package') || './...')

    for (const pkg of packages) {
      await exec.exec('gokart', ['scan', '-x', '-s', '-o', outputPath, pkg])
      core.setOutput('output_path', outputPath)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
