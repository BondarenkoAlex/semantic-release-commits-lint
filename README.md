# **semantic-release-commits-lint**

[**semantic-release**](https://github.com/semantic-release/semantic-release) plugin for analyzing commit messages by [commitlint](https://github.com/conventional-changelog/commitlint)

[![Test](https://github.com/BondarenkoAlex/semantic-release-commits-lint/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/BondarenkoAlex/semantic-release-commits-lint/actions/workflows/test.yml)
[![Release](https://github.com/BondarenkoAlex/semantic-release-commits-lint/actions/workflows/release.yml/badge.svg?branch=master)](https://github.com/BondarenkoAlex/semantic-release-commits-lint/actions/workflows/release.yml)
[![Coverage](https://bondarenkoalex.github.io/semantic-release-commits-lint/badge-branches.svg)](https://bondarenkoalex.github.io/semantic-release-commits-lint/)
[![Coverage](https://bondarenkoalex.github.io/semantic-release-commits-lint/badge-functions.svg)](https://bondarenkoalex.github.io/semantic-release-commits-lint/)
[![Coverage](https://bondarenkoalex.github.io/semantic-release-commits-lint/badge-lines.svg)](https://bondarenkoalex.github.io/semantic-release-commits-lint/)
[![Coverage](https://bondarenkoalex.github.io/semantic-release-commits-lint/badge-statements.svg)](https://bondarenkoalex.github.io/semantic-release-commits-lint/)




| Step             | Description                                                                                      |
| ---------------- |--------------------------------------------------------------------------------------------------|
| `analyzeCommits` | Analyzing commit messages by [commitlint](https://github.com/conventional-changelog/commitlint). |

## Install

```sh
npm install semantic-release-commits-lint -D
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
  "plugins": [
    "semantic-release-commits-lint"
  ]
}
```

## Configuration

**Notes**: For the plugin to work correctly, you need to configure [commitlint config](https://github.com/conventional-changelog/commitlint?tab=readme-ov-file#config)

#### Example configuration

* Install 
```sh
npm install @commitlint/config-conventional -D
```

* Add config
```sh
echo '{"extends": ["@commitlint/config-conventional"]}' > .commitlintrc.json
```
