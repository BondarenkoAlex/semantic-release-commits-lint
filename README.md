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

## Profit

Does not semantic-release set dist-tag?  Perhaps, you write commit-message not right. This plugin lets to find so error.

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

### Options

| Options            | Description                         | Default |
|--------------------|-------------------------------------|---------|
| `commitlintFile`   | File path of the commitlint config. | -       |
| `commitlintConfig` | Commitlint config as object.        | -       |

**Notes**: For the plugin to work correctly, you need to configure [commitlint config](https://github.com/conventional-changelog/commitlint?tab=readme-ov-file#config)


### Example configuration

#### Configuration globaly in project

1. Install `@commitlint/config-conventional` if need.

```sh
npm install @commitlint/config-conventional -D
```

2. Add commitlint config file in project

`.commitlintrc.json`

```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "type-case": [2, "always", ["pascal-case"]]
  }
}
```

3. Configuration `semantic-release`

`.releaserc`

```json
{
  "plugins": [
    "semantic-release-commits-lint"
  ]
}
```

#### Configuration by `commitlintFile` option

1. Install `@commitlint/config-conventional` if need.

```sh
npm install @commitlint/config-conventional -D
```

2. Add commitlint config file in project

`.commitlintrc-for-semantic-release.json`

```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "type-case": [2, "always", ["pascal-case"]]
  }
}
```

3. Configuration `semantic-release`

`.releaserc`

```json
{
  "plugins": [
    [
      "semantic-release-commits-lint",
      {
        "commitlintFile": ".commitlintrc-for-semantic-release.json"
      }
    ]
  ]
}
```

#### Configuration by `commitlintConfig` option

1. Install `@commitlint/config-conventional` if need.

```sh
npm install @commitlint/config-conventional -D
```

2. Configuration `semantic-release`

`.releaserc`

```json
{
  "plugins": [
    [
      "semantic-release-commits-lint",
      {
        "commitlintConfig": {
          "extends": ["@commitlint/config-conventional"],
          "rules": {
            "type-case": [2, "always", ["pascal-case"]]
          }
        }
      }
    ]
  ]
}
```
