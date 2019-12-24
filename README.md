# bch-js

[![Greenkeeper badge](https://badges.greenkeeper.io/christroutner/bch-js.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/christroutner/bch-js.svg?branch=master)](https://travis-ci.org/christroutner/bch-js)

bch-js is a JavaScript npm library for creating web and mobile apps for interacting
with the Bitcoin Cash (BCH) blockchain.

- [npm library](https://www.npmjs.com/package/@chris.troutner/bch-js)
  - v2.x.x: JWT token access implemented for [api.bchjs.cash](https://api.bchjs.cash) with paid access at [account.bchjs.cash](https://account.bchjs.cash) to increase rate limits.

- Install library: `npm install @chris.troutner/bch-js`

- Instantiate in your code:
```
const BCHJS = require("@chris.troutner/bch-js")
let bchjs = new BCHJS(`https://api.bchjs.cash/v3/`)

// testnet
bchjs = new BCHJS(`https://tapi.bchjs.cash/v3/`)
```

This is a fork of the [BITBOX SDK](https://github.com/Bitcoin-com/bitbox-sdk) (which is maintained by Bitcoin.com). This library is intended to be paired with
the [bch-api](https://github.com/christroutner/bch-api) REST API.

If you need a backward-compatible instantiation of this library, you can use a
'shim'. Do it like this:
```
const BCHJS = require("@chris.troutner/bch-js")
const bitbox = BCHJS.BitboxShim(`https://api.bchjs.cash/v3/`)
```

### API Key
The REST API hosted by bchjs.cash uses JWT tokens for access, to pay for increased
rate limits when interacting with a REST API. See [the videos on this website](https://bchjs.cash/), [this video](https://www.youtube.com/watch?v=oFa8Q2OCSaw), and [this article](https://troutsblog.com/research/bitcoin-cash/how-to-bch-full-stack-developer) for more information.

- You can change the REST API used by the app by setting your `RESTURL` environment variable. The default value is `https://api.bchjs.cash/v3/`.
- You can get a JWT token from [account.bchjs.cash](https://account.bchjs.cash). Pass in the JWT token by setting the environment variable `BCHJSTOKEN` to the JWT token.

Or you can pass in either value when instantiating bch-js:
```
const BCHJS = require("@chris.troutner/bch-js")
let bchjs = new BCHJS({
  restURL: `https://api.bchjs.cash/v3/`,
  apiToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmY4MjA1YTYwODliMjliYTlhZjc1OSIsImlhdCI6MTU3NTQ5MTA2OSwiZXhwIjoxNTc4MDgzMDY5fQ.JKjGw6pZb3y8B5rzWATFd6sLjmG8brkQf4UwApxdiwU'
})
```

**Quick links**
- [Documentation](https://bchjs.cash/bch-js/index.html)
- [Examples](https://github.com/Permissionless-Software-Foundation/bch-js-examples)
- [api.bchjs.cash](https://api.bchjs.cash) - REST API this library talks to by default.
- [account.bchjs.cash](https://account.bchjs.cash) - Get your API key to unlock increased rate limits.
- [bchjs.cash](https://bchjs.cash) - a turn-key full-stack solution for application
developers.

## Features
This library sets itself apart from BITBOX with the following features:

- [ECMAScript 2017 standard JavaScript](https://en.wikipedia.org/wiki/ECMAScript#8th_Edition_-_ECMAScript_2017) used instead of TypeScript. Works
natively with node.js v10 or higher.

- [slp-sdk](https://github.com/Bitcoin-com/slp-sdk) features are integrated
into this library too, though not fully working. If you need SLP token functionality,
you should use slp-sdk or [slp-cli-wallet](https://www.npmjs.com/package/slp-cli-wallet).

- [Semantic Release](https://github.com/semantic-release/semantic-release) for
continuous delivery using semantic versioning.

- [Greenkeeper](https://greenkeeper.io/) automatic dependency management for
automatically maintaining the latest, most secure dependencies.

- [IPFS uploads](https://ipfs.io) of all files and dependencies, to backup
dependencies in case they are ever inaccessible from GitHub or npm.



## Documentation:

Full documentation for this library can be found here:
- [Documentation](https://bchjs.cash/bch-js/index.html)

Original documentation on BITBOX is available at:

- [General docs](https://developer.bitcoin.com)
- [BITBOX Introduction](https://developer.bitcoin.com/bitbox)
- [BITBOX API Reference](https://developer.bitcoin.com/bitbox/docs/getting-started)


bch-js uses [APIDOC](http://apidocjs.com/) so that documentation and working code
live in the same repository. To generate the documentation:
- `npm run docs`
- Open the generated `docs/index.html` file in a web browser.

## Support
Have questions? Need help? Join our community support
[Telegram channel](https://t.me/bch_js_toolkit)

## IPFS Releases

I will periodically publish IPFS releases of this repository, including all
dependencies in the `node_modules` folder. This ensures working copies of this
repository can be retrieved in case there is any drift in dependency files, or
if dependencies are pulled from npm or GitHub.

- Initial fork on 5/9/2019:
  - without node_modules folder: QmQFHfbBQdEHfhtiRLbXtX1NcgnfL45hZb7TbQimTXAuzG (4 MB)
  - with node_modules folder: QmXq9Ds6Qdkg9xbRhcF8pay9KabA6QN2y7bx3wvSqiXifk (107 MB)

- v1.0.0 - refactored to pure JavaScript:
  - without node_modules folder: QmNjFsiTZRMAUa9rZpXqZqivv9JLaNicwLSPHjyLB7PVDk (1 MB)
  - with node_modules folder: Qma9ScApwBtuL7dpdSk7jpBFTxbqRdiR921WjyP75SU7bT (100 MB)

## License
[MIT](LICENSE.md)
