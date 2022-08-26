import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import os from 'os'

async function run(): Promise<void> {
  try {
    let version = core.getInput('version') || 'latest'

    const manifest = await tc.getManifestFromRepo(
      'conventional-actions',
      'go-kart'
    )
    const rel = await tc.findFromManifest(version, true, manifest, os.arch())
    if (rel && rel.files.length > 0) {
      version = rel.version
      const downloadUrl = rel.files[0].download_url
      core.debug(`downloading from ${downloadUrl}`)

      const downloadPath = await tc.downloadTool(downloadUrl)
      core.debug(`downloaded to ${downloadPath}`)

      const extPath = await tc.extractTar(downloadPath)
      core.debug(`extracted to ${extPath}`)

      const toolPath = await tc.cacheDir(extPath, 'gokart', version, os.arch())
      core.debug(`tool path ${toolPath}`)

      core.addPath(toolPath)
    } else {
      throw new Error(`could not find gokart ${version} for ${os.arch()}`)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
