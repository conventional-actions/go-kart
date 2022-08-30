import * as core from '@actions/core'
import {downloadToolFromManifest} from '@conventional-actions/toolkit'
import {getConfig} from './config'

async function run(): Promise<void> {
  try {
    const config = await getConfig()

    await downloadToolFromManifest(
      'go-kart',
      'gokart',
      config.version,
      config.github_token
    )
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
