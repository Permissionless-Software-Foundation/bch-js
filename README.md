# bch-js

[![Version](https://img.shields.io/npm/v/@psf/bch-js)](https://www.npmjs.com/package/@psf/bch-js)
[![Downloads/week](https://img.shields.io/npm/dw/@psf/bch-js)](https://npmjs.org/package/@psf/bch-js)
[![License](https://img.shields.io/npm/l/@psf/bch-js)](https://github.com/Permissionless-Software-Foundation/bch-js/blob/master/LICENSE.md)
[![js-standard-style](https://img.shields.io/badge/javascript-standard%20code%20style-green.svg?style=flat-square)](https://github.com/feross/standard)

[bch-js](https://www.npmjs.com/package/@psf/bch-js) is a JavaScript npm library for creating web and mobile apps that can interact with the Bitcoin Cash (BCH) blockchains. It can be used for free, but requires an account on [FullStack.cash](https://fullstack.cash) for increased rate limits. Learn more from [this article](https://troutsblog.com/research/bitcoin-cash/how-to-bch-full-stack-developer) about Full Stack Bitcoin Cash development.

### Quick Start Videos:

Here are two YouTube walk-through videos to help you get started:

- [Introduction to bch-js and the bch-js-examples repository](https://youtu.be/GD2i1ZUiyrk)
- [Working with the FullStack.cash JWT token](https://youtu.be/GD2i1ZUiyrk)

### Quick Links

- [npm Library](https://www.npmjs.com/package/@psf/bch-js)
- [Documentation](https://bchjs.fullstack.cash/)
- [Examples](https://github.com/Permissionless-Software-Foundation/bch-js-examples)
- [bchn.fullstack.cash](https://bchn.fullstack.cash) - The REST API this library talks to by default.
- [FullStack.cash](https://fullstack.cash) - cloud-based infrastructure for application developers.
- [FullStack.cash Account](https://fullstack.cash/login) - Get your API key to unlock increased rate limits.
- [Permissionless Software Foundation](https://psfoundation.cash) - The organization that maintains this library.

### Quick Notes

- Install library: `npm install @psf/bch-js`

- Instantiate the library in your code:

```
const BCHJS = require("@psf/bch-js")
let bchjs = new BCHJS() // Defaults to BCHN network.

// testnet
bchjs = new BCHJS({ restURL: 'https://testnet3.fullstack.cash/v4/' })
```

This library is intended to be paired with
the [bch-api](https://github.com/Permissionless-Software-Foundation/bch-api) REST API, and the infrastructure provided by [FullStack.cash](https://fullstack.cash). The `restURL` property can be changed to work with different Bitcoin Cash networks:

- BCHN Mainnet REST API server: https://bchn.fullstack.cash/v4/
- ABC Mainnet REST API server: https://abc.fullstack.cash/v4/
- Testnet3 REST API server: https://testnet3.fullstack.cash/v4/
- Check server status: https://metrics.fullstack.cash

### API Key

The [bch-api](https://github.com/Permissionless-Software-Foundation/bch-api) REST API hosted by [FullStack.cash](https://fullstack.cash) uses JWT tokens to pay for increased
rate limits when interacting with the back end server. See [this article](https://troutsblog.com/research/bitcoin-cash/how-to-bch-full-stack-developer) if you want to understand the system-as-a-whole. The JWT token can be fed to bch-js _implicitly_ or _explicitly_.

- Implicitly: bch-js will detect your JWT token if you set the `BCHJSTOKEN` environment variable.
- Explicitly: You can directly feed in the JWT token with the `apiToken` property when instantiating the library. Here is an example:

```
const BCHJS = require("@psf/bch-js")
let bchjs = new BCHJS({
  restURL: 'https://bchn.fullstack.cash/v3/',
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

We also provide [minimal-slp-wallet-web](https://www.npmjs.com/package/minimal-slp-wallet-web) as a basic Bitcoin Cash wallet with SLP support, for front end projects. bch-js is encapsulated inside the instantiation of the library Class.

## Features

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

bch-js uses [APIDOC](http://apidocjs.com/) so that documentation and working code
live in the same repository. To generate the documentation:

- `npm run docs`
- Open the generated `docs/index.html` file in a web browser.

## Support

Have questions? Need help? Join our community support
[Telegram channel](https://t.me/bch_js_toolkit)

## IPFS Releases

Copies of this repository are also published on [IPFS](https://ipfs.io).

- v4.5.4: QmWv3pxJy3MH8vU5nLUVyzqFxfNKXLQQEnz1rgStNuQijd

## License

[MIT](LICENSE.md)
