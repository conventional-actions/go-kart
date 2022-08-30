import * as core from '@actions/core'
import {parseMultiInput} from '@conventional-actions/toolkit'

type Config = {
  github_token: string
  version: string
  outputPath: string
  packages: string[]
}

export async function getConfig(): Promise<Config> {
  return {
    github_token: process.env['GITHUB_TOKEN'] || '',
    version: core.getInput('version') || 'latest',
    outputPath: core.getInput('output_path') || 'gokart.sarif',
    packages: parseMultiInput(core.getInput('package') || './...')
  }
}
