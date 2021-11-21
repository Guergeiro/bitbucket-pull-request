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

You also need an
[app password](https://support.atlassian.com/bitbucket-cloud/docs/app-passwords/)
for this. With the following permissions:

- `--defaultReviewers false`

  - `pullrequest` **WRITE** permission.

- `--defaultReviewers true`

  - same as above
  - `account` **READ** permission.

### Dependency

You can also this as a dependency of your Deno scripts. Take a look at the what
it [exports](./mod.ts).

```ts
import { MakePullRequest, version } from "mod.ts";
import type { Config } from "mod.ts";

console.log(`The current version is ${version}`).

const config: Config = {
  // Config types
}

const data = await (new MakePullRequest(config)).execute();
console.log(data);
```
