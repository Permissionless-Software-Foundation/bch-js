# bch-js

[![Build Status](https://travis-ci.org/Permissionless-Software-Foundation/bch-js.svg?branch=master)](https://travis-ci.org/Permissionless-Software-Foundation/bch-js)
[![Version](https://img.shields.io/npm/v/@chris.troutner/bch-js)](https://www.npmjs.com/package/@chris.troutner/bch-js)
[![Downloads/week](https://img.shields.io/npm/dw/@chris.troutner/bch-js)](https://npmjs.org/package/@chris.troutner/bch-js)
[![License](https://img.shields.io/npm/l/@chris.troutner/bch-js)](https://github.com/Permissionless-Software-Foundation/bch-js/blob/master/LICENSE.md)

[bch-js](https://www.npmjs.com/package/@chris.troutner/bch-js) is a JavaScript npm library for creating web and mobile apps for interacting with the Bitcoin Cash (BCH) blockchain. It can be used for free, but requires an account on [FullStack.cash](https://fullstack.cash) for increased rate limits. Find out more from [this article](https://troutsblog.com/research/bitcoin-cash/how-to-bch-full-stack-developer).

### Quick Start Videos:
Here are two YouTube walk-through videos to help you get started:
- [Introduction to bch-js and the bch-js-examples repository](https://youtu.be/GD2i1ZUiyrk)
- [Working with the FullStack.cash JWT token](https://youtu.be/GD2i1ZUiyrk)

### Quick Links
- [npm Library](https://www.npmjs.com/package/@chris.troutner/bch-js)
- [Documentation](https://bchjs.fullstack.cash/)
- [Examples](https://github.com/Permissionless-Software-Foundation/bch-js-examples)
- [api.fullstack.cash](https://api.fullstack.cash) - The REST API this library talks to by default.
- [FullStack.cash Account](https://fullstack.cash/login) - Get your API key to unlock increased rate limits.
- [FullStack.cash](https://fullstack.cash) - cloud-based infrastructure for application
developers.
- [Permissionless Software Foundation](https://psfoundation.cash) - The organization that maintains this library.


### Quick Notes

- Install library: `npm install @chris.troutner/bch-js`

- Instantiate the library in your code:
```
const BCHJS = require("@chris.troutner/bch-js")
let bchjs = new BCHJS()

// testnet
bchjs = new BCHJS({ restURL: 'https://tapi.fullstack.cash/v3/' })
```

This is a fork of the [BITBOX SDK](https://github.com/Bitcoin-com/bitbox-sdk) (which is maintained by Bitcoin.com). This library is intended to be paired with
the [bch-api](https://github.com/Permissionless-Software-Foundation/bch-api) REST API.

If you need a backward-compatible instance of this library, you can use a
'shim'. Do it like this:
```
const BCHJS = require("@chris.troutner/bch-js")
const bitbox = BCHJS.BitboxShim({ restURL: 'https://api.fullstack.cash/v3/' })
```

### API Key
The [bch-api](https://github.com/Permissionless-Software-Foundation/bch-api) REST API hosted by [FullStack.cash](https://fullstack.cash) uses JWT tokens to pay for increased
rate limits when interacting with the back end server. See [this article](https://troutsblog.com/research/bitcoin-cash/how-to-bch-full-stack-developer) if you want to understand the system-as-a-whole. The JWT token can be fed to bch-js *implicitly* or *explicitly*.

- Implicitly: bch-js will detect your JWT token by setting the `BCHJSTOKEN` environment variable.
- Explicitly: You can directly feed in the JWT token with the `apiToken` property when instantiating the library. Here is an example:

```
const BCHJS = require("@chris.troutner/bch-js")
let bchjs = new BCHJS({
  restURL: 'https://api.fullstack.cash/v3/',
  apiToken: 'eyJhbGciO...' // Your JWT token here.
})
```

### Gatsby
bch-js is included in this [gatsby-ipfs-template](https://github.com/Permissionless-Software-Foundation/gatsby-ipfs-template) for building uncensorable web apps that can interact with the blockchain. When building a Gatsby (or other front-end app that uses Webpack), you'll need to add these lines to your `gatsby-node.js` file, as per [this issue](https://github.com/gatsbyjs/gatsby/issues/564):
```
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty'
    }
  })
}
```

This is because the new IPFS class in bch-js uses the fs library for uploading files, which is not supported by Gatsby.

## Features
This library sets itself apart from BITBOX with the following features:

- [ECMAScript 2017 standard JavaScript](https://en.wikipedia.org/wiki/ECMAScript#8th_Edition_-_ECMAScript_2017) used instead of TypeScript. Works
natively with node.js v10 or higher.

- Full SLP tokens support: bch-js has full support for all SLP token functionality, including send, mint, and genesis transactions. It also fully support all aspects of [non-fugible tokans (NFTs)](https://www.youtube.com/watch?v=vvlpYUx6HRs).

- [Semantic Release](https://github.com/semantic-release/semantic-release) for
continuous delivery using semantic versioning.

- [Greenkeeper](https://greenkeeper.io/) automatic dependency management for
automatically maintaining the latest, most secure dependencies.

- [IPFS uploads](https://ipfs.io) of all files and dependencies, to backup
dependencies in case they are ever inaccessible from GitHub or npm.



## Documentation:

Full documentation for this library can be found here:
- [Documentation](https://bchjs.fullstack.cash/)

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
