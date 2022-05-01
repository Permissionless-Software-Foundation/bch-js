# bch-js

[![Version](https://img.shields.io/npm/v/@psf/bch-js)](https://www.npmjs.com/package/@psf/bch-js)
[![Downloads/week](https://img.shields.io/npm/dw/@psf/bch-js)](https://npmjs.org/package/@psf/bch-js)
[![License](https://img.shields.io/npm/l/@psf/bch-js)](https://github.com/Permissionless-Software-Foundation/bch-js/blob/master/LICENSE.md)
[![js-standard-style](https://img.shields.io/badge/javascript-standard%20code%20style-green.svg?style=flat-square)](https://github.com/feross/standard) [![Join the chat at https://gitter.im/Permissionless-Software-Foundation/bch-js](https://badges.gitter.im/Permissionless-Software-Foundation/bch-js.svg)](https://gitter.im/Permissionless-Software-Foundation/bch-js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[bch-js](https://www.npmjs.com/package/@psf/bch-js) is a JavaScript npm library for creating web and mobile apps that can interact with the Bitcoin Cash (BCH) and eCash (XEC) blockchains. bch-js contains a toolbox of handy tools, and an easy API for talking with [bch-api REST API](https://github.com/Permissionless-Software-Foundation/bch-api). [FullStack.cash](https://fullstack.cash) offers paid cloud access to bch-api. You can run your own infrastructure by following documentation on [CashStack.info](https://cashstack.info).

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
- [CashStack.info](https://cashstack.info) - bch-js is part of the Cash Stack, a JavaScript framework for writing web 2 and web 3 business applications.

### Quick Notes

- Install library: `npm install @psf/bch-js`

- Instantiate the library in your code:

```
const BCHJS = require("@psf/bch-js")
let bchjs = new BCHJS() // Defaults to BCHN network.
```

This library is intended to be paired with
the [bch-api](https://github.com/Permissionless-Software-Foundation/bch-api) REST API, and the infrastructure provided by [FullStack.cash](https://fullstack.cash). The `restURL` property can be changed to work with different Bitcoin Cash networks:

- BCHN Mainnet REST API server: https://bchn.fullstack.cash/v5/
- ABC Mainnet REST API server: https://abc.fullstack.cash/v5/
- Check server status: https://metrics.fullstack.cash

### API Key (JWT Token)

The [bch-api](https://github.com/Permissionless-Software-Foundation/bch-api) REST API hosted by [FullStack.cash](https://fullstack.cash) uses JWT tokens to pay for increased
rate limits when interacting with the back end server. See [this article](https://cashstack.info) if you want to understand the system-as-a-whole. The JWT token can be fed to bch-js _implicitly_ or _explicitly_.

- Implicitly: bch-js will detect your JWT token if you set the `BCHJSTOKEN` environment variable.
- Explicitly: You can directly feed in the JWT token with the `apiToken` property when instantiating the library. Here is an example:

```
const BCHJS = require("@psf/bch-js")
let bchjs = new BCHJS({
  restURL: 'https://bchn.fullstack.cash/v5/',
  apiToken: 'eyJhbGciO...' // Your JWT token here.
})
```

### Gatsby & Web Apps

[minimal-slp-wallet](https://www.npmjs.com/package/minimal-slp-wallet) is a minimal wallet 'engine' that incorporates bch-js. It's compiled with Browserify for front end apps.

[gatsby-theme-bch-wallet](https://github.com/Permissionless-Software-Foundation/gatsby-theme-bch-wallet) is a Gatsby Theme and [bch-wallet-starter](https://github.com/Permissionless-Software-Foundation/bch-wallet-starter) is a Gatsby Starter for building web wallets using minimal-slp-wallet.

[This gist](https://gist.github.com/christroutner/6cb9d1b615f3f9363af79723157bc434) shows how to include minimal-slp-wallet into a basic web page without using a framework.

## Features

- [ECMAScript 2017 standard JavaScript](https://en.wikipedia.org/wiki/ECMAScript#8th_Edition_-_ECMAScript_2017) used instead of TypeScript. Works
  natively with node.js v10 or higher.

- Full SLP tokens support: bch-js has full support for all SLP token functionality, including send, mint, and genesis transactions. It also fully supports all aspects of [non-fugible tokans (NFTs)](https://www.youtube.com/watch?v=vvlpYUx6HRs).

- [Semantic Release](https://github.com/semantic-release/semantic-release) for
  continuous delivery using semantic versioning.

- [IPFS](https://ipfs.io) and [Radicle](https://radicle.xyz) uploads of all files and dependencies, to backup
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

## Donate

This open source software is developed and maintained by the [Permissionless Software Foundation](https://psfoundation.cash). If this library provides value to you, please consider making a donation to support the PSF developers:

<div align="center">
<img src="./img/donation-qr.png" />
<p>bitcoincash:qqsrke9lh257tqen99dkyy2emh4uty0vky9y0z0lsr</p>
</div>


## IPFS & Radicle Releases

Copies of this repository are also published on [IPFS](https://ipfs.io).

- v6.2.10: `bafybeifsioj3ba77u2763nsyuzq53gtbdxsnqpoipvdl4immj6ytznjaoy`
- (with dependencies, node v14.18.2 and npm v8.8.0): `bafybeihfendd4oj6uxvvecm7sluobwwhpb5wdcxhvhmx56e667nxdncd4a`

They are also posted to the Radicle:
- v6.2.10: `rad:git:hnrkkroqnbfwj6uxpfjuhspoxnfm4i8e6oqwy`

## License

[MIT](LICENSE.md)
