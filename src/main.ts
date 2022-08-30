import * as core from '@actions/core'
import * as exec from '@actions/exec'
import {getConfig} from './config'

async function run(): Promise<void> {
  try {
    const config = await getConfig()

    for (const pkg of config.packages) {
      await exec.exec('gokart', [
        'scan',
        '-x',
        '-s',
        '-o',
        config.outputPath,
        pkg
      ])
      core.setOutput('output_path', config.outputPath)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
