# BitBucket Pull Request

Script to automatically make a pull request on bitbucket.

## Table of Contents

- [Install](#install)
- [Using It](#using)
- [As a dependency](#dependency)

### Install

#### Binary

Head to the
[Releases](https://github.com/guergeiro/bitbucket-pull-request/releases) and
download the binary and run it.

#### Deno

Either clone this repository or get the source code from the
[Releases](https://github.com/guergeiro/bitbucket-pull-request/releases).

_Optional:_ `deno install --allow-net lib/main.ts`

### Using

Instructions:

```
bitbucket-pull-request --help
```

### Dependency

You can also this as a dependency of your Deno scripts. Take a look at the what
it [exports](./mod.ts).

```ts
import { makePullRequest, version } from "mod.ts";
import type { Body, Config, ResponseJson} from "mod.ts";

console.log(`The current version is ${version}`).

const data = await makePullRequest(myWallet);
console.log(data);
```
