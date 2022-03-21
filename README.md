# Dmot

## Table of Contents
- [About](#about)
    - [Introduction](#introduction)
    - [Forking](#forking)
    - [Changelog](#changelog)
    - [Trivia](#trivia)
- [Documentation / API](#documentation--api)
- [Contributors](#contributors)

## About

### Introduction

Dmot is an open-source, multi-purpose, fully-customizable, utility Discord bot written in JavaScript using [Node.js (v16.13.2)](https://nodejs.org) and [Discord.js v13.6.0](https://discord.js.org/#/). It was created on December 22, 2018 as a side-project to learn and practice JavaScript by Dm123321_31mD Gaming. It quickly turned into a public utility Discord Bot as more people begin to notice Dmot. On March 13, 2022, Dmot officially became open-source.

### Forking

You can create your own spin-off of Dmot by forking this repository. See how to do that [here](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

After you have done so, create a `.env` file with the following content inside:

```env
TOKEN="INSERT-YOUR-TOKEN"
```

> **WARNING**: DO NOT SHARE YOUR TOKEN WITH ANYONE WHO YOU DO NOT TRUST.

Within the `config.json`, you can configure the client by editing the values. Below is the default configuration in case the original is tampered or lost:

```json
{
    "commandsPath": "commands/",
    "maintenance": false,
    "sessionPath": "./logs/latest.log"
}
```

To launch the client, open a terminal within the root directory and enter the following:

```bash
node .
```

Or if you have [nodemon](https://www.npmjs.com/package/nodemon) installed globally:

```bash
nodemon .
```

Feel free to edit the source code using the API documented below. Good luck!

> **DISCLAIMER**: The owner and creator, Dm123321_31mD Gaming, and the product of this repository, Dmot, shall hold no responsibility and shall not be liable for any claim, damage, misuse, or other liability whatsoever from any forked or cloned repository other than the original repository. See `LICENSE` for more information.

### Changelog

**Version `2.0.0`**

To Be Determined

> See full changelog [here](./markdowns/changelog.md).

### Trivia

- The name "Dmot" is a combination of the creator's username ("**Dm**123321_31mD Gaming" or "**Dm**mD" for short) and the word "b**ot**".

## Documentation / API

Documentation coming soon!

## Contributors

### Dm123321_31mD Gaming

- Discord: DmmD - Dm123321_31mD Gaming
- Email: [dm12332131mdgaming@gmail.com](mailto:dm12332131mdgaming@gmail.com)
- Github: https://github.com/dm12332131md

> Want to be a contributor? [Email us](mailto:dm12332131mdgaming@gmail.com) or contact us on [Discord](https://discord.gg/yDE4GFu)!
---

Current version: v2.0.0

Last Updated: 3/20/2022

[↑ Back to Top](#dmot)