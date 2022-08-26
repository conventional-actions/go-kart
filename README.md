# go-kart

A GitHub Action for running [gokart](https://github.com/praetorian-inc/gokart).

## Usage

To use the GitHub Action, add the following to your job:

```yaml
- uses: conventional-actions/go-kart@v1
```

### Inputs

| Name          | Default        | Description                             |
|---------------|----------------|-----------------------------------------|
| `version`     | `latest`       | the version of gokart to install        |
| `output_path` | `gokart.sarif` | the output path to write the SARIF file |
| `package`     | `./...`        | the package to scan                     |

### Outputs

| Name          | Type     | Description      |
|---------------|----------|------------------|
| `output_path` | `string` | output file path |

### Example

```yaml
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - id: gokart
        uses: conventional-actions/go-kart@v1
      - uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: ${{steps.gokart.outputs.output_path}}
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
