# **semantic-release-commits-lint**

[**semantic-release**](https://github.com/semantic-release/semantic-release) плагин для анализа коммит сообщений используя [commitlint](https://github.com/conventional-changelog/commitlint)

[![Test](https://github.com/BondarenkoAlex/semantic-release-commits-lint/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/BondarenkoAlex/semantic-release-commits-lint/actions/workflows/test.yml)
[![Release](https://github.com/BondarenkoAlex/semantic-release-commits-lint/actions/workflows/release.yml/badge.svg?branch=master)](https://github.com/BondarenkoAlex/semantic-release-commits-lint/actions/workflows/release.yml)

| Step             | Description                                                                                                                        |
| ---------------- |------------------------------------------------------------------------------------------------------------------------------------|
| `analyzeCommits` | Анализирует коммит сообщения используя [commitlint](https://github.com/conventional-changelog/commitlint). |

## Install

```bash
$ npm install semantic-release-commits-lint -D
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

**Notes**: Для корректной работы плагина необходимо настроить [commitlint config](https://github.com/conventional-changelog/commitlint?tab=readme-ov-file#config)
