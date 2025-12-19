# bch-js

[![Version](https://img.shields.io/npm/v/@psf/bch-js)](https://www.npmjs.com/package/@psf/bch-js)
[![Downloads/week](https://img.shields.io/npm/dw/@psf/bch-js)](https://npmjs.org/package/@psf/bch-js)
[![License](https://img.shields.io/npm/l/@psf/bch-js)](https://github.com/Permissionless-Software-Foundation/bch-js/blob/master/LICENSE.md)
[![js-standard-style](https://img.shields.io/badge/javascript-standard%20code%20style-green.svg?style=flat-square)](https://github.com/feross/standard) [![Join the chat at https://gitter.im/Permissionless-Software-Foundation/bch-js](https://badges.gitter.im/Permissionless-Software-Foundation/bch-js.svg)](https://gitter.im/Permissionless-Software-Foundation/bch-js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[bch-js](https://www.npmjs.com/package/@psf/bch-js) is a JavaScript npm library for creating web and mobile apps that can interact with the Bitcoin Cash (BCH) blockchain. bch-js contains a toolbox of handy tools, and an easy API for talking with [psf-bch-api REST API](https://github.com/Permissionless-Software-Foundation/psf-bch-api). [FullStack.cash](https://fullstack.cash) offers paid cloud access to psf-bch-api. You can run your own infrastructure by following documentation on [CashStack.info](https://cashstack.info).

### Quick Start Videos:

YouTube walk-through videos to help you get started:

- [Introduction to bch-js and the bch-js-examples repository](https://youtu.be/GD2i1ZUiyrk)

### Quick Links

- [npm Library](https://www.npmjs.com/package/@psf/bch-js)
- [Documentation](https://bchjs.fullstack.cash/)
- [Examples](https://github.com/Permissionless-Software-Foundation/bch-js-examples)
- [x402-bch.fullstack.cash](https://x402-bch.fullstack.cash) - The REST API this library talks to by default.
- [FullStack.cash](https://fullstack.cash) - cloud-based infrastructure for application developers.
- [Permissionless Software Foundation](https://psfoundation.cash) - The organization that maintains this library.
- [CashStack.info](https://cashstack.info) - bch-js is part of the Cash Stack, a JavaScript framework for writing web 2 and web 3 business applications.

### Quick Notes

- Install library: `npm install @psf/bch-js`

- Instantiate the library in your code:

```javascript
import BCHJS from "@psf/bch-js"
let bchjs = new BCHJS() // Defaults to BCHN network.
```

This library is intended to be paired with
the [psf-bch-api](https://github.com/Permissionless-Software-Foundation/psf-bch-api) REST API, and the infrastructure provided by [FullStack.cash](https://fullstack.cash). The `restURL` property can be changed to work with different Bitcoin Cash networks:

- BCHN Mainnet REST API server: https://x402-bch.fullstack.cash/v7/
- Check server status: https://metrics.fullstack.cash

## Configuration

bch-js can be configured through constructor options or environment variables. Configuration options passed to the constructor take precedence over environment variables.

### Constructor Options

When instantiating BCHJS, you can pass a configuration object:

```javascript
import BCHJS from "@psf/bch-js"

const bchjs = new BCHJS({
  restURL: 'https://x402-bch.fullstack.cash/v5/',
  bearerToken: 'your-bearer-token',
  wif: 'your-private-key-wif',
  paymentAmountSats: 20000,
  bchServerURL: 'https://bch.fullstack.cash'
})
```

### Configuration Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `restURL` | string | Yes* | - | The REST API server URL for making API calls. Must include trailing slash. *Required unless `RESTURL` environment variable is set. |
| `bearerToken` | string | No | `''` | Bearer token for authentication with the REST API server. |
| `wif` | string | No | `''` | Private key in WIF format. When provided, enables automatic x402 payment handling. |
| `paymentAmountSats` | number | No | `20000` | Default amount of satoshis to send when making x402 payments. |
| `bchServerURL` | string | No | `'https://bch.fullstack.cash'` | BCH server URL used for broadcasting payment transactions to the blockchain. This is separate from `restURL` and is specifically for x402 payment processing. |

### Environment Variables

You can also configure bch-js using environment variables:

| Environment Variable | Config Option | Description |
|---------------------|---------------|-------------|
| `RESTURL` | `restURL` | REST API server URL for making API calls. |
| `BCHJSBEARERTOKEN` | `bearerToken` | Bearer token for API authentication. |
| `BCHJSWIF` | `wif` | Private key in WIF format for x402 payments. |
| `BCHJSBCHSERVERURL` | `bchServerURL` | BCH server URL for x402 payment transactions. |

### Understanding restURL vs bchServerURL

These two configuration options serve different purposes:

- **`restURL`**: The REST API server used for all regular API calls (utxo queries, transaction history, etc.). This can be any bch-api compatible server, such as `https://x402-bch.fullstack.cash/v5/` or `https://bch.fullstack.cash/v5/`.

- **`bchServerURL`**: The BCH infrastructure server used specifically for broadcasting x402 payment transactions to the blockchain. This defaults to `https://bch.fullstack.cash` and should typically remain unchanged unless you have specific infrastructure requirements.

**Example Use Case**: Most users will use `https://x402-bch.fullstack.cash/v5/` as their `restURL` to access x402-protected APIs. However, when bch-js needs to make an x402 payment, it uses the `bchServerURL` (default: `https://bch.fullstack.cash`) to broadcast the payment transaction. This ensures payment transactions are sent through a reliable BCH infrastructure endpoint.

```javascript
// Use x402-bch server for API calls, but bch.fullstack.cash for payments
const bchjs = new BCHJS({
  restURL: 'https://x402-bch.fullstack.cash/v5/',
  wif: 'your-private-key-wif'
  // bchServerURL defaults to 'https://bch.fullstack.cash'
})

// Or explicitly set both
const bchjs2 = new BCHJS({
  restURL: 'https://x402-bch.fullstack.cash/v5/',
  bchServerURL: 'https://bch.fullstack.cash',
  wif: 'your-private-key-wif'
})
```

### Web Apps

[minimal-slp-wallet](https://www.npmjs.com/package/minimal-slp-wallet) is a minimal wallet 'engine' that incorporates bch-js. It's compiled with Browserify for front end apps.

[This gist](https://gist.github.com/christroutner/6cb9d1b615f3f9363af79723157bc434) shows how to include minimal-slp-wallet into a basic web page without using a framework.

[bch-wallet-web3-spa](https://github.com/Permissionless-Software-Foundation/bch-wallet-web3-spa) is a React web app template using bch-js and minimal-slp-wallet.

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
