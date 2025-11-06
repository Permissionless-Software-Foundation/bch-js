Project Path: bch-js

Source Tree:

```
bch-js
├── src
│   ├── ecpair.js
│   ├── raw-transactions.js
│   ├── ecash.js
│   ├── utxo.js
│   ├── psf-slp-indexer.js
│   ├── generating.js
│   ├── bitcoincash.js
│   ├── transaction-builder.js
│   ├── address.js
│   ├── hdnode.js
│   ├── bch-js.js
│   ├── blockchain.js
│   ├── script.js
│   ├── slp
│   │   ├── ecpair.js
│   │   ├── tokentype1.js
│   │   ├── slp.js
│   │   ├── address.js
│   │   ├── utils.js
│   │   └── nft1.js
│   ├── encryption.js
│   ├── crypto.js
│   ├── control.js
│   ├── transaction.js
│   ├── dsproof.js
│   ├── electrumx.js
│   ├── mining.js
│   ├── price.js
│   ├── schnorr.js
│   ├── mnemonic.js
│   └── util.js
├── README.md
├── CONTRIBUTING.md
├── LICENSE.md
└── package.json

```

`/home/trout/work/psf/code/bch-js/src/ecpair.js`:

```js
const Bitcoin = require('@psf/bitcoincashjs-lib')
const coininfo = require('@psf/coininfo')

class ECPair {
  static setAddress (address) {
    ECPair._address = address
  }

  /**
   * @api Ecpair.fromWIF() fromWIF()
   * @apiName fromWIF
   * @apiGroup ECPair
   * @apiDescription Generates an ECPair from a private key in wallet import format (WIF). Follow these steps to go from a private key to a WIF. This method only works with a compressed private key.
   *
   * @apiExample Example usage:
   *  // mainnet WIF
   *  let wif = 'L4vmKsStbQaCvaKPnCzdRArZgdAxTqVx8vjMGLW5nHtWdRguiRi1';
   *  bchjs.ECPair.fromWIF(wif);
   *
   *  // testnet WIF
   *  let wif = 'cSNLj6xeg3Yg2rfcgKoWNx4MiAgn9ugCUUro37UDEhn6CzeYqjWW'
   *  bchjs.ECPair.fromWIF(wif)
   * */
  static fromWIF (privateKeyWIF) {
    let network
    if (privateKeyWIF[0] === 'L' || privateKeyWIF[0] === 'K') { network = 'mainnet' } else if (privateKeyWIF[0] === 'c') network = 'testnet'

    let bitcoincash
    if (network === 'mainnet') bitcoincash = coininfo.bitcoincash.main
    else bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()

    return Bitcoin.ECPair.fromWIF(privateKeyWIF, bitcoincashBitcoinJSLib)
  }

  /**
   * @api Ecpair.toWIF() toWIF()
   * @apiName toWIF
   * @apiGroup ECPair
   * @apiDescription Gets a private key in wallet import format from an ECPair.
   *
   * @apiExample Example usage:
   *  // mainnet wif
   *  let wif = 'L4vmKsStbQaCvaKPnCzdRArZgdAxTqVx8vjMGLW5nHtWdRguiRi1';
   *  // ecpair from wif
   *  let ecpair = bchjs.ECPair.fromWIF(wif);
   *  // wif from ecpair
   *  bchjs.ECPair.toWIF(ecpair);
   *  // L4vmKsStbQaCvaKPnCzdRArZgdAxTqVx8vjMGLW5nHtWdRguiRi1
   *
   *  // testnet wif
   *  let wif = 'cT3tJP7BnjFJSAHbooMXrY8E9t2AFj37amSBAYFMeHfqPqPgD4ZA';
   *  // ecpair from wif
   *  let ecpair = bchjs.ECPair.fromWIF(wif);
   *  // wif from ecpair
   *  bchjs.ECPair.toWIF(ecpair);
   *  // cT3tJP7BnjFJSAHbooMXrY8E9t2AFj37amSBAYFMeHfqPqPgD4ZA
   * */
  static toWIF (ecpair) {
    return ecpair.toWIF()
  }

  static sign (ecpair, buffer) {
    return ecpair.sign(buffer)
  }

  static verify (ecpair, buffer, signature) {
    return ecpair.verify(buffer, signature)
  }

  /**
   * @api Ecpair.fromPublicKey() fromPublicKey()
   * @apiName fromPublicKey
   * @apiGroup ECPair
   * @apiDescription Generates an ECPair from a public key buffer.
   *
   * @apiExample Example usage:
   *  // create ECPair from mainnet pubkeyBuffer
   *  let pubkeyBuffer = Buffer.from("02fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb", 'hex');
   *  bchjs.ECPair.fromPublicKey(pubkeyBuffer);
   *
   *  // create ECPair from testnet pubkeyBuffer
   *  let pubkeyBuffer = Buffer.from("024a6d0737a23c472d078d78c1cbc3c2bbf8767b48e72684ff03a911b463da7fa6", 'hex');
   *  bchjs.ECPair.fromPublicKey(pubkeyBuffer);
   * */
  static fromPublicKey (pubkeyBuffer) {
    return Bitcoin.ECPair.fromPublicKeyBuffer(pubkeyBuffer)
  }

  /**
   * @api Ecpair.toPublicKey() toPublicKey()
   * @apiName toPublicKey
   * @apiGroup ECPair
   * @apiDescription Get the public key of an ECPair as a buffer.
   *
   * @apiExample Example usage:
   *  // create ecpair from mainnet public key buffer
   *  let ecpair = bchjs.ECPair.fromPublicKey(Buffer.from('02d305772e0873fba6c1c7ff353ce374233316eb5820acd7ff3d7d9b82d514126b', 'hex'));
   *  // create public key buffer
   *  bchjs.ECPair.toPublicKey(ecpair);
   *  //
   *
   *  // create ecpair from testnet public key buffer
   *  let ecpair = bchjs.ECPair.fromPublicKey(Buffer.from('024a6d0737a23c472d078d78c1cbc3c2bbf8767b48e72684ff03a911b463da7fa6', 'hex'));
   *  // create public key buffer
   *  bchjs.ECPair.toPublicKey(ecpair);
   *  //
   * */
  static toPublicKey (ecpair) {
    return ecpair.getPublicKeyBuffer()
  }

  /**
   * @api Ecpair.toLegacyAddress() toLegacyAddress()
   * @apiName toLegacyAddress
   * @apiGroup ECPair
   * @apiDescription Get legacy address of ECPair.
   *
   * @apiExample Example usage:
   *  // mainnet wif
   *  let wif = 'L5GPEGxCmojgzFoBLUUqT2GegLGqobiYhTZzfLtpkLTfTb9E9NRn';
   *  // ecpair from wif
   *  let ecpair = bchjs.ECPair.fromWIF(wif);
   *  // to legacy address
   *  bchjs.ECPair.toLegacyAddress(ecpair);
   *  // 1DgxdA5bbMcCNWg3yB2MgKqFazV92BXgxK
   *
   *  // testnet wif
   *  let wif = 'cSNLj6xeg3Yg2rfcgKoWNx4MiAgn9ugCUUro37UDEhn6CzeYqjWW';
   *  // ecpair from wif
   *  let ecpair = bchjs.ECPair.fromWIF(wif);
   *  // to legacy address
   *  bchjs.ECPair.toLegacyAddress(ecpair);
   *  // mg4PygFcXoyNJGJkM2Dcpe25av9wXzz1My
   * */
  static toLegacyAddress (ecpair) {
    return ecpair.getAddress()
  }

  /**
   * @api Ecpair.toCashAddress() toCashAddress()
   * @apiName toCashAddress
   * @apiGroup ECPair
   * @apiDescription Get cash address of ECPair.
   *
   * @apiExample Example usage:
   *  // mainnet wif
   *  let wif = 'L5GPEGxCmojgzFoBLUUqT2GegLGqobiYhTZzfLtpkLTfTb9E9NRn';
   *  // ecpair from wif
   *  let ecpair = bchjs.ECPair.fromWIF(wif);
   *  // to legacy address
   *  bchjs.ECPair.toCashAddress(ecpair);
   *  // bitcoincash:qz9nq206kteyv2t7trhdr4vzzkej60kqtytn7sxkxm
   *
   *  // testnet wif
   *  let wif = 'cSNLj6xeg3Yg2rfcgKoWNx4MiAgn9ugCUUro37UDEhn6CzeYqjWW';
   *  // ecpair from wif
   *  let ecpair = bchjs.ECPair.fromWIF(wif);
   *  // to legacy address
   *  bchjs.ECPair.toCashAddress(ecpair);
   *  // bchtest:qqzly4vrcxcjw62u4yq4nv86ltk2mc9v0yvq8mvj6m
   * */
  static toCashAddress (ecpair, regtest = false) {
    return ECPair._address.toCashAddress(ecpair.getAddress(), true, regtest)
  }
}

module.exports = ECPair

```

`/home/trout/work/psf/code/bch-js/src/raw-transactions.js`:

```js
const axios = require('axios')

// let _this

class RawTransactions {
  constructor (config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.authToken = config.authToken

    if (this.authToken) {
      // Add Basic Authentication token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: this.authToken
        }
      }
    } else {
      // Add JWT token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: `Token ${this.apiToken}`
        }
      }
    }

    // Encapsulate dependencies
    this.axios = axios

    // this = this
  }

  /**
   * @api RawTransactions.decodeRawTransaction() decodeRawTransaction()
   * @apiName decodeRawTransaction
   * @apiGroup RawTransactions
   * @apiDescription
   * Return an Array of JSON objects representing the serialized, hex-encoded transactions.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let decodeRawTransaction = await bchjs.RawTransactions.decodeRawTransaction('01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000');
   * console.log(decodeRawTransaction);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // { txid: 'd86c34adaeae19171fd98fe0ffd89bfb92a1e6f0339f5e4f18d837715fd25758',
   * //   hash:
   * //    'd86c34adaeae19171fd98fe0ffd89bfb92a1e6f0339f5e4f18d837715fd25758',
   * //   size: 191,
   * //   version: 1,
   * //   locktime: 0,
   * //   vin:
   * //    [ { txid:
   * //         '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
   * //        vout: 0,
   * //        scriptSig: [Object],
   * //        sequence: 4294967295 } ],
   * //   vout: [ { value: 12.5, n: 0, scriptPubKey: [Object] } ] }
   *
   * (async () => {
   *  try {
   *    let decodeRawTransaction = await bchjs.RawTransactions.decodeRawTransaction([
   *      '01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000',
   *      '01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000'
   *    ]);
   *    console.log(decodeRawTransaction);
   *  } catch(error) {
   *   console.error(error)
   *  }
   * })()
   *
   * // [ { txid:
   * //    'd86c34adaeae19171fd98fe0ffd89bfb92a1e6f0339f5e4f18d837715fd25758',
   * //   hash:
   * //    'd86c34adaeae19171fd98fe0ffd89bfb92a1e6f0339f5e4f18d837715fd25758',
   * //   size: 191,
   * //   version: 1,
   * //   locktime: 0,
   * //   vin: [ [Object] ],
   * //   vout: [ [Object] ] },
   * // { txid:
   * //    'd86c34adaeae19171fd98fe0ffd89bfb92a1e6f0339f5e4f18d837715fd25758',
   * //   hash:
   * //    'd86c34adaeae19171fd98fe0ffd89bfb92a1e6f0339f5e4f18d837715fd25758',
   * //   size: 191,
   * //   version: 1,
   * //   locktime: 0,
   * //   vin: [ [Object] ],
   * //   vout: [ [Object] ] } ]
   */
  async decodeRawTransaction (hex) {
    try {
      // Single hex
      if (typeof hex === 'string') {
        const response = await axios.get(
          `${this.restURL}rawtransactions/decodeRawTransaction/${hex}`,
          this.axiosOptions
        )

        return response.data

        // Array of hexes
      } else if (Array.isArray(hex)) {
        const options = {
          method: 'POST',
          url: `${this.restURL}rawtransactions/decodeRawTransaction`,
          data: {
            hexes: hex
          },
          headers: this.axiosOptions.headers
        }
        const response = await axios(options)

        return response.data
      }

      throw new Error('Input must be a string or array of strings.')
    } catch (error) {
      if (error.error) throw new Error(error.error)
      else if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api RawTransactions.decodeScript() decodeScript()
   * @apiName decodeScript
   * @apiGroup RawTransactions
   * @apiDescription
   * Decode hex-encoded scripts.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   *  let decodeScript = await bchjs.RawTransactions.decodeScript('4830450221009a51e00ec3524a7389592bc27bea4af5104a59510f5f0cfafa64bbd5c164ca2e02206c2a8bbb47eabdeed52f17d7df668d521600286406930426e3a9415fe10ed592012102e6e1423f7abde8b70bca3e78a7d030e5efabd3eb35c19302542b5fe7879c1a16');
   *  console.log(decodeScript);
   * } catch(error) {
   *  console.error(error)
   * }
   * })()
   *
   * // { asm: '30450221009a51e00ec3524a7389592bc27bea4af5104a59510f5f0cfafa64bbd5c164ca2e02206c2a8bbb47eabdeed52f17d7df668d521600286406930426e3a9415fe10ed59201 02e6e1423f7abde8b70bca3e78a7d030e5efabd3eb35c19302542b5fe7879c1a16', type: 'nonstandard', p2sh: 'bitcoincash:pqwndulzwft8dlmqrteqyc9hf823xr3lcc7ypt74ts' }
   *
   *
   * (async () => {
   * try {
   *  let decodeScript = await bchjs.RawTransactions.decodeScript(['4830450221009a51e00ec3524a7389592bc27bea4af5104a59510f5f0cfafa64bbd5c164ca2e02206c2a8bbb47eabdeed52f17d7df668d521600286406930426e3a9415fe10ed592012102e6e1423f7abde8b70bca3e78a7d030e5efabd3eb35c19302542b5fe7879c1a16']);
   *  console.log(decodeScript);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // [{ asm: '30450221009a51e00ec3524a7389592bc27bea4af5104a59510f5f0cfafa64bbd5c164ca2e02206c2a8bbb47eabdeed52f17d7df668d521600286406930426e3a9415fe10ed59201 02e6e1423f7abde8b70bca3e78a7d030e5efabd3eb35c19302542b5fe7879c1a16',
   * // type: 'nonstandard',
   * // p2sh: 'bitcoincash:pqwndulzwft8dlmqrteqyc9hf823xr3lcc7ypt74ts' }]
   */
  async decodeScript (script) {
    // if (typeof script !== "string") script = JSON.stringify(script)

    try {
      if (typeof script === 'string') {
        const response = await axios.get(
          `${this.restURL}rawtransactions/decodeScript/${script}`,
          this.axiosOptions
        )

        return response.data
      } else if (Array.isArray(script)) {
        const options = {
          method: 'POST',
          url: `${this.restURL}rawtransactions/decodeScript`,
          data: {
            hexes: script
          },
          headers: this.axiosOptions.headers
        }
        const response = await axios(options)

        return response.data
      }

      throw new Error('Input must be a string or array of strings.')
    } catch (error) {
      if (error.error) throw new Error(error.error)
      else if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api RawTransactions.getRawTransaction() getRawTransaction()
   * @apiName getRawTransaction
   * @apiGroup RawTransactions
   * @apiDescription
   * Return the raw transaction data. If verbose is 'true', returns an Object with information about 'txid'. If verbose is 'false' or omitted, returns a string that is serialized, hex-encoded data for 'txid'.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   *  let getRawTransaction = await bchjs.RawTransactions.getRawTransaction("0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098");
   *  console.log(getRawTransaction);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * //  01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0704ffff001d0104ffffffff0100f2052a0100000043410496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858eeac00000000
   *
   * (async () => {
   * try {
   *  let getRawTransaction = await bchjs.RawTransactions.getRawTransaction([
   *    "0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098",
   *    "b25d24fbb42d84812ed2cb55797f10fdec41afc7906ab563d1ec8c8676a2037f"
   *  ], true);
   *  console.log(getRawTransaction);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // [ { hex:
   * //  '01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0704ffff001d0104ffffffff0100f2052a0100000043410496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858eeac00000000',
   * //   txid:
   * //    '0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098',
   * //   hash:
   * //    '0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098',
   * //   size: 134,
   * //   version: 1,
   * //   locktime: 0,
   * //   vin: [ [Object] ],
   * //   vout: [ [Object] ],
   * //   blockhash:
   * //    '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048',
   * //   confirmations: 581882,
   * //   time: 1231469665,
   * //   blocktime: 1231469665 },
   * // { hex:
   * //    '01000000010f3cb469bc82f931ee77d80b3dd495d02f9ed7cdc455cea3e7baa4bdeea6a78d000000006a47304402205ce3e1dfe4b5207818ce27035bc7cc03a5631f806d351535b32ce77c8d136aed02204e66e1fa4c2e12feab0d41a5593aff9629cdbc6ccb6126bc3d1a20404be7760c412103d44946d17e00179bbfc3b723aedc1831d8604e6a04bbd91170f1d894d04657bbffffffff02e6ec8500000000001976a914b5befddad83d9180fd4082c5528cf5a779b0fa6688acdf220000000000001976a9142c21a1be4239eeed678a456627a08d5f813d5c9288ac00000000',
   * //   txid:
   * //    'b25d24fbb42d84812ed2cb55797f10fdec41afc7906ab563d1ec8c8676a2037f',
   * //   hash:
   * //    'b25d24fbb42d84812ed2cb55797f10fdec41afc7906ab563d1ec8c8676a2037f',
   * //   size: 225,
   * //   version: 1,
   * //   locktime: 0,
   * //   vin: [ [Object] ],
   * //   vout: [ [Object], [Object] ],
   * //   blockhash:
   * //    '000000000000000003a09a7d68a0d62fd0ab51c368372e46bac84277e2df47e2',
   * //   confirmations: 16151,
   * //   time: 1547752564,
   * //   blocktime: 1547752564 } ]
   */
  async getRawTransaction (txid, verbose = false, usrObj = null) {
    try {
      if (typeof txid === 'string') {
        // console.log(
        //   'getRawTransaction() this.axiosOptions: ',
        //   this.axiosOptions
        // )
        const response = await axios.get(
          `${this.restURL}rawtransactions/getRawTransaction/${txid}?verbose=${verbose}`,
          this.axiosOptions
        )

        return response.data
      } else if (Array.isArray(txid)) {
        const options = {
          method: 'POST',
          url: `${this.restURL}rawtransactions/getRawTransaction`,
          data: {
            txids: txid,
            verbose: verbose,
            usrObj // pass user data when making an internal call.
          },
          headers: this.axiosOptions.headers
        }
        const response = await axios(options)

        return response.data
      }

      throw new Error('Input must be a string or array of strings.')
    } catch (error) {
      if (error.error) throw new Error(error.error)

      // This case handles rate limit errors.
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error)
      } else if (error.response && error.response.data) {
        throw error.response.data
      } else throw error
    }
  }

  // Given verbose transaction details, this function retrieves the transaction
  // data for the inputs (the parent transactions). It returns an array of
  // objects. Each object corresponds to a transaction input, and contains
  // the address that generated that input UTXO.
  //
  // Assumes a single TX. Does not yet work with an array of TXs.
  // This function returns an array of objects, each object if formated as follows:
  // {
  //   vin: 0, // The position of the input for the given txid
  //   address: bitcoincash:qzhrpmu7nruyfcemeanqh5leuqcnf6zkjq4qm9nqh0
  // }
  async _getInputAddrs (txDetails) {
    try {
      const retArray = [] // Return array

      for (let i = 0; i < txDetails.vin.length; i++) {
        // The first input represents the sender of the BCH or tokens.
        const vin = txDetails.vin[i]
        const inputTxid = vin.txid
        const inputVout = vin.vout

        // TODO: Coinbase TXs have no input transaction. Figure out how to
        // handle this corner case.

        // Get the TX details for the input, in order to retrieve the address of
        // the sender.
        const txDetailsParent = await this.getRawTransaction(inputTxid, true)
        // console.log(
        //   `txDetailsParent: ${JSON.stringify(txDetailsParent, null, 2)}`
        // )

        // The vout from the previous tx that represents the sender.
        const voutSender = txDetailsParent.vout[inputVout]

        retArray.push({
          vin: i,
          address: voutSender.scriptPubKey.addresses[0],
          value: voutSender.value
        })
      }

      return retArray
    } catch (error) {
      if (error.error) throw new Error(error.error)

      // This case handles rate limit errors.
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error)
      } else if (error.response && error.response.data) {
        throw error.response.data
      } else throw error
    }
  }

  /**
   * @api RawTransactions.getTxData() getTxData()
   * @apiName getTxData
   * @apiGroup RawTransactions
   * @apiDescription
   * Returns an object of transaction data, including addresses for input UTXOs.
   *
   * This function is equivalent to running `getRawTransaction (txid, true)`,
   * execept the `vin` array will be populated with an `address` property that
   * contains the `bitcoincash:` address of the sender for each input.
   *
   * This function will only work with a single txid. It does not yet support an
   * array of TXIDs.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   *  let txData = await bchjs.RawTransactions.getTxData("0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098");
   *  console.log(txData);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   */
  // Equivalent to running: async getRawTransaction (txid, verbose = true)
  // Only handles a single TXID (not arrays).
  // Appends the BCH address to the inputs of the transaction.
  async getTxData (txid) {
    try {
      // console.log('getTxData() txid: ', txid)

      if (typeof txid !== 'string') {
        throw new Error(
          'Input to raw-transaction.js/getTxData() must be a string containg a TXID.'
        )
      }

      // Get the TX details for the transaction under consideration.
      const txDetails = await this.getRawTransaction(txid, true)
      // console.log(`txDetails: ${JSON.stringify(txDetails, null, 2)}`)

      try {
        const inAddrs = await this._getInputAddrs(txDetails)
        // console.log(`inAddrs: ${JSON.stringify(inAddrs, null, 2)}`)

        // Add the input address to the transaction data.
        for (let i = 0; i < inAddrs.length; i++) {
          txDetails.vin[i].address = inAddrs[i].address
          txDetails.vin[i].value = inAddrs[i].value
        }
      } catch (err) {
        // Coinbase transactions will throw an error. Just ignore them and
        // pass back the raw transaction data.
        /* exit quietly */
      }
      // console.log(`txDetails: ${JSON.stringify(txDetails, null, 2)}`)

      return txDetails
    } catch (error) {
      // console.log('error: ', error)
      if (error.error) throw new Error(error.error)

      // This case handles rate limit errors.
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error)
      } else if (error.response && error.response.data) {
        throw error.response.data
      } else throw error
    }
  }

  /**
   * @api RawTransactions.sendRawTransaction() sendRawTransaction()
   * @apiName sendRawTransaction
   * @apiGroup RawTransactions
   * @apiDescription
   * Submits raw transaction (serialized, hex-encoded) to local node and network. Also see createrawtransaction and signrawtransaction calls.
   *
   * For bulk uploads, transactions must use different UTXOs.
   *
   * @apiExample Example usage:
   * // single tx
   * (async () => {
   * try {
   *  let sendRawTransaction = await bchjs.RawTransactions.sendRawTransaction("01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0704ffff001d0104ffffffff0100f2052a0100000043410496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858eeac00000000");
   *  console.log(sendRawTransaction);
   * } catch(error) {
   *  console.error(error)
   * }
   * })()
   * // 0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098
   *
   * // single tx as array
   * (async () => {
   * try {
   *  let sendRawTransaction = await bchjs.RawTransactions.sendRawTransaction(["01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0704ffff001d0104ffffffff0100f2052a0100000043410496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858eeac00000000"]);
   *  console.log(sendRawTransaction);
   * } catch(error) {
   *  console.error(error)
   * }
   * })()
   * // ['0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098']
   */
  async sendRawTransaction (hex, allowhighfees = false) {
    try {
      // Single tx hex.
      if (typeof hex === 'string') {
        const response = await this.axios.get(
          `${this.restURL}rawtransactions/sendRawTransaction/${hex}`,
          this.axiosOptions
        )

        if (response.data === '66: insufficient priority') {
          console.warn(
            `WARN: Insufficient Priority! This is likely due to a fee that is too low, or insufficient funds.
            Please ensure that there is BCH in the given wallet. If you are running on the testnet, get some
            BCH from the testnet faucet at https://developer.bitcoin.com/faucets/bch`
          )
        }

        return response.data

        // Array input
      } else if (Array.isArray(hex)) {
        const options = {
          method: 'POST',
          url: `${this.restURL}rawtransactions/sendRawTransaction`,
          data: {
            hexes: hex
          },
          headers: this.axiosOptions.headers
        }
        const response = await this.axios(options)

        return response.data
      }

      throw new Error('Input hex must be a string or array of strings.')
    } catch (error) {
      if (error.error) throw new Error(error.error)
      else if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = RawTransactions

```

`/home/trout/work/psf/code/bch-js/src/ecash.js`:

```js
/*
  Utility library for converting units with eCash.
*/

class eCash {
  /**
   * @api eCash.toSatoshi() toSatoshi()
   * @apiName toSatoshi
   * @apiGroup eCash
   * @apiDescription
   * Convert XEC units into satoshi units
   *
   * @apiExample Example usage:
   * // convert 10,704.35 XEC to satoshis:
   * bchjs.eCash.toSatoshi(10704.35)
   * // 1070435
   */
  toSatoshi (xec) {
    if (typeof xec !== 'number') {
      throw new Error('input must be a floating number representing XEC')
    }

    return Math.floor(xec * 100)
  }

  /**
   * @api eCash.toXec() toXec()
   * @apiName toXec
   * @apiGroup eCash
   * @apiDescription
   * Convert satoshi units to XEC units
   *
   * @apiExample Example usage:
   * // convert 1,070,435 satoshis to XEC:
   * bchjs.eCash.toSatoshi(1070435)
   * // 10704.35
   */
  toXec (sats) {
    if (typeof sats !== 'number') {
      throw new Error('input must be a floating number representing satoshis')
    }

    return sats / 100
  }
}

module.exports = eCash

```

`/home/trout/work/psf/code/bch-js/src/utxo.js`:

```js
/*
  High-level functions for working with UTXOs

  TODO:
  - Make a getWL() clone of get(), but uses hydrateUtxosWL()
*/

// Local libraries
const Electrumx = require('./electrumx')
const Slp = require('./slp/slp')
const PsfSlpIndexer = require('./psf-slp-indexer')
const BigNumber = require('bignumber.js')
const Blockchain = require('./blockchain')

class UTXO {
  constructor (config = {}) {
    // Encapsulate dependencies for easier mocking.
    this.electrumx = new Electrumx(config)
    this.slp = new Slp(config)
    this.psfSlpIndexer = new PsfSlpIndexer(config)
    this.BigNumber = BigNumber
    this.blockchain = new Blockchain(config)
  }

  /**
   * @api Utxo.get() get()
   * @apiName get
   * @apiGroup UTXO
   * @apiDescription Get UTXOs for an address (from psf-slp-indexer)
   *
   * Given an address, this function will return an object with thre following
   * properties:
   * - address: "" - the address these UTXOs are associated with
   * - bchUtxos: [] - UTXOs confirmed to be spendable as normal BCH
   * - infoUtxos: [] - UTXOs under of 1000 sats or less that can not be categorized
   *                   as another type of UTXO (like a token).
   * - nullUtxo: [] - UTXOs that did not pass SLP validation. Should be ignored and
   *   not spent, to be safe.
   * - slpUtxos: {} - UTXOs confirmed to be colored as valid SLP tokens
   *   - type1: {}
   *     - tokens: [] - SLP token Type 1 tokens.
   *     - mintBatons: [] - SLP token Type 1 mint batons.
   *   - nft: {}
   *     - tokens: [] - NFT tokens
   *     - groupTokens: [] - NFT Group tokens, used to create NFT tokens.
   *     - groupMintBatons: [] - Minting baton to create more NFT Group tokens.
   *
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     let utxos = await bchjs.Utxo.get('simpleledger:qrm0c67wwqh0w7wjxua2gdt2xggnm90xwsr5k22euj');
   *     console.log(utxos);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * // returns
   * [
   *  {
   *   "address": "bitcoincash:qrm0c67wwqh0w7wjxua2gdt2xggnm90xws00a3lezv",
   *   "bchUtxos": [
   *    {
   *      "height": 674513,
   *      "tx_hash": "705bcc442e5a2770e560b528f52a47b1dcc9ce9ab6a8de9dfdefa55177f00d04",
   *      "tx_pos": 3,
   *      "value": 38134,
   *      "txid": "705bcc442e5a2770e560b528f52a47b1dcc9ce9ab6a8de9dfdefa55177f00d04",
   *      "vout": 3,
   *      "isValid": false
   *    }
   *   ],
   */
  // This version of get() uses the psf-slp-indexer. It will replace the older
  // get() function that uses SLPDB.
  // TODO: NFT UTXOs are identified as non-token UTXOs, which will cause a wallet
  // to burn them. The psf-slp-indexer needs to be updated to mark these UTXOs.
  async get (address) {
    try {
      // Convert address to an array if it is a string.
      if (typeof address !== 'string') {
        throw new Error('address input must be a string')
      }

      // Ensure the address is a BCH address.
      let addr = address
      if (!addr.includes('ecash')) {
        addr = this.slp.Address.toCashAddress(address)
      }

      // Get the UTXOs associated with the address.
      const utxoData = await this.electrumx.utxo(addr)
      // console.log(`utxoData: ${JSON.stringify(utxoData, null, 2)}`)
      const utxos = utxoData.utxos

      let slpUtxos = []

      // Get SLP UTXOs from the psf-slp-indexer
      try {
        const slpUtxoData = await this.psfSlpIndexer.balance(addr)
        // console.log(`slpUtxoData: ${JSON.stringify(slpUtxoData, null, 2)}`)

        slpUtxos = slpUtxoData.balance.utxos
      } catch (err) {
        // console.log('err: ', err)

        // Exit quietly if address has no SLP UTXOs. Otherwise, throw the error.
        if (err.error && !err.error.includes('Key not found in database')) {
          throw err
        }
      }

      // Get the sync status of the SLP indexer
      const syncStatus = await this.psfSlpIndexer.status()
      const slpIndexerHeight = syncStatus.status.syncedBlockHeight
      const chainBlockHeight = syncStatus.status.chainBlockHeight

      // Loop through the Fulcrum UTXOs.
      for (let i = 0; i < utxos.length; i++) {
        const thisUtxo = utxos[i]

        // Loop through the UTXOs from psf-slp-indexer.
        for (let j = 0; j < slpUtxos.length; j++) {
          const thisSlpUtxo = slpUtxos[j]

          // If the non-hydrated UTXO matches the SLP UTXO, then combine the data
          // and mark the UTXO as an SLP token.
          if (
            thisUtxo.tx_hash === thisSlpUtxo.txid &&
            thisUtxo.tx_pos === thisSlpUtxo.vout
          ) {
            thisUtxo.txid = thisUtxo.tx_hash
            thisUtxo.vout = thisUtxo.tx_pos
            thisUtxo.isSlp = true
            thisUtxo.type = thisSlpUtxo.type
            thisUtxo.qty = thisSlpUtxo.qty
            thisUtxo.tokenId = thisSlpUtxo.tokenId
            thisUtxo.address = thisSlpUtxo.address
            thisUtxo.tokenType = thisSlpUtxo.tokenType

            break
          }
        }

        // If there was no match, then this is a normal BCH UTXO. Mark it as such.
        if (!thisUtxo.isSlp) {
          thisUtxo.txid = thisUtxo.tx_hash
          thisUtxo.vout = thisUtxo.tx_pos
          thisUtxo.address = addr

          // Check the transaction to see if its a 'null' token, ignored by
          // the indexer.
          const txData = await this.psfSlpIndexer.tx(thisUtxo.tx_hash)
          // console.log(`txData: ${JSON.stringify(txData, null, 2)}`)

          // txData.txData === undefined if the SLP indexer is syncing.
          if (!txData.txData || txData.txData.isValidSlp === null) {
            thisUtxo.isSlp = null
          } else {
            thisUtxo.isSlp = false
          }
          // console.log(`thisUtxo.isSlp: ${thisUtxo.isSlp}`)

          // If the SLP indexer more than 1 block behind the full node, then
          // move any BCH UTXOs of 600 sats or less into the null array. This
          // protects token UTXOs from being burned accidentally.
          if (slpIndexerHeight < chainBlockHeight - 1) {
            if (thisUtxo.value < 601) {
              thisUtxo.isSlp = null
            }
          }
        }
      }

      // Get token UTXOs
      let type1TokenUtxos = utxos.filter(
        x => x.isSlp === true && x.type === 'token' && x.tokenType === 1
      )

      // Hydrate the UTXOs with additional token data.
      type1TokenUtxos = await this.hydrateTokenData(type1TokenUtxos)

      // Collect BCH UTXOs above 1000 sats
      const bchUtxos = utxos.filter(x => x.isSlp === false && x.value > 1000)

      // Collect all BCH UTXOs at 1000 sats or smaller
      // The prevents SLP tokens, BCMR, and other 'colored' UTXOs from being
      // accidentally included into normal BCH transactions.
      const infoUtxos = utxos.filter(x => x.isSlp === false && x.value <= 1000)

      // Collect and hydrate any type1 baton UTXOs
      let type1BatonUtxos = utxos.filter(
        x => x.isSlp === true && x.type === 'baton' && x.tokenType === 1
      )
      type1BatonUtxos = await this.hydrateTokenData(type1BatonUtxos)

      // Collect and hydrate NFT Group tokens
      let nftGroupTokenUtxos = utxos.filter(
        x => x.isSlp === true && x.type === 'token' && x.tokenType === 129
      )
      nftGroupTokenUtxos = await this.hydrateTokenData(nftGroupTokenUtxos)

      // Collect and hydrate any Group baton UTXOs
      let groupBatonUtxos = utxos.filter(
        x => x.isSlp === true && x.type === 'baton' && x.tokenType === 129
      )
      groupBatonUtxos = await this.hydrateTokenData(groupBatonUtxos)

      // Collect and hydrate NFT child tokens
      let nftChildTokenUtxos = utxos.filter(
        x => x.isSlp === true && x.type === 'token' && x.tokenType === 65
      )
      nftChildTokenUtxos = await this.hydrateTokenData(nftChildTokenUtxos)

      // Isolate any UTXOs that are marked null by the SLP indexer.
      const nullUtxos = utxos.filter(x => x.isSlp === null)

      const outObj = {
        address: addr,
        bchUtxos,
        infoUtxos,
        slpUtxos: {
          type1: {
            tokens: type1TokenUtxos,
            mintBatons: type1BatonUtxos
          },
          group: {
            tokens: nftGroupTokenUtxos,
            mintBatons: groupBatonUtxos
          },
          nft: {
            tokens: nftChildTokenUtxos
          }
        },
        nullUtxos
      }

      return outObj
    } catch (err) {
      console.error('Error in bchjs.Utxo.get(): ', err)

      if (err.error) throw new Error(err.error)
      throw err
    }
  }

  // Hydrate an array of token UTXOs with token information.
  // Returns an array of token UTXOs with additional data.
  async hydrateTokenData (utxoAry) {
    try {
      // console.log('utxoAry: ', utxoAry)

      // Create a list of token IDs without duplicates.
      let tokenIds = utxoAry.map(x => x.tokenId)

      // Remove duplicates. https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
      tokenIds = [...new Set(tokenIds)]
      // console.log('tokenIds: ', tokenIds)

      // Get Genesis data for each tokenId
      const genesisData = []
      for (let i = 0; i < tokenIds.length; i++) {
        const thisTokenId = tokenIds[i]
        const thisTokenData = await this.psfSlpIndexer.tokenStats(thisTokenId)
        // console.log('thisTokenData: ', thisTokenData)

        genesisData.push(thisTokenData)
      }
      // console.log('genesisData: ', genesisData)

      // Hydrate each token UTXO with data from the genesis transaction.
      for (let i = 0; i < utxoAry.length; i++) {
        const thisUtxo = utxoAry[i]

        // Get the genesis data for this token.
        const genData = genesisData.filter(
          x => x.tokenData.tokenId === thisUtxo.tokenId
        )
        // console.log('genData: ', genData)

        thisUtxo.ticker = genData[0].tokenData.ticker
        thisUtxo.name = genData[0].tokenData.name
        thisUtxo.documentUri = genData[0].tokenData.documentUri
        thisUtxo.documentHash = genData[0].tokenData.documentHash
        thisUtxo.decimals = genData[0].tokenData.decimals

        if (thisUtxo.type !== 'baton') {
          // Calculate the real token quantity
          const qty = new BigNumber(thisUtxo.qty).dividedBy(
            10 ** parseInt(thisUtxo.decimals)
          )
          thisUtxo.qtyStr = qty.toString()

          // tokenQty is property expected by SLP.tokentype1.js library
          thisUtxo.tokenQty = thisUtxo.qtyStr
        }
      }

      return utxoAry
    } catch (err) {
      console.log('Error in hydrateTokenData()')
      throw err
    }
  }

  /**
   * @api Utxo.findBiggestUtxo() findBiggestUtxo()
   * @apiName findBiggestUtxo
   * @apiGroup UTXO
   * @apiDescription Get the biggest UTXO in an array.
   *
   * Given an array of BCH UTXOs, this method will return the biggest UTXO.
   * This is often the simplest way to pick a UTXO for generating a transaction.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     const utxos = await bchjs.Utxo.get('bitcoincash:qq54fgjn3hz0357n8a6guy4demw9xfkjk5jcj0xr0z');
   *     const utxo = bchjs.Utxo.findBiggestUtxo(utxos[0].bchUtxos)
   *     console.log(utxo);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * // returns
   *  {
   *   "height": 655431,
   *   "tx_hash": "7a091716f8137e94f87e7760648cd34a17e32754ef95f7c7bda38a635c9b2b1b",
   *   "tx_pos": 0,
   *   "value": 800,
   *   "txid": "7a091716f8137e94f87e7760648cd34a17e32754ef95f7c7bda38a635c9b2b1b",
   *   "vout": 0,
   *   "isValid": false,
   *   "satoshis": 800
   *  }
   */
  // Returns the utxo with the biggest balance from an array of utxos.
  findBiggestUtxo (utxos) {
    let largestAmount = 0
    let largestIndex = 0

    if (!Array.isArray(utxos)) {
      throw new Error('utxos input to findBiggestUtxo() must be an array')
    }

    for (let i = 0; i < utxos.length; i++) {
      const thisUtxo = utxos[i]

      // Give Elecrumx utxos a satoshis property.
      if (thisUtxo.value) {
        if (!thisUtxo.satoshis) thisUtxo.satoshis = Number(thisUtxo.value)
      }

      if (!thisUtxo.satoshis) {
        throw new Error(
          'UTXOs require a satoshis or value property for findBiggestUtxo()'
        )
      }

      if (thisUtxo.satoshis > largestAmount) {
        largestAmount = thisUtxo.satoshis
        largestIndex = i
      }
    }

    return utxos[largestIndex]
  }

  /**
   * @api Utxo.isValid() isValid()
   * @apiName isValid
   * @apiGroup UTXO
   * @apiDescription Validate that UTXO exists and is still spendable.
   *
   * Given a UTXO, this method will return true if the UTXO is still in the
   * mempool and still valid for spending. It will return false if the UTXO
   * has been spent.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     const utxos = await bchjs.Utxo.get('bitcoincash:qq54fgjn3hz0357n8a6guy4demw9xfkjk5jcj0xr0z');
   *     const isValid = bchjs.Utxo.isValid(utxos.bchUtxos[0])
   *     console.log(isValid);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * // returns
   *  true
   */
  async isValid (utxo) {
    try {
      // console.log('utxo: ', utxo)

      // Convert different properties from different indexers
      const txid = utxo.txid || utxo.tx_hash
      const vout = utxo.vout | utxo.tx_pos

      // Query the full node
      const txOut = await this.blockchain.getTxOut(txid, vout, true)
      // console.log('txOut: ', txOut)

      // Simplify results to either true or false.
      let isValid = null
      if (txOut === null) {
        isValid = false
      } else {
        isValid = true
      }

      return isValid
    } catch (err) {
      console.log('Error in Utxo.isValid()')
      throw err
    }
  }
}

module.exports = UTXO

```

`/home/trout/work/psf/code/bch-js/src/psf-slp-indexer.js`:

```js
/*
  This library interacts with the PSF slp indexer REST API endpoints operated
  by FullStack.cash

  TODO:
  - detect TXs from tokens in the blacklist.
*/

// Public npm libraries
const axios = require('axios')

// Local libraries
const RawTransaction = require('./raw-transactions')
const SlpUtils = require('./slp/utils')

// let _this

class PsfSlpIndexer {
  constructor (config = {}) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.authToken = config.authToken

    if (this.authToken) {
      // Add Basic Authentication token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: this.authToken
        }
      }
    } else {
      // Add JWT token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: `Token ${this.apiToken}`
        }
      }
    }

    // Encapsulate dependencies
    this.rawTransaction = new RawTransaction(config)
    this.slpUtils = new SlpUtils(config)

    // _this = this
  }

  /**
   * @api PsfSlpIndexer.status()  status()
   * @apiName Status
   * @apiGroup PSF SLP
   * @apiDescription Return status from psf slp indexer.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     let status = await bchjs.PsfSlpIndexer.status()
   *     console.log(status)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   *  {
   *    "status": {
   *      "startBlockHeight": 543376,
   *      "syncedBlockHeight": 723249,
   *      "chainBlockHeight": 722679
   *     }
   *  }
   *
   */
  async status () {
    try {
      const response = await axios.get(
        `${this.restURL}psf/slp/status`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api PsfSlpIndexer.balance()  balance()
   * @apiName SLP Balance
   * @apiGroup PSF SLP
   * @apiDescription Return slp balance for a single address.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     let balance = await bchjs.PsfSlpIndexer.balance('bitcoincash:qzmd5vxgh9m22m6fgvm57yd6kjnjl9qnwywsf3583n')
   *     console.log(balance)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   *  {
   *    balance: {
   *      utxos: [
   *        {
   *          txid: 'a24a6a4abf06fabd799ecea4f8fac6a9ff21e6a8dd6169a3c2ebc03665329db9',
   *          vout: 1,
   *          type: 'token',
   *          qty: '1800',
   *          tokenId: 'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2',
   *          address: 'bitcoincash:qrqy3kj7r822ps6628vwqq5k8hyjl6ey3y4eea2m4s'
   *        }
   *      ],
   *      txs: [
   *        {
   *          txid: '078b2c48ed1db0d5d5996f2889b8d847a49200d0a781f6aa6752f740f312688f',
   *          height: 717796
   *        },
   *        {
   *          txid: 'a24a6a4abf06fabd799ecea4f8fac6a9ff21e6a8dd6169a3c2ebc03665329db9',
   *          height: 717832
   *        }
   *      ],
   *      balances: [
   *        {
   *          tokenId: 'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2',
   *          qty: '1800'
   *        }
   *      ]
   *    }
   *  }
   *
   */
  async balance (address) {
    try {
      // console.log('balance() address: ', address)

      // Handle single address.
      if (typeof address === 'string') {
        const response = await axios.post(
          `${this.restURL}psf/slp/address`,
          { address },
          this.axiosOptions
        )
        return response.data
      }
      throw new Error('Input address must be a string.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api PsfSlpIndexer.tokenStats()  tokenStats()
   * @apiName Token Stats
   * @apiGroup PSF SLP
   * @apiDescription Return list stats for a single slp token.
   * The second input is a Boolean, which determins the the transaction history
   * of the token is included in the returned data. The default is false.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     let tokenStats = await bchjs.PsfSlpIndexer.tokenStats('a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2', true)
   *     console.log(tokenStats)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * {
   *   tokenData: {
   *     type: 1,
   *     ticker: 'TROUT',
   *     name: "Trout's test token",
   *     tokenId: 'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2',
   *     documentUri: 'troutsblog.com',
   *     documentHash: '',
   *     decimals: 2,
   *     mintBatonIsActive: true,
   *     tokensInCirculationBN: '100098953386',
   *     tokensInCirculationStr: '100098953386',
   *     blockCreated: 622414,
   *     totalBurned: '1046614',
   *     totalMinted: '100100000000'
   *     txs: [
   *       {
   *         txid: 'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2',
   *         height: 622414,
   *         type: 'GENESIS',
   *         qty: '100000000000'
   *       }
   *     ]
   *   }
   * }
   *
   *
   */

  async tokenStats (tokenId, withTxHistory = false) {
    try {
      // Handle single address.
      if (typeof tokenId === 'string') {
        const response = await axios.post(
          `${this.restURL}psf/slp/token`,
          { tokenId, withTxHistory },
          this.axiosOptions
        )
        return response.data
      }
      throw new Error('Input tokenId must be a string.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api PsfSlpIndexer.tx()  tx()
   * @apiName SLP Transaction Data
   * @apiGroup PSF SLP
   * @apiDescription Return slp transaction data.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     let txData = await bchjs.PsfSlpIndexer.tx('a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2')
   *     console.log(txData)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * {
   *   txData: {
   *     txid: 'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2',
   *     hash: 'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2',
   *     version: 2,
   *     size: 339,
   *     locktime: 0,
   *     vin: [
   *       {
   *         txid: '8370db30d94761ab9a11b71ecd22541151bf6125c8c613f0f6fab8ab794565a7',
   *         vout: 0,
   *         scriptSig: {
   *           asm: '304402207e9631c53dfc8a9a793d1916469628c6b7c5780c01c2f676d51ef21b0ba4926f022069feb471ec869a49f8d108d0aaba04e7cd36e60a7500109d86537f55698930d4[ALL|FORKID] 02791b19a39165dbd83403d6df268d44fd621da30581b0b6e5cb15a7101ed58851',
   *           hex: '47304402207e9631c53dfc8a9a793d1916469628c6b7c5780c01c2f676d51ef21b0ba4926f022069feb471ec869a49f8d108d0aaba04e7cd36e60a7500109d86537f55698930d4412102791b19a39165dbd83403d6df268d44fd621da30581b0b6e5cb15a7101ed58851'
   *         },
   *         sequence: 4294967295,
   *         address: 'bitcoincash:qpvsg9vl9a5mlf37a7n3yce6pktdctn73qwgaqm3wq',
   *         value: 0.00051303,
   *         tokenQty: 0,
   *         tokenQtyStr: '0',
   *         tokenId: null
   *       }
   *     ],
   *     vout: [
   *       {
   *         value: 0,
   *         n: 0,
   *         scriptPubKey: {
   *           asm: 'OP_RETURN 5262419 1 47454e45534953 54524f5554 54726f75742773207465737420746f6b656e 74726f757473626c6f672e636f6d 0 2 2 000000174876e800',
   *           hex: '6a04534c500001010747454e455349530554524f55541254726f75742773207465737420746f6b656e0e74726f757473626c6f672e636f6d4c000102010208000000174876e800',
   *           type: 'nulldata'
   *         },
   *         tokenQtyStr: '0',
   *         tokenQty: 0
   *       }
   *     ],
   *     hex: '0200000001a7654579abb8faf6f013c6c82561bf51115422cd1eb7119aab6147d930db7083000000006a47304402207e9631c53dfc8a9a793d1916469628c6b7c5780c01c2f676d51ef21b0ba4926f022069feb471ec869a49f8d108d0aaba04e7cd36e60a7500109d86537f55698930d4412102791b19a39165dbd83403d6df268d44fd621da30581b0b6e5cb15a7101ed58851ffffffff040000000000000000476a04534c500001010747454e455349530554524f55541254726f75742773207465737420746f6b656e0e74726f757473626c6f672e636f6d4c000102010208000000174876e80022020000000000001976a914db4d39ceb7794ffe5d06855f249e1d3a7f1b024088ac22020000000000001976a914db4d39ceb7794ffe5d06855f249e1d3a7f1b024088accec20000000000001976a9145904159f2f69bfa63eefa712633a0d96dc2e7e8888ac00000000',
   *     blockhash: '0000000000000000009f65225a3e12e23a7ea057c869047e0f36563a1f410267',
   *     confirmations: 97398,
   *     time: 1581773131,
   *     blocktime: 1581773131,
   *     blockheight: 622414,
   *     isSlpTx: true,
   *     tokenTxType: 'GENESIS',
   *     tokenId: 'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2',
   *     tokenType: 1,
   *     tokenTicker: 'TROUT',
   *     tokenName: "Trout's test token",
   *     tokenDecimals: 2,
   *     tokenUri: 'troutsblog.com',
   *     tokenDocHash: '',
   *     isValidSlp: true
   *   }
   * }
   *
   */
  async tx (txid) {
    try {
      // console.log('txid: ', txid)

      // Handle single address.
      if (typeof txid === 'string') {
        const response = await axios.post(
          `${this.restURL}psf/slp/txid`,
          { txid },
          this.axiosOptions
        )
        // console.log('response: ', response)

        return response.data
      }

      throw new Error('Input txid must be a string.')
    } catch (error) {
      // console.log('error: ', error)

      // Case: txid is not stored in the psf-slp-indexer tx database.
      // Response: If it's not in the database, then it can be assumed the TX
      // is not a token TX?
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.includes('Key not found in database')
      ) {
        // console.log(
        //   'TX not found in psf-slp-indexer. Retrieving from full node.'
        // )

        // Check if this txid belongs to a blacklisted token.
        const isInBlacklist = await this.checkBlacklist(txid)
        // console.log('isInBlacklist: ', isInBlacklist)

        // Get the TX Details from the full node.
        const txDetails = await this.rawTransaction.getTxData(txid)
        // console.log(`txDetails: ${JSON.stringify(txDetails, null, 2)}`)

        if (isInBlacklist) {
          txDetails.isValidSlp = null
        } else {
          txDetails.isValidSlp = false
        }

        const outObj = {
          txData: txDetails
        }

        return outObj
      } else throw error
    }
  }

  // Check if the txid has an OP_RETURN containing a tokenID that is in the
  // blacklist. In that case, the isValidSlp property should be marked as
  // null, and not false.
  async checkBlacklist (txid) {
    try {
      // TODO: Add endpoint to psf-slp-indexer to retrieve current blacklist.
      // This should be done once at startup, and not each time this function
      // is called.
      const blacklist = [
        'dd21be4532d93661e8ffe16db6535af0fb8ee1344d1fef81a193e2b4cfa9fbc9'
      ]

      const outTokenData = await this.slpUtils.decodeOpReturn(txid)
      // console.log('outTokenData: ', outTokenData)

      // Loop through each token in the blacklist.
      for (let i = 0; i < blacklist.length; i++) {
        // If a match is found, return true.
        if (outTokenData.tokenId === blacklist[i]) {
          return true
        }
      }

      // By default, return false.
      return false
    } catch (err) {
      // console.log(err)

      // Exit quietly.
      return false
    }
  }

  /**
   * @api PsfSlpIndexer.getTokenData()  getTokenData()
   * @apiName Token Data
   * @apiGroup PSF SLP
   * @apiDescription Get mutable and immutable data if the token contains them.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     let tokenData = await bchjs.PsfSlpIndexer.getTokenData('a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2')
   *     console.log(tokenData)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * {
   *   genesisData: {
   *     type: 1,
   *     ticker: 'TROUT',
   *     name: "Trout's test token",
   *     tokenId: 'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2',
   *     documentUri: 'troutsblog.com',
   *     documentHash: '',
   *     decimals: 2,
   *     mintBatonIsActive: true,
   *     tokensInCirculationBN: '100098953386',
   *     tokensInCirculationStr: '100098953386',
   *     blockCreated: 622414,
   *     totalBurned: '1046614',
   *     totalMinted: '100100000000'
   *     ]
   *   },
   *  immutableData :{
   *     issuer:"FullStack.cash.",
   *     website:"https://fullstack.cash/",
   *     dateCreated:"2022-01-11"
   *   },
   *  mutableData :{
   *    "tokenIcon":"https://gateway.ipfs.io/ipfs/bafybeiehitanirn5gmhqjg44xrmdtomn4n5lu5yjoepsvgpswk5mggaw6i/LP_logo-1.png",
   *    "about":"Mutable data managed with npm package: https://www.npmjs.com/package/slp-mutable-data"
   *   }
   * }
   *
   */
  async getTokenData (tokenId, withTxHistory = false) {
    try {
      const url = `${this.restURL}psf/slp/token/data`
      // console.log(`url: ${url}`)

      // Handle single address.
      if (typeof tokenId === 'string') {
        const response = await axios.post(
          // 'https://bchn.fullstack.cash/v5/psf/slp/token/data/',
          url,
          { tokenId, withTxHistory },
          this.axiosOptions
        )
        return response.data
      }
      throw new Error('Input tokenId must be a string.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api PsfSlpIndexer.getTokenData2()  getTokenData2()
   * @apiName Token Data
   * @apiGroup PSF SLP
   * @apiDescription Get token icon and other media associated with a token.
   *
   * Get the icon for a token, given it's token ID.
   * This function expects a string input of a token ID property.
   * This function returns an object with a tokenIcon property that contains
   * the URL to the icon.
   *
   * The output object always have these properties:
   * - tokenIcon: A url to the token icon, if it exists.
   * - tokenStats: Data about the token from psf-slp-indexer.
   * - optimizedTokenIcon: An alternative, potentially more optimal, url to the token icon, if it exists.
   * - iconRepoCompatible: true if the token icon is available via token.bch.sx
   * - ps002Compatible: true if the token icon is compatible with PS007 specification.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     let tokenData = await bchjs.PsfSlpIndexer.getTokenData2('a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2')
   *     console.log(tokenData)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * {
   *   tokenStats: {
   *     type: 1,
   *     ticker: 'CTAIA006',
   *     name: 'CTAIA006 - AI Art by Chris Troutner',
   *     tokenId: '0e4543f820699294ab57e02ee2b1815a8bbc7b17a4333e4a138034e4b2324a61',
   *     documentUri: 'ipfs://bafybeia5yuq7rg6jmwquako7t277cwrobcunz7cumqrv4wn6bgfvthemku',
   *     documentHash: '78a00e9db312b8fff4e5c37cf592be83e6bab7f3bd5a54c9545bad5d4f3ee0f5',
   *     decimals: 0,
   *     mintBatonIsActive: false,
   *     tokensInCirculationBN: '1',
   *     tokensInCirculationStr: '1',
   *     blockCreated: 757507,
   *     totalBurned: '0',
   *     totalMinted: '1'
   *   },
   *   mutableData: {
   *     tokenIcon: 'https://bafybeihiv5jvlhoymmbous3h2akotogj6b7hruhjcj3zq7dsfteimuuttm.ipfs.w3s.link/whale-night-sky-01.png',
   *     fullSizedUrl: '',
   *     about: 'This NFT was created using the PSF Token Studio at https://nft-creator.fullstack.cash',
   *     userData: ''
   *   },
   *   immutableData: {
   *     issuer: 'http://psfoundation.cash',
   *     website: 'https://nft-creator.fullstack.cash',
   *     dateCreated: '9/12/2022, 5:17:38 PM',
   *     userData: '{\n' +
   *       '  "title": "CTAIA006 - AI Art by Chris Troutner",\n' +
   *       '  "about": "AI generated art. Generated from DALL-E at https://labs.openai.com",\n' +
   *       '  "prompt": "whale swimming through a sky full of stars",\n' +
   *       '  "algorithm": "DALL-E (stable diffusion)",\n' +
   *       '  "set": "1-of-2"\n' +
   *       '}'
   *   },
   *   tokenIcon: 'https://bafybeihiv5jvlhoymmbous3h2akotogj6b7hruhjcj3zq7dsfteimuuttm.ipfs.w3s.link/whale-night-sky-01.png',
   *   fullSizedUrl: '',
   *   optimizedTokenIcon: 'https://p2wdb-gateway-678.fullstack.cash/ipfs/bafybeihiv5jvlhoymmbous3h2akotogj6b7hruhjcj3zq7dsfteimuuttm/whale-night-sky-01.png',
   *   optimizedFullSizedUrl: '',
   *   iconRepoCompatible: false,
   *   ps002Compatible: true
   * }
   *
   */
  async getTokenData2 (tokenId, updateCache = false) {
    try {
      const url = `${this.restURL}psf/slp/token/data2`
      // console.log(`url: ${url}`)

      // Handle single address.
      if (typeof tokenId === 'string') {
        const response = await axios.post(
          // 'https://bchn.fullstack.cash/v5/psf/slp/token/data/',
          url,
          { tokenId, updateCache },
          this.axiosOptions
        )
        return response.data
      }

      throw new Error('Input tokenId must be a string.')
    } catch (error) {
      // console.log('error: ', error)
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = PsfSlpIndexer

```

`/home/trout/work/psf/code/bch-js/src/generating.js`:

```js
const axios = require('axios')

// let _this

class Generating {
  constructor (config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.authToken = config.authToken

    if (this.authToken) {
      // Add Basic Authentication token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: this.authToken
        }
      }
    } else {
      // Add JWT token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: `Token ${this.apiToken}`
        }
      }
    }

    // _this = this
  }

  async generateToAddress (blocks, address, maxtries = 1000000) {
    try {
      const response = await axios.post(
        `${this.restURL}generating/generateToAddress/${blocks}/${address}?maxtries=${maxtries}`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = Generating

```

`/home/trout/work/psf/code/bch-js/src/bitcoincash.js`:

```js
const Bitcoin = require('@psf/bitcoincashjs-lib')
const sb = require('satoshi-bitcoin')
const bitcoinMessage = require('bitcoinjs-message')
const bs58 = require('bs58')
const bip21 = require('@psf/bip21')
const coininfo = require('@psf/coininfo')
const bip38 = require('bip38')
const wif = require('wif')

const Buffer = require('safe-buffer').Buffer

class BitcoinCash {
  constructor (address) {
    this._address = address
  }

  /**
   * @api BitcoinCash.toSatoshi() toSatoshi()
   * @apiName toSatoshi
   * @apiGroup BitcoinCash
   * @apiDescription
   * Converting Bitcoin Cash units to satoshi units.
   *
   * @apiExample Example usage:
   * // convert 9 $BCH to satoshis
   * bchjs.BitcoinCash.toSatoshi(9)
   * // 900000000
   *
   * // convert 1 $BCH to satoshis
   * bchjs.BitcoinCash.toSatoshi(1)
   * // 100000000
   *
   * // convert 100 $BCH to satoshis
   * bchjs.BitcoinCash.toSatoshi(100)
   * // 10000000000
   *
   * // convert 42 $BCH to satoshis
   * bchjs.BitcoinCash.toSatoshi(42)
   * // 4200000000
   *
   * // convert 507 $BCH to satoshis
   * bchjs.BitcoinCash.toSatoshi(507)
   * // 50700000000
   */
  // Translate coins to satoshi value
  toSatoshi (coins) {
    return sb.toSatoshi(coins)
  }

  /**
   * @api BitcoinCash.toBitcoinCash() toBitcoinCash()
   * @apiName toBitcoinCash
   * @apiGroup BitcoinCash
   * @apiDescription
   * Converting satoshi units to Bitcoin Cash units.
   *
   * @apiExample Example usage:
   * // convert 900000000 satoshis to $BCH
   * bchjs.BitcoinCash.toBitcoinCash(900000000)
   * // 9
   *
   * // convert 100000000 satoshis to $BCH
   * bchjs.BitcoinCash.toBitcoinCash(100000000)
   * // 1
   *
   * // convert 10000000000 satoshis to $BCH
   * bchjs.BitcoinCash.toBitcoinCash(10000000000)
   * // 100
   *
   * // convert 4200000000 satoshis to $BCH
   * bchjs.BitcoinCash.toBitcoinCash(4200000000)
   * // 42
   *
   * // convert 50700000000 satoshis to $BCH
   * bchjs.BitcoinCash.toBitcoinCash(50700000000)
   * // 507
   */
  // Translate satoshi to coin value
  toBitcoinCash (satoshis) {
    return sb.toBitcoin(satoshis)
  }

  /**
   * @api BitcoinCash.toBits() toBits()
   * @apiName toBits
   * @apiGroup BitcoinCash
   * @apiDescription
   * Converting satoshi units to Bits denomination.
   *
   * @apiExample Example usage:
   * // convert 4242323400 satoshis to 42423.234 bits
   * bchjs.BitcoinCash.toBits(4242323400)
   * // 42423.234
   * // convert 100000000 satoshis to 1000 bits
   * bchjs.BitcoinCash.toBits(100000000)
   * // 1000
   * // convert 314000000 satoshis to 3140 bits
   * bchjs.BitcoinCash.toBits(314000000)
   * // 3140
   * // convert 987600000000 satoshis to 9876000 bits
   * bchjs.BitcoinCash.toBits(987600000000)
   * // 9876000
   * // convert 12300 satoshis to 0.123 bits
   * bchjs.BitcoinCash.toBits(12300)
   * // 0.123
   */
  // Translate satoshi to bits denomination
  toBits (satoshis) {
    return parseFloat(satoshis) / 100
  }

  // Translate satoshi to bits denomination
  // TODO remove in 2.0
  satsToBits (satoshis) {
    return parseFloat(satoshis) / 100
  }

  // Translate bits to satoshi denomination
  // TODO remove in 2.0
  // fromBits(bits) {
  //   return this.toInteger(bits * 100);
  // }
  //
  // // Translate bits to satoshi denomination
  // satsFromBits(bits) {
  //   return this.toInteger(bits * 100);
  // }
  //
  // toInteger(number){
  //   return Math.round(  // round to nearest integer
  //     Number(number)    // type cast your input
  //   );
  // }

  /**
   * @api BitcoinCash.signMessageWithPrivKey() signMessageWithPrivKey()
   * @apiName signMessageWithPrivKey
   * @apiGroup BitcoinCash
   * @apiDescription
   * Sign message with private key.
   *
   * @apiExample Example usage:
   * bchjs.BitcoinCash.signMessageWithPrivKey(
   * 'KxtpRDUJDiutLaTV8Vuavhb6h7zq9YV9ZKA3dU79PCgYmNVmkkvS',
   * 'EARTH'
   * )
   * // IIYVhlo2Z6TWFjYX1+YM+7vQKz0m+zYdSe4eYpFLuAQDEZXqll7lZC8Au22VI2LLP5x+IerZckVk3QQPsA3e8/8=
   */
  // sign message
  signMessageWithPrivKey (privateKeyWIF, message) {
    const network = privateKeyWIF.charAt(0) === 'c' ? 'testnet' : 'mainnet'
    let bitcoincash
    if (network === 'mainnet') bitcoincash = coininfo.bitcoincash.main
    else bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    const keyPair = Bitcoin.ECPair.fromWIF(
      privateKeyWIF,
      bitcoincashBitcoinJSLib
    )
    const privateKey = keyPair.d.toBuffer(32)
    return bitcoinMessage
      .sign(message, privateKey, keyPair.compressed)
      .toString('base64')
  }

  /**
   * @api BitcoinCash.verifyMessage() verifyMessage()
   * @apiName verifyMessage
   * @apiGroup BitcoinCash
   * @apiDescription
   * Verify message.
   *
   * @apiExample Example usage:
   * bchjs.BitcoinCash.verifyMessage(
   * 'bitcoincash:qp2zvw3zpk5xx43w4tve7mtekd9kaxwj4uenq9eupv',
   * 'IIYVhlo2Z6TWFjYX1+YM+7vQKz0m+zYdSe4eYpFLuAQDEZXqll7lZC8Au22VI2LLP5x+IerZckVk3QQPsA3e8/8=',
   * 'EARTH'
   * )
   * // true
   */
  // verify message
  verifyMessage (address, signature, message) {
    return bitcoinMessage.verify(
      message,
      this._address.toLegacyAddress(address),
      signature
    )
  }

  /**
   * @api BitcoinCash.encodeBase58Check() encodeBase58Check()
   * @apiName encodeBase58Check
   * @apiGroup BitcoinCash
   * @apiDescription
   * Encodes hex string as base58Check.
   *
   * @apiExample Example usage:
   * // encode 0079bd35d306f648350818470c9f18903df6e06902a026f2a7 as base58check
   * let hex = '0079bd35d306f648350818470c9f18903df6e06902a026f2a7'
   * bchjs.BitcoinCash.encodeBase58Check(hex)
   * // 1C6hRmfzvWst5WA7bFRCVAqHt5gE2g7Qar
   *
   * // encode 006da742680accf2282df5fade8e9b7a01a517e779289b52cc as base58check
   * let hex = '006da742680accf2282df5fade8e9b7a01a517e779289b52cc'
   * bchjs.BitcoinCash.encodeBase58Check(hex)
   * // 1Azo2JBz2JswboeY9xSMcp14BAfhjnD9SK
   *
   * // encode 00c68a6a07ccdaf1669cfd8d244d80ff36b713551c6208f672 as base58check
   * let hex = '00c68a6a07ccdaf1669cfd8d244d80ff36b713551c6208f672'
   * bchjs.BitcoinCash.encodeBase58Check(hex)
   * // 1K6ncAmMEyQrKUYosZRD9swyZNXECu2aKs
   *
   * // encode 00d0a6b5e3dd43d0fb895b3b3df565bb8266c5ab00a25dbeb5 as base58check
   * let hex = '00d0a6b5e3dd43d0fb895b3b3df565bb8266c5ab00a25dbeb5'
   * bchjs.BitcoinCash.encodeBase58Check(hex)
   * // 1L2FG9hH3bwchhxHaCs5cg1QNbhmbaeAs6
   *
   * // encode 00db04c2e6f104997cb04c956bf25da6078e559d303127f08b as base58check
   * let hex = '00db04c2e6f104997cb04c956bf25da6078e559d303127f08b'
   * bchjs.BitcoinCash.encodeBase58Check(hex)
   * // 1Ly4gqPddveYHMNkfjoXHanVszXpD3duKg
   */
  // encode base58Check
  encodeBase58Check (hex) {
    return bs58.encode(Buffer.from(hex, 'hex'))
  }

  /**
   * @api BitcoinCash.decodeBase58Check() decodeBase58Check()
   * @apiName decodeBase58Check
   * @apiGroup BitcoinCash
   * @apiDescription
   * Decodes base58Check encoded string to hex.
   *
   * @apiExample Example usage:
   * // decode 1C6hRmfzvWst5WA7bFRCVAqHt5gE2g7Qar to hex
   * let base58check = '1C6hRmfzvWst5WA7bFRCVAqHt5gE2g7Qar'
   * bchjs.BitcoinCash.decodeBase58Check(base58check)
   * // 0079bd35d306f648350818470c9f18903df6e06902a026f2a7
   *
   * // decode 1Azo2JBz2JswboeY9xSMcp14BAfhjnD9SK to hex
   * let base58check = '1Azo2JBz2JswboeY9xSMcp14BAfhjnD9SK'
   * bchjs.BitcoinCash.decodeBase58Check(base58check)
   * // 006da742680accf2282df5fade8e9b7a01a517e779289b52cc
   *
   * // decode 1K6ncAmMEyQrKUYosZRD9swyZNXECu2aKs to hex
   * let base58check = '1K6ncAmMEyQrKUYosZRD9swyZNXECu2aKs'
   * bchjs.BitcoinCash.decodeBase58Check(base58check)
   * // 00c68a6a07ccdaf1669cfd8d244d80ff36b713551c6208f672
   *
   * // decode 1L2FG9hH3bwchhxHaCs5cg1QNbhmbaeAs6 to hex
   * let base58check = '1L2FG9hH3bwchhxHaCs5cg1QNbhmbaeAs6'
   * bchjs.BitcoinCash.decodeBase58Check(base58check)
   * // 00d0a6b5e3dd43d0fb895b3b3df565bb8266c5ab00a25dbeb5
   *
   * // decode 1Ly4gqPddveYHMNkfjoXHanVszXpD3duKg to hex
   * let base58check = '1Ly4gqPddveYHMNkfjoXHanVszXpD3duKg'
   * bchjs.BitcoinCash.decodeBase58Check(base58check)
   * // 00db04c2e6f104997cb04c956bf25da6078e559d303127f08b
   */
  // decode base58Check
  decodeBase58Check (address) {
    return bs58.decode(address).toString('hex')
  }

  /**
   * @api BitcoinCash.encodeBIP21() encodeBIP21()
   * @apiName encodeBIP21
   * @apiGroup BitcoinCash
   * @apiDescription
   * Encodes address and options as BIP21 uri.
   *
   * @apiExample Example usage:
   * let address = 'bitcoincash:qrdsfshx7yzfjl9sfj2khuja5crcu4vaxqrt2qkz5s'
   * let options = {
   * amount: 1,
   * label: '#BCHForEveryone',
   * }
   * bchjs.BitcoinCash.encodeBIP21(address, options)
   * // bitcoincash:qrdsfshx7yzfjl9sfj2khuja5crcu4vaxqrt2qkz5s?amount=1&label=%23BCHForEveryone
   *
   * let address = '1C6hRmfzvWst5WA7bFRCVAqHt5gE2g7Qar'
   * let options = {
   * amount: 12.5,
   * label: 'coinbase donation',
   * message: "and ya don't stop",
   * }
   * bchjs.BitcoinCash.encodeBIP21(address, options)
   * // bitcoincash:qpum6dwnqmmysdggrprse8ccjq7ldcrfqgmmtgcmny?amount=12.5&label=coinbase%20donation&message=and%20ya%20don%27t%20stop
   *
   * let address = 'qzw6tfrh8p0jh834uf9rhg77pjg5rgnt3qw0e54u03'
   * let options = {
   *  amount: 42,
   *  label: 'no prefix',
   * }
   * bchjs.BitcoinCash.encodeBIP21(address, options)
   * // bitcoincash:qzw6tfrh8p0jh834uf9rhg77pjg5rgnt3qw0e54u03?amount=42&label=no%20prefix
   */
  // encode bip21 url
  encodeBIP21 (address, options, regtest = false) {
    return bip21.encode(
      this._address.toCashAddress(address, true, regtest),
      options
    )
  }

  /**
   * @api BitcoinCash.decodeBIP21() decodeBIP21()
   * @apiName decodeBIP21
   * @apiGroup BitcoinCash
   * @apiDescription
   * Decodes BIP21 uri.
   *
   * @apiExample Example usage:
   * let bip21 =
   * 'bitcoincash:qrdsfshx7yzfjl9sfj2khuja5crcu4vaxqrt2qkz5s?amount=1&label=%23BCHForEveryone'
   * bchjs.BitcoinCash.decodeBIP21(bip21)
   * // { address: 'qrdsfshx7yzfjl9sfj2khuja5crcu4vaxqrt2qkz5s', options: { amount: 1, label: '#BCHForEveryone' } }
   *
   * let bip21 =
   * 'bitcoincash:qpum6dwnqmmysdggrprse8ccjq7ldcrfqgmmtgcmny?amount=12.5&label=coinbase%20donation&message=and%20ya%20don%27t%20stop'
   * bchjs.BitcoinCash.decodeBIP21(bip21)
   * // { address: 'qpum6dwnqmmysdggrprse8ccjq7ldcrfqgmmtgcmny',
   * //   options:
   * //    { amount: 12.5,
   * //      label: 'coinbase donation',
   * //      message: 'and ya don\'t stop'
   * //    }
   * // }
   *
   * let bip21 =
   * 'bitcoincash:qzw6tfrh8p0jh834uf9rhg77pjg5rgnt3qw0e54u03?amount=42&label=no%20prefix'
   * bchjs.BitcoinCash.decodeBIP21(bip21)
   * // { address: 'qzw6tfrh8p0jh834uf9rhg77pjg5rgnt3qw0e54u03', options: { amount: 42, label: 'no prefix' } }
   */
  // decode bip21 url
  decodeBIP21 (url) {
    return bip21.decode(url)
  }

  /**
   * @api BitcoinCash.getByteCount() getByteCount()
   * @apiName getByteCount
   * @apiGroup BitcoinCash
   * @apiDescription
   * Get byte count of transaction.
   *
   * @apiExample Example usage:
   * // 1 P2PKH input
   * let inputs = {
   * P2PKH: 1,
   * }
   * // 1 P2SH output
   * let outputs = {
   *  P2SH: 1,
   * }
   * bchjs.BitcoinCash.getByteCount(inputs, outputs)
   * // 190
   *
   * // 4 MULTISIG-P2SH 2-of-4 and 10 P2PKH inputs
   * let inputs = {
   * 'MULTISIG-P2SH:2-4': 4,
   * P2PKH: 10,
   * }
   * // 23 P2PKH outputs
   * let outputs = {
   * P2PKH: 23,
   * }
   * bchjs.BitcoinCash.getByteCount(inputs, outputs)
   * // 2750
   *
   * // 2 MULTISIG-P2SH 3-of-5 inputs
   * let inputs = {
   * 'MULTISIG-P2SH:3-5': 2,
   * }
   * // 2 P2PKH outputs
   * let outputs = {
   * P2PKH: 2,
   * }
   * bchjs.BitcoinCash.getByteCount(inputs, outputs)
   * // 565
   *
   * // 111 P2PKH inputs
   * let inputs = {
   * P2PKH: 111,
   * }
   * // 2 P2PKH outputs
   * let outputs = {
   * P2PKH: 2,
   * }
   * bchjs.BitcoinCash.getByteCount(inputs, outputs)
   * // 16506
   *
   * // 10 P2PKH and 1 MULTISIG-P2SH 1-of-2 input
   * let inputs = {
   * P2PKH: 10,
   * 'MULTISIG-P2SH:1-2': 1,
   * }
   * // 2 P2PKH and 1 P2SH outputs
   * let outputs = {
   * P2PKH: 2,
   * P2SH: 1,
   * }
   * bchjs.BitcoinCash.getByteCount(inputs, outputs)
   * // 1780
   */
  getByteCount (inputs, outputs) {
    // from https://github.com/bitcoinjs/bitcoinjs-lib/issues/921#issuecomment-354394004
    let totalWeight = 0
    let hasWitness = false
    // assumes compressed pubkeys in all cases.
    const types = {
      inputs: {
        'MULTISIG-P2SH': 49 * 4,
        'MULTISIG-P2WSH': 6 + 41 * 4,
        'MULTISIG-P2SH-P2WSH': 6 + 76 * 4,
        P2PKH: 148 * 4,
        P2WPKH: 108 + 41 * 4,
        'P2SH-P2WPKH': 108 + 64 * 4
      },
      outputs: {
        P2SH: 32 * 4,
        P2PKH: 34 * 4,
        P2WPKH: 31 * 4,
        P2WSH: 43 * 4
      }
    }

    Object.keys(inputs).forEach(function (key) {
      if (key.slice(0, 8) === 'MULTISIG') {
        // ex. "MULTISIG-P2SH:2-3" would mean 2 of 3 P2SH MULTISIG
        const keyParts = key.split(':')
        if (keyParts.length !== 2) throw new Error(`invalid input: ${key}`)
        const newKey = keyParts[0]
        const mAndN = keyParts[1].split('-').map(function (item) {
          return parseInt(item)
        })

        totalWeight += types.inputs[newKey] * inputs[key]
        const multiplyer = newKey === 'MULTISIG-P2SH' ? 4 : 1
        totalWeight += (73 * mAndN[0] + 34 * mAndN[1]) * multiplyer
      } else {
        totalWeight += types.inputs[key] * inputs[key]
      }
      if (key.indexOf('W') >= 0) hasWitness = true
    })

    Object.keys(outputs).forEach(function (key) {
      totalWeight += types.outputs[key] * outputs[key]
    })

    if (hasWitness) totalWeight += 2

    totalWeight += 10 * 4

    return Math.ceil(totalWeight / 4)
  }

  /**
   * @api BitcoinCash.encryptBIP38() encryptBIP38()
   * @apiName encryptBIP38
   * @apiGroup BitcoinCash
   * @apiDescription
   * BIP38 encrypt privkey WIFs.
   *
   * @apiExample Example usage:
   * // mainnet
   * bchjs.BitcoinCash.encryptBIP38(
   *  'L1phBREbhL4vb1uHHHCAse8bdGE5c7ic2PFjRxMawLzQCsiFVbvu',
   * '9GKVkabAHBMyAf'
   * )
   * // 6PYU2fDHRVF2194gKDGkbFbeu4mFgkWtVvg2RPd2Sp6KmZx3RCHFpgBB2G
   *
   * // testnet
   * bchjs.BitcoinCash.encryptBIP38(
   *  'cSx7KzdH9EcvDEireu2WYpGnXdFYpta7sJUNt5kVCJgA7kcAU8Gm',
   * '1EBPIyj55eR8bVUov9'
   * )
   * // 6PYUAPLwLSEjWSAfoe9NTSPkMZXnJA8j8EFJtKaeSnP18RCouutBrS2735
   */
  encryptBIP38 (privKeyWIF, passphrase) {
    const decoded = wif.decode(privKeyWIF)

    return bip38.encrypt(decoded.privateKey, decoded.compressed, passphrase)
  }

  /**
   * @api BitcoinCash.decryptBIP38() decryptBIP38()
   * @apiName decryptBIP38
   * @apiGroup BitcoinCash
   * @apiDescription
   * BIP38 encrypt privkey WIFs.
   *
   * @apiExample Example usage:
   * // mainnet
   * bchjs.BitcoinCash.decryptBIP38(
   * '6PYU2fDHRVF2194gKDGkbFbeu4mFgkWtVvg2RPd2Sp6KmZx3RCHFpgBB2G',
   * '9GKVkabAHBMyAf',
   * 'mainnet'
   * )
   * // L1phBREbhL4vb1uHHHCAse8bdGE5c7ic2PFjRxMawLzQCsiFVbvu
   *
   * // testnet
   * bchjs.BitcoinCash.decryptBIP38(
   * '6PYUAPLwLSEjWSAfoe9NTSPkMZXnJA8j8EFJtKaeSnP18RCouutBrS2735',
   * '1EBPIyj55eR8bVUov9',
   * 'testnet'
   * )
   * // cSx7KzdH9EcvDEireu2WYpGnXdFYpta7sJUNt5kVCJgA7kcAU8Gm
   */
  decryptBIP38 (encryptedKey, passphrase, network = 'mainnet') {
    const decryptedKey = bip38.decrypt(encryptedKey, passphrase)
    let prefix
    if (network === 'testnet') prefix = 0xef
    else prefix = 0x80

    return wif.encode(prefix, decryptedKey.privateKey, decryptedKey.compressed)
  }
}

module.exports = BitcoinCash

```

`/home/trout/work/psf/code/bch-js/src/transaction-builder.js`:

```js
const Bitcoin = require('@psf/bitcoincashjs-lib')
const coininfo = require('@psf/coininfo')
const bip66 = require('bip66')
const bip68 = require('bc-bip68')

class TransactionBuilder {
  static setAddress (address) {
    TransactionBuilder._address = address
  }

  constructor (network = 'mainnet') {
    let bitcoincash
    if (network === 'bitcoincash' || network === 'mainnet') { bitcoincash = coininfo.bitcoincash.main } else bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    this.transaction = new Bitcoin.TransactionBuilder(bitcoincashBitcoinJSLib)
    this.DEFAULT_SEQUENCE = 0xffffffff
    this.hashTypes = {
      SIGHASH_ALL: 0x01,
      SIGHASH_NONE: 0x02,
      SIGHASH_SINGLE: 0x03,
      SIGHASH_ANYONECANPAY: 0x80,
      SIGHASH_BITCOINCASH_BIP143: 0x40,
      ADVANCED_TRANSACTION_MARKER: 0x00,
      ADVANCED_TRANSACTION_FLAG: 0x01
    }
    this.signatureAlgorithms = {
      ECDSA: Bitcoin.ECSignature.ECDSA,
      SCHNORR: Bitcoin.ECSignature.SCHNORR
    }
    this.bip66 = bip66
    this.bip68 = bip68
    this.p2shInput = false
    // this.tx
  }

  /**
   * @api Transaction-Builder.addInput() addInput()
   * @apiName AddInput
   * @apiGroup TransactionBuilder
   * @apiDescription Add input to transaction.
   *
   * @apiExample Example usage:
   * // txid of vout
   * let txid = 'f7890915febe580920df2681d2bac0909ae89bd0cc1d3ed763e5eeba7f337f0e';
   * // add input with txid and index of vout
   * transactionBuilder.addInput(txid, 0);
   */
  addInput (txHash, vout, sequence = this.DEFAULT_SEQUENCE, prevOutScript) {
    this.transaction.addInput(txHash, vout, sequence, prevOutScript)
  }

  addInputScript (vout, script) {
    this.tx = this.transaction.buildIncomplete()
    this.tx.setInputScript(vout, script)
    this.p2shInput = true
  }

  addInputScripts (scripts) {
    this.tx = this.transaction.buildIncomplete()
    scripts.forEach(script => {
      this.tx.setInputScript(script.vout, script.script)
    })
    this.p2shInput = true
  }

  /**
   * @api Transaction-Builder.addOutput() addOutput()
   * @apiName AddOutput
   * @apiGroup TransactionBuilder
   * @apiDescription Add output to transaction.
   *
   * @apiExample Example usage:
   *  let originalAmount = 100000;
   *  let byteCount = bchjs.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
   *  // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
   *  let sendAmount = originalAmount - byteCount;
   *  // add output w/ address and amount to send
   *  transactionBuilder.addOutput('bitcoincash:qpuax2tarq33f86wccwlx8ge7tad2wgvqgjqlwshpw', sendAmount);
   */
  addOutput (scriptPubKey, amount) {
    try {
      this.transaction.addOutput(
        TransactionBuilder._address.toLegacyAddress(scriptPubKey),
        amount
      )
    } catch (error) {
      this.transaction.addOutput(scriptPubKey, amount)
    }
  }

  /**
   * @api Transaction-Builder.setLockTime() setLockTime()
   * @apiName SetLockTime
   * @apiGroup TransactionBuilder
   * @apiDescription Set locktime.
   *
   * @apiExample Example usage:
   *  let originalAmount = 100000;
   *  let byteCount = bchjs.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
   *  // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
   *  let sendAmount = originalAmount - byteCount;
   *  // add output w/ address and amount to send
   *  transactionBuilder.addOutput('bitcoincash:qpuax2tarq33f86wccwlx8ge7tad2wgvqgjqlwshpw', sendAmount);
   *  transactionBuilder.setLockTime(50000)
   */
  setLockTime (locktime) {
    this.transaction.setLockTime(locktime)
  }

  /**
   * @api Transaction-Builder.sign() sign()
   * @apiName Sign.
   * @apiGroup TransactionBuilder
   * @apiDescription Sign transaction. It creates the unlocking script needed to spend an input. Each input has its own script and thus 'sign' must be called for each input even if the keyPair is the same..
   *
   * @apiExample Example usage:
   *  let originalAmount = 100000;
   *  // node of address which is going to spend utxo
   *  let hdnode = bchjs.HDNode.fromXPriv("xprvA3eaDg64MwDr72PVGJ7CkvshNAzCDRz7rn98sYrZVAtDSWCAmNGQhEQeCLDcnmcpSkfjhHevXmu4ZL8ZcT9D4vEbG8LpiToZETrHZttw9Yw");
   *  // keypair
   *  let keyPair = bchjs.HDNode.toKeyPair(hdnode);
   *  // empty redeemScript variable
   *  let redeemScript;
   *  // sign w/ keyPair
   *  transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount, transactionBuilder.signatureAlgorithms.SCHNORR);
   */
  sign (
    vin,
    keyPair,
    redeemScript,
    hashType = this.hashTypes.SIGHASH_ALL,
    value,
    signatureAlgorithm
  ) {
    let witnessScript

    this.transaction.sign(
      vin,
      keyPair,
      redeemScript,
      hashType,
      value,
      witnessScript,
      signatureAlgorithm
    )
  }

  /**
   * @api Transaction-Builder.build() build()
   * @apiName Build.
   * @apiGroup TransactionBuilder
   * @apiDescription Build transaction.
   *
   * @apiExample Example usage:
   * // build tx
   * let tx = bchjs.transactionBuilder.build();
   */
  build () {
    if (this.p2shInput === true) return this.tx

    return this.transaction.build()
  }
}

module.exports = TransactionBuilder

```

`/home/trout/work/psf/code/bch-js/src/address.js`:

```js
// const axios = require("axios")
const Bitcoin = require('@psf/bitcoincashjs-lib')
const cashaddr = require('ecashaddrjs')
const coininfo = require('@psf/coininfo')

class Address {
  constructor (config) {
    const tmp = {}
    if (!config || !config.restURL) tmp.restURL = 'https://api.bchjs.cash/v5/'
    else tmp.restURL = config.restURL

    this.restURL = tmp.restURL
    this.apiToken = tmp.apiToken
    this.authToken = config.authToken

    if (this.authToken) {
      // Add Basic Authentication token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: this.authToken
        }
      }
    } else {
      // Add JWT token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: `Token ${this.apiToken}`
        }
      }
    }
  }

  /**
   * @api Address.toLegacyAddress() toLegacyAddress()
   * @apiName toLegacyAddress
   * @apiGroup Address
   * @apiDescription Convert cashaddr to legacy address format
   *
   * @apiExample Example usage:
   * // mainnet w/ prefix
   * bchjs.Address.toLegacyAddress('bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
   * // 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN
   *
   * // mainnet w/ no prefix
   * bchjs.Address.toLegacyAddress('qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
   * // 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN
   *
   * // testnet w/ prefix
   * bchjs.Address.toLegacyAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   * // mqc1tmwY2368LLGktnePzEyPAsgADxbksi
   *
   * // testnet w/ no prefix
   * bchjs.Address.toLegacyAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   * // mqc1tmwY2368LLGktnePzEyPAsgADxbksi
   */
  // Translate address from any address format into a specific format.
  toLegacyAddress (address) {
    const { prefix, type, hash } = this._decode(address)

    let bitcoincash
    switch (prefix) {
      case 'bitcoincash':
        bitcoincash = coininfo.bitcoincash.main
        break
      case 'bchtest':
        bitcoincash = coininfo.bitcoincash.test
        break
      case 'bchreg':
        bitcoincash = coininfo.bitcoincash.regtest
        break
      default:
        throw new Error(`unsupported prefix : ${prefix}`)
    }

    let version
    switch (type) {
      case 'P2PKH':
        version = bitcoincash.versions.public
        break
      case 'P2SH':
        version = bitcoincash.versions.scripthash
        break
      default:
        throw new Error(`unsupported address type : ${type}`)
    }

    const hashBuf = Buffer.from(hash)

    return Bitcoin.address.toBase58Check(hashBuf, version)
  }

  /**
   * @api Address.toCashAddress() toCashAddress()
   * @apiName toCashAddress
   * @apiGroup Address
   * @apiDescription Convert legacy to cashAddress format
   *
   * @apiExample Example usage:
   * // mainnet
   * bchjs.Address.toCashAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN')
   * // bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl
   *
   * // mainnet no prefix
   * bchjs.Address.toCashAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN', false)
   * // qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl
   *
   * // tesnet
   * bchjs.Address.toCashAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx')
   * // bchtest:qzq9je6pntpva3wf6scr7mlnycr54sjgeqxgrr9ku3
   *
   * // testnet no prefix
   * bchjs.Address.toCashAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx', false)
   * // qzq9je6pntpva3wf6scr7mlnycr54sjgeqxgrr9ku3
   */
  toCashAddress (address, prefix = true, regtest = false) {
    const decoded = this._decode(address)

    let prefixString
    if (regtest) prefixString = 'bchreg'
    else prefixString = decoded.prefix

    const cashAddress = cashaddr.encode(
      prefixString,
      decoded.type,
      decoded.hash
    )

    if (prefix) return cashAddress
    return cashAddress.split(':')[1]
  }

  /**
   * @api Address.toEcashAddress() toEcashAddress()
   * @apiName toEcashAddress
   * @apiGroup Address
   * @apiDescription Convert legacy to eCash (XEC) format
   *
   * @apiExample Example usage:
   * // mainnet
   * bchjs.Address.toEcashAddress('bitcoincash:qq50d800hgunr8u4trz3uuppspk3mds0dy9978plt2')
   * // ecash:qq50d800hgunr8u4trz3uuppspk3mds0dyug2v69da
   *
   * // mainnet no prefix
   * bchjs.Address.toEcashAddress('bitcoincash:qq50d800hgunr8u4trz3uuppspk3mds0dy9978plt2', false)
   * // qq50d800hgunr8u4trz3uuppspk3mds0dyug2v69da
   *
   */
  toEcashAddress (address, prefix = true) {
    const decoded = this._decode(address)

    const ecashAddress = cashaddr.encode(
      'ecash',
      decoded.type,
      decoded.hash
    )

    if (prefix) return ecashAddress
    return ecashAddress.split(':')[1]
  }

  /**
   * @api Address.toEtokenAddress() toEtokenAddress()
   * @apiName toEtokenAddress
   * @apiGroup Address
   * @apiDescription Convert legacy to eToken (XEC) format
   *
   * @apiExample Example usage:
   * // mainnet
   * bchjs.Address.toEtokenAddress('bitcoincash:qq50d800hgunr8u4trz3uuppspk3mds0dy9978plt2')
   * // etoken:qq50d800hgunr8u4trz3uuppspk3mds0dyug2v69da
   *
   * // mainnet no prefix
   * bchjs.Address.toEtokenAddress('bitcoincash:qq50d800hgunr8u4trz3uuppspk3mds0dy9978plt2', false)
   * // qq50d800hgunr8u4trz3uuppspk3mds0dyug2v69da
   *
   */
  toEtokenAddress (address, prefix = true) {
    const decoded = this._decode(address)

    const etokenAddress = cashaddr.encode(
      'etoken',
      decoded.type,
      decoded.hash
    )

    if (prefix) return etokenAddress
    return etokenAddress.split(':')[1]
  }

  /**
   * @api Address.ecashtoCashAddress() ecashtoCashAddress()
   * @apiName ecashtoCashAddress
   * @apiGroup Address
   * @apiDescription Convert legacy to cashAddress format
   *
   * @apiExample Example usage:
   * // mainnet
   * bchjs.Address.ecashtoCashAddress('ecash:qq50d800hgunr8u4trz3uuppspk3mds0dyug2v69da')
   * // bitcoincash:qq50d800hgunr8u4trz3uuppspk3mds0dy9978plt2
   *
   * // mainnet no prefix
   * bchjs.Address.ecashtoCashAddress('ecash:qq50d800hgunr8u4trz3uuppspk3mds0dyug2v69da', false)
   * // qq50d800hgunr8u4trz3uuppspk3mds0dy9978plt2
   */
  ecashtoCashAddress (address, prefix = true) {
    const decoded = this._decodeEcashAddress(address)

    const cashAddress = cashaddr.encode(
      'bitcoincash',
      decoded.type,
      decoded.hash
    )

    if (prefix) return cashAddress
    return cashAddress.split(':')[1]
  }

  /**
   * @api Address.toHash160() toHash160()
   * @apiName toHash160
   * @apiGroup Address
   * @apiDescription Converts any address format to hash160
   *
   * @apiExample Example usage:
   * // cash address mainnet p2pkh
   * bchjs.Address.toHash160("bitcoincash:qptnmya5wkly7xf97wm5ak23yqdsz3l2cyj7k9vyyh")
   * // 573d93b475be4f1925f3b74ed951201b0147eac1
   *
   * // cash address mainnet p2sh
   * bchjs.Address.toHash160("bitcoincash:pp7ushdxf5we8mcpaa3wqgsuqt639cu59ur5xu5fug")
   * // 7dc85da64d1d93ef01ef62e0221c02f512e3942f
   */
  // Converts any address format to hash160
  toHash160 (address) {
    const legacyAddress = this.toLegacyAddress(address)
    const bytes = Bitcoin.address.fromBase58Check(legacyAddress)
    return bytes.hash.toString('hex')
  }

  /**
   * @api Address.hash160ToLegacy() hash160ToLegacy()
   * @apiName hash160ToLegacy
   * @apiGroup Address
   * @apiDescription Convert hash160 to legacy address.
   *
   * @apiExample Example usage:
   * // legacy mainnet p2pkh
   * bchjs.Address.hash160ToLegacy("573d93b475be4f1925f3b74ed951201b0147eac1")
   * // 18xHZ8g2feo4ceejGpvzHkvXT79fi2ZdTG
   *
   * // legacy mainnet p2sh
   * bchjs.Address.hash160ToLegacy("7dc85da64d1d93ef01ef62e0221c02f512e3942f", 0x05)
   * // 3DA6RBcFgLwLTpnF6BRAee8w6a9H6JQLCm
   *
   * // legacy testnet p2pkh
   * bchjs.Address.hash160ToLegacy("155187a3283b08b30519db50bc23bbba9f4b6657", 0x6f)
   * // mhTg9sgNgvAGfmJs192oUzQWqAXHH5nqLE
   */
  // Converts hash160 to Legacy Address
  hash160ToLegacy (hash160, network = Bitcoin.networks.bitcoin.pubKeyHash) {
    const buffer = Buffer.from(hash160, 'hex')
    const legacyAddress = Bitcoin.address.toBase58Check(buffer, network)
    return legacyAddress
  }

  /**
   * @api Address.hash160ToCash() hash160ToCash()
   * @apiName hash160ToCash
   * @apiGroup Address
   * @apiDescription Convert hash160 to cash address. Accepts either hexadecimal or buffer.
   *
   * @apiExample Example usage:
   * bchjs.Address.hash160ToCash("573d93b475be4f1925f3b74ed951201b0147eac1")
   * 'bitcoincash:qptnmya5wkly7xf97wm5ak23yqdsz3l2cyj7k9vyyh'
   * bchjs.Address.hash160ToCash("7dc85da64d1d93ef01ef62e0221c02f512e3942f", 0x05)
   * 'bitcoincash:pp7ushdxf5we8mcpaa3wqgsuqt639cu59ur5xu5fug'
   * bchjs.Address.hash160ToCash("155187a3283b08b30519db50bc23bbba9f4b6657", 0x6f)
   * 'bchtest:qq24rpar9qas3vc9r8d4p0prhwaf7jmx2u22nzt946'
   */
  // Converts hash160 to Cash Address
  hash160ToCash (
    hash160,
    network = Bitcoin.networks.bitcoin.pubKeyHash,
    regtest = false
  ) {
    const legacyAddress = this.hash160ToLegacy(hash160, network)
    return this.toCashAddress(legacyAddress, true, regtest)
  }

  _decode (address) {
    try {
      return this._decodeLegacyAddress(address)
    } catch (error) {}

    try {
      return this._decodeCashAddress(address)
    } catch (error) {}

    try {
      return this._encodeAddressFromHash160(address)
    } catch (error) {}

    throw new Error(`Unsupported address format : ${address}`)
  }

  _decodeLegacyAddress (address) {
    const { version, hash } = Bitcoin.address.fromBase58Check(address)
    const info = coininfo.bitcoincash

    switch (version) {
      case info.main.versions.public:
        return {
          prefix: 'bitcoincash',
          type: 'P2PKH',
          hash: hash,
          format: 'legacy'
        }
      case info.main.versions.scripthash:
        return {
          prefix: 'bitcoincash',
          type: 'P2SH',
          hash: hash,
          format: 'legacy'
        }
      case info.test.versions.public:
        return {
          prefix: 'bchtest',
          type: 'P2PKH',
          hash: hash,
          format: 'legacy'
        }
      case info.test.versions.scripthash:
        return {
          prefix: 'bchtest',
          type: 'P2SH',
          hash: hash,
          format: 'legacy'
        }
      default:
        throw new Error(`Invalid format : ${address}`)
    }
  }

  _decodeCashAddress (address) {
    if (address.indexOf(':') !== -1) {
      const decoded = cashaddr.decode(address)
      decoded.format = 'cashaddr'
      return decoded
    }

    const prefixes = ['bitcoincash', 'bchtest', 'bchreg']
    for (let i = 0; i < prefixes.length; ++i) {
      try {
        const decoded = cashaddr.decode(`${prefixes[i]}:${address}`)
        decoded.format = 'cashaddr'
        return decoded
      } catch (error) {}
    }

    throw new Error(`Invalid format : ${address}`)
  }

  _encodeAddressFromHash160 (address) {
    try {
      return {
        legacyAddress: this.hash160ToLegacy(address),
        cashAddress: this.hash160ToCash(address),
        format: 'hash160'
      }
    } catch (error) {}

    throw new Error(`Invalid format : ${address}`)
  }

  _decodeEcashAddress (address) {
    if (address.indexOf(':') !== -1) {
      const decoded = cashaddr.decode(address)
      decoded.format = 'cashaddr'
      return decoded
    }

    try {
      const decoded = cashaddr.decode(`ecash:${address}`)
      decoded.format = 'cashaddr'
      return decoded
    } catch (error) {}

    throw new Error(`Invalid format : ${address}`)
  }

  /**
   * @api Address.isLegacyAddress() isLegacyAddress()
   * @apiName isLegacyAddress
   * @apiGroup Address
   * @apiDescription Detect if legacy base58check encoded address.
   *
   * @apiExample Example usage:
   *  // cashaddr
   * bchjs.Address.isLegacyAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   * // false
   *
   * // w/ no cashaddr prefix
   * bchjs.Address.isLegacyAddress('qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
   * // false
   *
   * // legacy
   * bchjs.Address.isLegacyAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN')
   * // true
   *
   * // testnet w/ cashaddr prefix
   * bchjs.Address.isLegacyAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   * // false
   *
   * // testnet w/ no cashaddr prefix
   * bchjs.Address.isLegacyAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   * // false
   *
   * // legacy testnet
   * bchjs.Address.isLegacyAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   * // true
   */
  // Test for address format.
  isLegacyAddress (address) {
    return this.detectAddressFormat(address) === 'legacy'
  }

  /**
   * @api Address.isCashAddress() isCashAddress()
   * @apiName isCashAddress
   * @apiGroup Address
   * @apiDescription Detect if cashAddr encoded address.
   *
   * @apiExample Example usage:
   * // mainnet cashaddr
   * bchjs.Address.isCashAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   * // true
   *
   * // mainnet w/ no cashaddr prefix
   * bchjs.Address.isCashAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   * // true
   *
   * // mainnet legacy
   * bchjs.Address.isCashAddress('18HEMuar5ZhXDFep1gEiY1eoPPcBLxfDxj')
   * // false
   *
   * // testnet w/ cashaddr prefix
   * bchjs.Address.isCashAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   * // true
   *
   * // testnet w/ no cashaddr prefix
   * bchjs.Address.isCashAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   * // true
   *
   * // testnet legacy
   * bchjs.Address.isCashAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   * // false
   */
  isCashAddress (address) {
    return this.detectAddressFormat(address) === 'cashaddr'
  }

  /**
   * @api Address.isHash160() isHash160()
   * @apiName isHash160
   * @apiGroup Address
   * @apiDescription Detect if an addess is a hash160.
   *
   * @apiExample Example usage:
   *  let hash160Address = '428df38e23fc879a25819427995c3e6355b12d33';
   *  bchjs.Address.isHash160(hash160Address);
   *  // true
   *
   *  let notHash160Address = 'bitcoincash:pz8a837lttkvjksg0jjmmulqvfkgpqrcdgufy8ns5s';
   *  bchjs.Address.isHash160(notHash160Address);
   *  // false
   */
  isHash160 (address) {
    return this.detectAddressFormat(address) === 'hash160'
  }

  /**
   * @api Address.isMainnetAddress() isMainnetAddress()
   * @apiName isMainnetAddress
   * @apiGroup Address
   * @apiDescription Detect if mainnet address .
   *
   * @apiExample Example usage:
   *  // mainnet cashaddr
   * bchjs.Address.isMainnetAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   * // true
   *
   * // mainnet cashaddr w/ no prefix
   * bchjs.Address.isMainnetAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   * // true
   *
   * // mainnet legacy
   * bchjs.Address.isMainnetAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
   * // true
   *
   * // testnet cashaddr
   * bchjs.Address.isMainnetAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   * // false
   *
   * // testnet w/ no cashaddr prefix
   * bchjs.Address.isMainnetAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   * // false
   *
   * // testnet legacy
   * bchjs.Address.isMainnetAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   * // false
   */
  // Test for address network.
  isMainnetAddress (address) {
    if (address[0] === 'x') return true
    else if (address[0] === 't') return false

    return this.detectAddressNetwork(address) === 'mainnet'
  }

  /**
   * @api Address.isTestnetAddress() isTestnetAddress()
   * @apiName isTestnetAddress
   * @apiGroup Address
   * @apiDescription Detect if testnet address.
   *
   * @apiExample Example usage:
   *   // cashaddr mainnet
   * bchjs.Address.isTestnetAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   * //false
   *
   * // w/ no cashaddr prefix
   * bchjs.Address.isTestnetAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   * // false
   *
   * // legacy mainnet
   * bchjs.Address.isTestnetAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
   * // false
   *
   * // cashaddr testnet
   * bchjs.Address.isTestnetAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   * // true
   *
   * // testnet w/ no cashaddr prefix
   * bchjs.Address.isTestnetAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   * // true
   *
   * // testnet legacy
   * bchjs.Address.isTestnetAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   * // true
   */
  isTestnetAddress (address) {
    if (address[0] === 'x') return false
    else if (address[0] === 't') return true

    return this.detectAddressNetwork(address) === 'testnet'
  }

  /**
   * @api Address.isRegTestAddress() isRegTestAddress()
   * @apiName isRegTestAddress
   * @apiGroup Address
   * @apiDescription Detect if regtest address.
   *
   * @apiExample Example usage:
   *   // regtest
   * bchjs.Address.isRegTestAddress('bchreg:qzq9je6pntpva3wf6scr7mlnycr54sjgequ54zx9lh')
   * // true
   *
   * // regtest w/ no prefix
   * bchjs.Address.isRegTestAddress('qzq9je6pntpva3wf6scr7mlnycr54sjgequ54zx9lh')
   * // true
   *
   * // cashaddr mainnet
   * bchjs.Address.isRegTestAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   * //false
   *
   * // w/ no cashaddr prefix
   * bchjs.Address.isRegTestAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   * // false
   *
   * // legacy mainnet
   * bchjs.Address.isRegTestAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
   * // false
   *
   * // cashaddr testnet
   * bchjs.Address.isRegTestAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   * // false
   *
   * // testnet w/ no cashaddr prefix
   * bchjs.Address.isRegTestAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   * // false
   */
  isRegTestAddress (address) {
    return this.detectAddressNetwork(address) === 'regtest'
  }

  /**
   * @api Address.isP2PKHAddress() isP2PKHAddress()
   * @apiName isP2PKHAddress
   * @apiGroup Address
   * @apiDescription Detect if p2pkh address.
   *
   * @apiExample Example usage:
   *   // cashaddr
   *  bchjs.Address.isP2PKHAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // true
   *
   *  // w/ no cashaddr prefix
   *  bchjs.Address.isP2PKHAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // true
   *
   *  // legacy
   *  bchjs.Address.isP2PKHAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
   *  // true
   *
   *  // legacy testnet
   *  bchjs.Address.isP2PKHAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   *  // true
   *
   *  // testnet w/ no cashaddr prefix
   *  bchjs.Address.isP2PKHAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // true
   *
   *  // legacy testnet
   *  bchjs.Address.isP2PKHAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   *  // true
   */

  // Test for address type.
  isP2PKHAddress (address) {
    return this.detectAddressType(address) === 'p2pkh'
  }

  /**
   * @api Address.isP2SHAddress() isP2SHAddress()
   * @apiName isP2SHAddress
   * @apiGroup Address
   * @apiDescription Detect if p2sh address.
   *
   * @apiExample Example usage:
   *   // cashaddr
   *  bchjs.Address.isP2SHAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // false
   *
   *  // cashaddr w/ no prefix
   *  bchjs.Address.isP2SHAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // false
   *
   *  // legacy
   *  bchjs.Address.isP2SHAddress('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74')
   *  // false
   *
   *  // cashaddr testnet
   *  bchjs.Address.isP2SHAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // false
   *
   *  // cashaddr testnet w/ no prefix
   *  bchjs.Address.isP2SHAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // false
   *
   *  // legacy testnet
   *  bchjs.Address.isP2SHAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   *  // false
   */

  isP2SHAddress (address) {
    return this.detectAddressType(address) === 'p2sh'
  }

  /**
   * @api Address.detectAddressFormat() detectAddressFormat()
   * @apiName detectAddressFormat
   * @apiGroup Address
   * @apiDescription Detect address format.
   *
   * @apiExample Example usage:
   *   // cashaddr
   *  bchjs.Address.detectAddressFormat('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // cashaddr
   *
   *  // cashaddr w/ no prefix
   *  bchjs.Address.detectAddressFormat('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // cashaddr
   *
   *  // legacy
   *  bchjs.Address.detectAddressFormat('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74')
   *  // legacy
   *
   *  // cashaddr testnet
   *  bchjs.Address.detectAddressFormat('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // cashaddr
   *
   *  // cashaddr testnet w/ no prefix
   *  bchjs.Address.detectAddressFormat('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // cashaddr
   *
   *  // legacy testnet
   *  bchjs.Address.detectAddressFormat('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   *  // legacy
   */
  // Detect address format.
  detectAddressFormat (address) {
    const decoded = this._decode(address)

    return decoded.format
  }

  /**
   * @api Address.detectAddressNetwork() detectAddressNetwork()
   * @apiName detectAddressNetwork
   * @apiGroup Address
   * @apiDescription Detect address network.
   *
   * @apiExample Example usage:
   *   // cashaddr
   *  bchjs.Address.detectAddressNetwork('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // mainnet
   *
   *  // cashaddr w/ no prefix
   *  bchjs.Address.detectAddressNetwork('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // mainnet
   *
   *  // legacy
   *  bchjs.Address.detectAddressNetwork('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74')
   *  // mainnet
   *
   *  // cashaddr testnet
   *  bchjs.Address.detectAddressNetwork('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // testnet
   *
   *  // cashaddr testnet w/ no prefix
   *  bchjs.Address.detectAddressNetwork('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // testnet
   *
   *  // legacy testnet
   *  bchjs.Address.detectAddressNetwork('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   *  // testnet
   */
  // Detect address network.
  detectAddressNetwork (address) {
    if (address[0] === 'x') return 'mainnet'
    else if (address[0] === 't') return 'testnet'

    const decoded = this._decode(address)

    switch (decoded.prefix) {
      case 'bitcoincash':
        return 'mainnet'
      case 'bchtest':
        return 'testnet'
      case 'bchreg':
        return 'regtest'
      default:
        throw new Error(`Invalid prefix : ${decoded.prefix}`)
    }
  }

  /**
   * @api Address.detectAddressType() detectAddressType()
   * @apiName detectAddressType
   * @apiGroup Address
   * @apiDescription Detect address type.
   *
   * @apiExample Example usage:
   *   // cashaddr
   *  bchjs.Address.detectAddressType('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s');
   *  // p2pkh
   *
   *  // cashaddr w/ no prefix
   *  bchjs.Address.detectAddressType('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s');
   *  // p2pkh
   *
   *  // legacy
   *  bchjs.Address.detectAddressType('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74');
   *  // p2pkh
   *
   *  // cashaddr testnet
   *  bchjs.Address.detectAddressType('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy');
   *  // p2pkh
   *
   *  // cashaddr testnet w/ no prefix
   *  bchjs.Address.detectAddressType('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy');
   *  // p2pkh
   *
   *  // legacy testnet
   *  bchjs.Address.detectAddressType('mqc1tmwY2368LLGktnePzEyPAsgADxbksi');
   *  // p2pkh
   */
  // Detect address type.
  detectAddressType (address) {
    const decoded = this._decode(address)

    return decoded.type.toLowerCase()
  }

  /**
   * @api Address.fromXPub() fromXPub()
   * @apiName fromXPub
   * @apiGroup Address
   * @apiDescription Generates an address for an extended public key (xpub).
   *
   * @apiExample Example usage:
   *   // generate 5 mainnet external change addresses for xpub6DTNmB7gWa8RtQAfmy8wSDikM5mky4fhsnqQd9AqoCaLcekqNgRZW5JCSXwXkLDkABHTD1qx7kqrbGzT6xBGfAvCJSj2rwvKWP8eZBR2EVA
   *  let xpub = 'xpub6DTNmB7gWa8RtQAfmy8wSDikM5mky4fhsnqQd9AqoCaLcekqNgRZW5JCSXwXkLDkABHTD1qx7kqrbGzT6xBGfAvCJSj2rwvKWP8eZBR2EVA';
   *  for(let i = 0; i <= 4; i++) {
   *    console.log(bchjs.Address.fromXPub(xpub, "0/" + i))
   *  }
   *  // bitcoincash:qptnmya5wkly7xf97wm5ak23yqdsz3l2cyj7k9vyyh
   *  // bitcoincash:qrr2suh9yjsrkl2qp3p967uhfg6u0r6xxsn9h5vuvr
   *  // bitcoincash:qpkfg4kck99wksyss6nvaqtafeahfnyrpsj0ed372t
   *  // bitcoincash:qppgmuuwy07g0x39sx2z0x2u8e34tvfdxvy0c2jvx7
   *  // bitcoincash:qryj8x4s7vfsc864jm0xaak9qfe8qgk245y9ska57l
   *
   *  // generate 5 testnet external change addresses for tpubDCrnMSKwDMAbxg82yqDt97peMvftCXk3EfBb9WgZh27mPbHGkysU3TW7qX5AwydmnVQfaGeNhUR6okQ3dS5AJTP9gEP7jk2Wcj6Xntc6gNh
   *  let xpub = 'tpubDCrnMSKwDMAbxg82yqDt97peMvftCXk3EfBb9WgZh27mPbHGkysU3TW7qX5AwydmnVQfaGeNhUR6okQ3dS5AJTP9gEP7jk2Wcj6Xntc6gNh';
   *  for(let i = 0; i <= 4; i++) {
   *    console.log(bchjs.Address.fromXPub(xpub, "0/" + i))
   *  }
   *  // bchtest:qrth8470sc9scek9u0jj2d0349t62gxzdstw2jukl8
   *  // bchtest:qpm56zc5re0nhms96r7p985aajthp0vxvg6e4ux3kc
   *  // bchtest:qqtu3tf6yyd73ejhk3a2ylqynpl3mzzhwuzt299jfd
   *  // bchtest:qzd7dvlnfukggjqsf5ju0qqwwltakfumjsck33js6m
   *  // bchtest:qq322ataqeas4n0pdn4gz2sdereh5ae43ylk4qdvus
   */
  fromXPub (xpub, path = '0/0') {
    const HDNode = Bitcoin.HDNode.fromBase58(
      xpub,
      Bitcoin.networks[this.detectAddressNetwork(xpub)]
    )
    const address = HDNode.derivePath(path)
    return this.toCashAddress(address.getAddress())
  }

  /**
   * @api Address.fromOutputScript() fromOutputScript()
   * @apiName fromOutputScript
   * @apiGroup Address
   * @apiDescription Detect an addess from an OutputScript..
   *
   * @apiExample Example usage:
   *  const scriptBuffer = bchjs.Script.encode([
   *    Buffer.from("BOX", "ascii"),
   *    bchjs.Script.opcodes.OP_CAT,
   *    Buffer.from("BITBOX", "ascii"),
   *    bchjs.Script.opcodes.OP_EQUAL
   *  ]);
   *  const p2sh_hash160 = bchjs.Crypto.hash160(scriptBuffer);
   *  const scriptPubKey = bchjs.Script.scriptHash.output.encode(p2sh_hash160);
   *
   *  // mainnet address from output script
   *  bchjs.Address.fromOutputScript(scriptPubKey);
   *  // bitcoincash:pz0qcslrqn7hr44hsszwl4lw5r6udkg6zqncnufkrl
   *
   *  // testnet address from output script
   *  bchjs.Address.fromOutputScript(scriptPubKey, 'testnet');
   *  // bchtest:pz0qcslrqn7hr44hsszwl4lw5r6udkg6zqh2hmtpyr
   */
  fromOutputScript (scriptPubKey, network = 'mainnet') {
    let netParam
    if (network !== 'bitcoincash' && network !== 'mainnet') {
      netParam = Bitcoin.networks.testnet
    }

    const regtest = network === 'bchreg'

    return this.toCashAddress(
      Bitcoin.address.fromOutputScript(scriptPubKey, netParam),
      true,
      regtest
    )
  }
}

module.exports = Address

```

`/home/trout/work/psf/code/bch-js/src/hdnode.js`:

```js
const Bitcoin = require('@psf/bitcoincashjs-lib')
const coininfo = require('@psf/coininfo')
const bip32utils = require('@chris.troutner/bip32-utils')
const bchaddrjs = require('bchaddrjs-slp')

class HDNode {
  constructor (address) {
    this._address = address
  }

  /**
   * @api HDNode.fromSeed() fromSeed()
   * @apiName fromSeed
   * @apiGroup HDNode
   * @apiDescription
   * HDNode stands for Hierarchically Deterministic node which can be used to create a HD wallet.
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   bchjs.HDNode.fromSeed(seedBuffer);
   *
   *   // generate entropy
   *   let entropy = bchjs.Crypto.randomBytes(32);
   *   // create mnemonic from entropy
   *   let mnemonic = bchjs.Mnemonic.fromEntropy(entropy);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   bchjs.HDNode.fromSeed(seedBuffer);
   */
  fromSeed (rootSeedBuffer, network = 'mainnet') {
    let bitcoincash
    if (network === 'bitcoincash' || network === 'mainnet') {
      bitcoincash = coininfo.bitcoincash.main
    } else bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    return Bitcoin.HDNode.fromSeedBuffer(
      rootSeedBuffer,
      bitcoincashBitcoinJSLib
    )
  }

  /**
   * @api HDNode.toLegacyAddress() toLegacyAddress()
   * @apiName toLegacyAddress
   * @apiGroup HDNode
   * @apiDescription
   * Get legacy address of HDNode
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // to legacy address
   *   bchjs.HDNode.toLegacyAddress(hdNode);
   *   // 14apxtw2LDQmXWsS5k4JEhG93Jzjswhvma
   *
   *   // generate entropy
   *   let entropy = bchjs.Crypto.randomBytes(32);
   *   // create mnemonic from entropy
   *   let mnemonic = bchjs.Mnemonic.fromEntropy(entropy);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // to cash address
   *   bchjs.HDNode.toLegacyAddress(hdNode);
   *   // 14mVsq3H5Ep2Jb6AqoKsmY1BFHKCBGPDLi
   */
  toLegacyAddress (hdNode) {
    return hdNode.getAddress()
  }

  /**
   * @api HDNode.toCashAddress() toCashAddress()
   * @apiName toCashAddress
   * @apiGroup HDNode
   * @apiDescription
   * Get cash address of HDNode.
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // to cash address
   *   bchjs.HDNode.toCashAddress(hdNode);
   *   // bitcoincash:qqrz6kqw6nvhwgwrt4g7fggepvewtkr7nukkeqf4rw
   *
   *   // generate entropy
   *   let entropy = bchjs.Crypto.randomBytes(32);
   *   // create mnemonic from entropy
   *   let mnemonic = bchjs.Mnemonic.fromEntropy(entropy);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // to cash address
   *   bchjs.HDNode.toCashAddress(hdNode);
   *   // bitcoincash:qq549jxsjv66kw0smdju4es2axnk7hhe9cquhjg4gt
   */
  toCashAddress (hdNode, regtest = false) {
    return this._address.toCashAddress(hdNode.getAddress(), true, regtest)
  }

  /**
   * @api SLP.HDNode.toSLPAddress() toSLPAddress()
   * @apiName toSLPAddress
   * @apiGroup HDNode
   * @apiDescription Get slp address of HDNode.
   *
   * @apiExample Example usage:
   * // create mnemonic
   * let mnemonic = bchjs.Mnemonic.generate(128);
   * // create seed buffer from mnemonic
   * let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   * // create HDNode from seed buffer
   * let hdNode = bchjs.SLP.HDNode.fromSeed(seedBuffer);
   * // to cash address
   * bchjs.SLP.HDNode.toSLPAddress(hdNode);
   * // simpleledger:qpst7ganm0ucmj3yl7jxvdqrm7tg3zhveg89xjh25d
   *
   * // generate entropy
   * let entropy = bchjs.Crypto.randomBytes(32);
   * // create mnemonic from entropy
   * let mnemonic = bchjs.Mnemonic.fromEntropy(entropy);
   * // create seed buffer from mnemonic
   * let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   * // create HDNode from seed buffer
   * let hdNode = bchjs.SLP.HDNode.fromSeed(seedBuffer);
   * // to cash address
   * bchjs.SLP.HDNode.toSLPAddress(hdNode);
   * // simpleledger:qqxh2z2z397m4c6u9s5x6wjtku742q8rpvm6al2nrf
   */
  toSLPAddress (hdNode) {
    const cashAddr = this.toCashAddress(hdNode)
    return bchaddrjs.toSlpAddress(cashAddr)
  }

  /**
   * @api HDNode.toWIF() toWIF()
   * @apiName toWIF
   * @apiGroup HDNode
   * @apiDescription
   * Get private key in wallet import format (WIF) of HDNode.
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // to WIF
   *   bchjs.HDNode.toWIF(hdNode);
   *   // L5E8QjFnLukp8BuF4uu9gmvvSrbafioURGdBve5tA3Eq5ptzbMCJ
   *
   *   // generate entropy
   *   let entropy = bchjs.Crypto.randomBytes(32);
   *   // create mnemonic from entropy
   *   let mnemonic = bchjs.Mnemonic.fromEntropy(entropy);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // to WIF
   *   bchjs.HDNode.toWIF(hdNode);
   *   // KwobPFhv3AuXc3ps6YtWfMVRpLBDBA7jnJddurfELTyTNcFhZYpJ
   */
  toWIF (hdNode) {
    return hdNode.keyPair.toWIF()
  }

  /**
   * @api HDNode.toXPub() toXPub()
   * @apiName toXPub
   * @apiGroup HDNode
   * @apiDescription
   * Get extended public key of HDNode.
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // to extended public key
   *   bchjs.HDNode.toXPub(hdNode);
   *   // xpub661MyMwAqRbcG4CnhNYoK1r1TKLwQQ1UdC3LHoWFK61rsnzh7Hx35qQ9Z53ucYcE5WvA7GEDXhqqKjSY2e6Y8n7WNVLYHpXCuuX945VPuYn
   *
   *   // generate entropy
   *   let entropy = bchjs.Crypto.randomBytes(32);
   *   // create mnemonic from entropy
   *   let mnemonic = bchjs.Mnemonic.fromEntropy(entropy);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // to extended public key
   *   bchjs.HDNode.toXPub(hdNode);
   *   // xpub661MyMwAqRbcFuMLeHkSbTNwNHG9MQyrAZqV1Q4MEAsmj9MYa5sxg8WC2LKqW6EHviHVucBjWi1n38juZpDDeX3U6YrsMeACdcNSTHkM8BQ
   */
  toXPub (hdNode) {
    return hdNode.neutered().toBase58()
  }

  /**
   * @api HDNode.toXPriv() toXPriv()
   * @apiName toXPriv
   * @apiGroup HDNode
   * @apiDescription
   * Get extended private key of HDNode.
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // to extended private key
   *   bchjs.HDNode.toXPriv(hdNode);
   *   // xprv9s21ZrQH143K2eMCcbT4qwwRhw6qZaPaEDWB792bnrxQZPoP2JUk4kfEx9eeV1uGTAWAfCqYr4wDWo52qALiukizKwQzvEyNR1fWZJi97Kv
   *
   *   // generate entropy
   *   let entropy = bchjs.Crypto.randomBytes(32);
   *   // create mnemonic from entropy
   *   let mnemonic = bchjs.Mnemonic.fromEntropy(entropy);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // to extended private key
   *   bchjs.HDNode.toXPriv(hdNode);
   *   // xprv9s21ZrQH143K2b5GPP6zHz22E6LeCgQXJtwNbC3MA3Kz7Se7tveKo96EhqwFtSkYWkyenVcMqM7uq35PcUNG8cUdpsJEgwKG3dvfP7TmL3v
   */
  toXPriv (hdNode) {
    return hdNode.toBase58()
  }

  /**
   * @api HDNode.toKeyPair() toKeyPair()
   * @apiName toKeyPair
   * @apiGroup HDNode
   * @apiDescription
   * Get the ECPair of an HDNode.
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create root seed buffer from mnemonic
   *   let rootSeed= await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from root seed
   *   let hdNode = bchjs.HDNode.fromSeed(rootSeed);
   *   // create public key buffer from HDNode
   *   bchjs.HDNode.toKeyPair(hdNode);
   *
   *   // generate entropy
   *   let entropy = bchjs.Crypto.randomBytes(32);
   *   // create mnemonic from entropy
   *   let mnemonic = bchjs.Mnemonic.fromEntropy(entropy);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // create public key buffer from HDNode
   *   bchjs.HDNode.toKeyPair(hdNode);
   */
  toKeyPair (hdNode) {
    return hdNode.keyPair
  }

  /**
   * @api HDNode.toPublicKey() toPublicKey()
   * @apiName toPublicKey
   * @apiGroup HDNode
   * @apiDescription
   * Get the public key of an HDNode as a buffer.
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create root seed buffer from mnemonic
   *   let rootSeed= await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from root seed
   *   let hdNode = bchjs.HDNode.fromSeed(rootSeed);
   *   // create public key buffer from HDNode
   *   bchjs.HDNode.toPublicKey(hdNode);
   *   // <Buffer 03 86 d6 d3 db ec 1a 93 8c 2c a2 63 c9 79 8f eb e9 16 09 c5 a2 9b 07 65 c4 79 1f d9 0f fa 4d 27 20>
   *
   *   // generate entropy
   *   let entropy = bchjs.Crypto.randomBytes(32);
   *   // create mnemonic from entropy
   *   let mnemonic = bchjs.Mnemonic.fromEntropy(entropy);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // create public key buffer from HDNode
   *   bchjs.HDNode.toPublicKey(hdNode);
   *   // <Buffer 02 d2 26 74 6e 78 03 ac 11 e0 96 c6 24 de e8 dd 62 52 e7 8e 51 56 8a c1 18 62 aa 2a 72 50 1d ea 7d>
   */
  toPublicKey (hdNode) {
    return hdNode.getPublicKeyBuffer()
  }

  /**
   * @api HDNode.fromXPriv() fromXPriv()
   * @apiName fromXPriv
   * @apiGroup HDNode
   * @apiDescription
   * Generate HDNode from extended private key.
   *
   * @apiExample Example usage:
   *   // mainnet xpriv
   *   bchjs.HDNode.fromXPriv('xprv9s21ZrQH143K2b5GPP6zHz22E6LeCgQXJtwNbC3MA3Kz7Se7tveKo96EhqwFtSkYWkyenVcMqM7uq35PcUNG8cUdpsJEgwKG3dvfP7TmL3v');
   *
   *   // testnet xpriv
   *   bchjs.HDNode.fromXPriv('tprv8gQ3zr1F5pRHMebqqhorrorYNvUG3XkcZjSWVs2cEtRwwJy1TRhgRx4XcF8dYHM2eyTbTCcdKYNhqgyBQphxwRoVyVKr9zuyoA8WxNDRvom');
   */
  fromXPriv (xpriv) {
    let bitcoincash
    if (xpriv[0] === 'x') bitcoincash = coininfo.bitcoincash.main
    else if (xpriv[0] === 't') bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    return Bitcoin.HDNode.fromBase58(xpriv, bitcoincashBitcoinJSLib)
  }

  /**
   * @api HDNode.fromXPub() fromXPub()
   * @apiName fromXPub
   * @apiGroup HDNode
   * @apiDescription
   * Generate HDNode from extended public key.
   *
   * @apiExample Example usage:
   *   // mainnet xpub
   *   bchjs.HDNode.fromXPub('xpub661MyMwAqRbcFuMLeHkSbTNwNHG9MQyrAZqV1Q4MEAsmj9MYa5sxg8WC2LKqW6EHviHVucBjWi1n38juZpDDeX3U6YrsMeACdcNSTHkM8BQ');
   *
   *   // testnet xpub
   *   bchjs.HDNode.fromXPub('tpubDD669G3VEC6xF7ddjMUTGDWewwzCCrwX933HnP4ufAELmoDn5pXGcSgPnLodjFvWQwRXkG94f77BatEDA8dfQ99yy97kRYynUpNLENEqTBo');
   */
  fromXPub (xpub) {
    let bitcoincash
    if (xpub[0] === 'x') bitcoincash = coininfo.bitcoincash.main
    else if (xpub[0] === 't') bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    return Bitcoin.HDNode.fromBase58(xpub, bitcoincashBitcoinJSLib)
  }

  /**
   * @api HDNode.derivePath() derivePath()
   * @apiName derivePath
   * @apiGroup HDNode
   * @apiDescription
   * Derive child HDNode from path
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // derive hardened child HDNode
   *   bchjs.HDNode.derivePath(hdNode, "m/44'/145'/0'");
   */
  derivePath (hdnode, path) {
    return hdnode.derivePath(path)
  }

  /**
   * @api HDNode.derive() derive()
   * @apiName derive
   * @apiGroup HDNode
   * @apiDescription
   * Derive non hardened child HDNode
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // derive unhardened child HDNode
   *   bchjs.HDNode.derive(hdNode, 0);
   */
  derive (hdnode, path) {
    return hdnode.derive(path)
  }

  /**
   * @api HDNode.deriveHardened() deriveHardened()
   * @apiName deriveHardened
   * @apiGroup HDNode
   * @apiDescription
   * Derive hardened child HDNode
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create seed buffer from mnemonic
   *   let seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create HDNode from seed buffer
   *   let hdNode = bchjs.HDNode.fromSeed(seedBuffer);
   *   // derive hardened child HDNode
   *   bchjs.HDNode.deriveHardened(hdNode, 0);
   */
  deriveHardened (hdnode, path) {
    return hdnode.deriveHardened(path)
  }

  /**
   * @api HDNode.sign() sign()
   * @apiName sign
   * @apiGroup HDNode
   * @apiDescription
   * Sign 32 byte hash encoded as a buffer.
   *
   * @apiExample Example usage:
   *   // mainnet xpriv
   *   let xpriv = 'xprv9z2uWrGjbYPxc728rvtMi4jt4SudRiSfYn6Tdif5XN17pJ1NTbHoHK6JePkPLY1NHXLaQcA6sWudpZDm7DwKhbsGQieAp9wx46Wbio4iXg9';
   *   // hdnode from xpriv
   *   let hdnode = bchjs.HDNode.fromXPriv(xpriv);
   *   // 32 byte buffer
   *   let buf = Buffer.from(bchjs.Crypto.sha256('EARTH'), 'hex');
   *   // sign
   *   bchjs.HDNode.sign(hdnode, buf);
   *
   *   // testnet xpriv
   *   let xpriv = 'tprv8ggxJ8SG5EdqakzVUeLa9Gr7sqCdEcJPUNDmtdJscNxfmxoXvU36ZguiUWukJVEWEixAUr8pJabJkCt33wzxFQA587gqN51Lxdxx97zAzuG';
   *   // hdnode from xpriv
   *   let hdnode = bchjs.HDNode.fromXPriv(xpriv);
   *   // 32 byte buffer
   *   let buf = Buffer.from(bchjs.Crypto.sha256('EARTH'), 'hex');
   *   // sign
   *   bchjs.HDNode.sign(hdnode, buf);
   */
  sign (hdnode, buffer) {
    return hdnode.sign(buffer)
  }

  /**
   * @api HDNode.verify() verify()
   * @apiName verify
   * @apiGroup HDNode
   * @apiDescription
   * Verify signed 32 byte hash encoded as a buffer.
   *
   * @apiExample Example usage:
   *   // mainnet xprivs
   *   let xpriv1 = 'xprv9ys4cvcoU8RoqvzxGj886r4Ey3w1WfVNYH8sMnVPVzyQtaPPM6Q8pHm3D9WPWvEupGEgcJ1xLaGaZDcvKfoAurE2AzHRRRup5FuHzDr8n15';
   *   let xpriv2 = 'xprv9ys4cvcoU8RoxqkZ7Fgt33te4LPHgcsKwyoZYVorkzp9uonWxWgP9wiSQhPeBUqVHbdAyov4Yi55RywBkDfZKdJFRqA51Anz6v72zGaMGZp';
   *   // hdnodes from xprivs
   *   let hdnode1 = bchjs.HDNode.fromXPriv(xpriv1);
   *   let hdnode2 = bchjs.HDNode.fromXPriv(xpriv2);
   *   // 32 byte buffer
   *   let buf = Buffer.from(bchjs.Crypto.sha256('EARTH'), 'hex');
   *   // sign
   *   let signature = bchjs.HDNode.sign(hdnode1, buf);
   *   // verify
   *   bchjs.HDNode.verify(hdnode1, buf, signature);
   *   // true
   *   bchjs.HDNode.verify(hdnode2, buf, signature);
   *   // false
   *
   *   // testnet xprivs
   *   let xpriv1 = 'tprv8ggxJ8SG5EdqakzVUeLa9Gr7sqCdEcJPUNDmtdJscNxfmxoXvU36ZguiUWukJVEWEixAUr8pJabJkCt33wzxFQA587gqN51Lxdxx97zAzuG';
   *   let xpriv2 = 'tprv8ggxJ8SG5EdqiM6Dn63QwHScQ7HS5hXqUMxSD1NEbDyPw6VtoUMFZBAohpTMsPz9cYbpHELmA4Zm79NKRvEvFdhWRX2bSmu7V7PiNb364nv';
   *   // hdnodes from xprivs
   *   let hdnode1 = bchjs.HDNode.fromXPriv(xpriv1);
   *   let hdnode2 = bchjs.HDNode.fromXPriv(xpriv2);
   *   // 32 byte buffer
   *   let buf = Buffer.from(bchjs.Crypto.sha256('EARTH'), 'hex');
   *   // sign
   *   let signature = bchjs.ECPair.sign(hdnode1, buf);
   *   // verify
   *   bchjs.HDNode.verify(hdnode1, buf, signature);
   *   // true
   *   bchjs.HDNode.verify(hdnode2, buf, signature);
   *   // false
   */
  verify (hdnode, buffer, signature) {
    return hdnode.verify(buffer, signature)
  }

  /**
   * @api HDNode.isPublic() isPublic()
   * @apiName isPublic
   * @apiGroup HDNode
   * @apiDescription
   * Check if an HDNode can only derive public keys and children
   *
   * @apiExample Example usage:
   *   // mainnet xpub
   *   let xpub = 'xpub6DWfGUo4cjC8oWmgZdpyFMH6v3oeyADfdUPhsehzn5jX44zpazivha3JxUtkcCvBEB1c6DGaiUmpyz2m1DRfGDEVZ5VxLLW2UNEbZ5iTRvi';
   *   let node = bchjs.HDNode.fromXPub(xpub);
   *   bchjs.HDNode.isPublic(node);
   *   // true
   *
   *   // mainnet xpriv
   *   let xpriv = 'xprv9ys4cvcoU8RoxqkZ7Fgt33te4LPHgcsKwyoZYVorkzp9uonWxWgP9wiSQhPeBUqVHbdAyov4Yi55RywBkDfZKdJFRqA51Anz6v72zGaMGZp';
   *   let node = bchjs.HDNode.fromXPriv(xpriv);
   *   bchjs.HDNode.isPublic(node);
   *   // false
   *
   *   // testnet xpub
   *   let xpub = 'tpubDCxmZ3qLVVphg6NpsnAjQFqDPwr9HYqSgoAcUYAfqSgo32dL6NA8QXqWsS6XTjoGggohZKvujsAv2F2ugej9qfUYau2jSUB4JaYnfMsx3MJ';
   *   let node = bchjs.HDNode.fromXPub(xpub);
   *   bchjs.HDNode.isPublic(node);
   *   // true
   *
   *   // testnet xpriv
   *   let xpriv = 'tprv8ggxJ8SG5EdqakzVUeLa9Gr7sqCdEcJPUNDmtdJscNxfmxoXvU36ZguiUWukJVEWEixAUr8pJabJkCt33wzxFQA587gqN51Lxdxx97zAzuG';
   *   let node = bchjs.HDNode.fromXPriv(xpriv);
   *   bchjs.HDNode.isPublic(node);
   *   // false
   */
  isPublic (hdnode) {
    return hdnode.isNeutered()
  }

  /**
   * @api HDNode.isPrivate() isPrivate()
   * @apiName isPrivate
   * @apiGroup HDNode
   * @apiDescription
   * Check if an HDNode can derive both public and private keys and children
   *
   * @apiExample Example usage:
   *   // mainnet xpub
   *   let xpub = 'xpub6DWfGUo4cjC8oWmgZdpyFMH6v3oeyADfdUPhsehzn5jX44zpazivha3JxUtkcCvBEB1c6DGaiUmpyz2m1DRfGDEVZ5VxLLW2UNEbZ5iTRvi';
   *   let node = bchjs.HDNode.fromXPub(xpub);
   *   bchjs.HDNode.isPrivate(node);
   *   // false
   *
   *   // mainnet xpriv
   *   let xpriv = 'xprv9ys4cvcoU8RoxqkZ7Fgt33te4LPHgcsKwyoZYVorkzp9uonWxWgP9wiSQhPeBUqVHbdAyov4Yi55RywBkDfZKdJFRqA51Anz6v72zGaMGZp';
   *   let node = bchjs.HDNode.fromXPriv(xpriv);
   *   bchjs.HDNode.isPrivate(node);
   *   // true
   *
   *   // testnet xpub
   *   let xpub = 'tpubDCxmZ3qLVVphg6NpsnAjQFqDPwr9HYqSgoAcUYAfqSgo32dL6NA8QXqWsS6XTjoGggohZKvujsAv2F2ugej9qfUYau2jSUB4JaYnfMsx3MJ';
   *   let node = bchjs.HDNode.fromXPub(xpub);
   *   bchjs.HDNode.isPrivate(node);
   *   // false
   *
   *   // testnet xpriv
   *   let xpriv = 'tprv8ggxJ8SG5EdqakzVUeLa9Gr7sqCdEcJPUNDmtdJscNxfmxoXvU36ZguiUWukJVEWEixAUr8pJabJkCt33wzxFQA587gqN51Lxdxx97zAzuG';
   *   let node = bchjs.HDNode.fromXPriv(xpriv);
   *   bchjs.HDNode.isPrivate(node);
   *   // true
   */
  isPrivate (hdnode) {
    return !hdnode.isNeutered()
  }

  /**
   * @api HDNode.toIdentifier() toIdentifier()
   * @apiName toIdentifier
   * @apiGroup HDNode
   * @apiDescription
   * hash160 of Node’s public key. The same value you would see in a scriptPubKey.
   *
   * @apiExample Example usage:
   *   // mainnet
   *   let xpub = 'xpub6DWfGUo4cjC8oWmgZdpyFMH6v3oeyADfdUPhsehzn5jX44zpazivha3JxUtkcCvBEB1c6DGaiUmpyz2m1DRfGDEVZ5VxLLW2UNEbZ5iTRvi';
   *   let node = bchjs.HDNode.fromXPub(xpub);
   *   bchjs.HDNode.toIdentifier(node);
   *   // <Buffer cd d4 84 1d 2e 96 bf bf f7 9c d1 f4 a6 75 22 1c 7f 67 88 9c>
   *   // the same as if we hash160ed it's publicKey
   *   let publicKeyBuffer = bchjs.HDNode.toPublicKey(node);
   *   bchjs.Crypto.hash160(publicKeyBuffer);
   *   // <Buffer cd d4 84 1d 2e 96 bf bf f7 9c d1 f4 a6 75 22 1c 7f 67 88 9c>
   *
   *   // testnet
   *   let xpub = 'tpubDCxmZ3qLVVphg6NpsnAjQFqDPwr9HYqSgoAcUYAfqSgo32dL6NA8QXqWsS6XTjoGggohZKvujsAv2F2ugej9qfUYau2jSUB4JaYnfMsx3MJ';
   *   let node = bchjs.HDNode.fromXPub(xpub);
   *   bchjs.HDNode.toIdentifier(node);
   *   // <Buffer e1 8e 20 e3 f8 f1 c0 53 e6 1f 9e 3a 58 8e 71 f5 0b 8d 2d c4>
   *   // the same as if we hash160ed it's publicKey
   *   let publicKeyBuffer = bchjs.HDNode.toPublicKey(node);
   *   bchjs.Crypto.hash160(publicKeyBuffer);
   *   // <Buffer e1 8e 20 e3 f8 f1 c0 53 e6 1f 9e 3a 58 8e 71 f5 0b 8d 2d c4>
   */
  toIdentifier (hdnode) {
    return hdnode.getIdentifier()
  }

  fromBase58 (base58, network) {
    return Bitcoin.HDNode.fromBase58(base58, network)
  }

  /**
   * @api HDNode.createAccount() createAccount()
   * @apiName createAccount
   * @apiGroup HDNode
   * @apiDescription
   * Has getChainAddress and nextChainAddress helper methods.
   *
   * @apiExample Example usage:
   *   // create mnemonic
   *   let mnemonic = bchjs.Mnemonic.generate(128);
   *   // create root seed buffer
   *   let rootSeedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
   *   // create master hd node
   *   let masterHDNode = bchjs.HDNode.fromSeed(rootSeedBuffer);
   *   // derive child node
   *   let childNode = masterHDNode.derivePath("m/44'/145'/0'/0");
   *   // create account
   *   let account = bchjs.HDNode.createAccount([childNode]);
   */
  createAccount (hdNodes) {
    const arr = hdNodes.map(
      (item, index) => new bip32utils.Chain(item.neutered())
    )
    return new bip32utils.Account(arr)
  }

  createChain (hdNode) {
    return new bip32utils.Chain(hdNode)
  }
}

module.exports = HDNode

```

`/home/trout/work/psf/code/bch-js/src/bch-js.js`:

```js
/*
  This is the primary library file for bch-js. This file combines all the other
  libraries in order to create the BCHJS class.

  The primary server used has switched to fullstack.cash. Go there to sign up
  for an account that gives you increased rate limits.
*/

// bch-api mainnet.
const DEFAULT_REST_API = 'https://api.fullstack.cash/v5/'
// const DEFAULT_REST_API = "http://localhost:3000/v5/"

// local deps
const BitcoinCash = require('./bitcoincash')
const Crypto = require('./crypto')
const Util = require('./util')
const Blockchain = require('./blockchain')
const Control = require('./control')
const Generating = require('./generating')
const Mining = require('./mining')
const RawTransactions = require('./raw-transactions')
const Mnemonic = require('./mnemonic')
const Address = require('./address')
const HDNode = require('./hdnode')
const TransactionBuilder = require('./transaction-builder')
const ECPair = require('./ecpair')
const Script = require('./script')
const Price = require('./price')
const Schnorr = require('./schnorr')
const SLP = require('./slp/slp')
const Encryption = require('./encryption')
const Utxo = require('./utxo')
const Transaction = require('./transaction')
const DSProof = require('./dsproof')
const Ecash = require('./ecash')

// Indexers
const Electrumx = require('./electrumx')
const PsfSlpIndexer = require('./psf-slp-indexer')

class BCHJS {
  constructor (config) {
    // Try to retrieve the REST API URL from different sources.
    if (config && config.restURL && config.restURL !== '') {
      this.restURL = config.restURL
    } else if (process.env.RESTURL && process.env.RESTURL !== '') {
      this.restURL = process.env.RESTURL
    } else this.restURL = DEFAULT_REST_API

    // Retrieve the apiToken
    this.apiToken = '' // default value.
    if (config && config.apiToken && config.apiToken !== '') {
      this.apiToken = config.apiToken
    } else if (process.env.BCHJSTOKEN && process.env.BCHJSTOKEN !== '') {
      this.apiToken = process.env.BCHJSTOKEN
    }

    // Retrieve the Basic Authentication password.
    this.authPass = '' // default value.
    if (config && config.authPass && config.authPass !== '') {
      this.authPass = config.authPass
    } else if (process.env.BCHJSAUTHPASS && process.env.BCHJSAUTHPASS !== '') {
      this.authPass = process.env.BCHJSAUTHPASS
    }

    // Generate a Basic Authentication token from an auth password
    this.authToken = ''
    if (this.authPass) {
      // console.log(`bch-js initialized with authPass: ${this.authPass}`)
      // Generate the header for Basic Authentication.
      const combined = `fullstackcash:${this.authPass}`
      const base64Credential = Buffer.from(combined).toString('base64')
      this.authToken = `Basic ${base64Credential}`
    }

    const libConfig = {
      restURL: this.restURL,
      apiToken: this.apiToken,
      authToken: this.authToken
    }

    // console.log(`apiToken: ${this.apiToken}`)

    // ElectrumX indexer
    this.Electrumx = new Electrumx(libConfig)

    // Populate Full Node
    this.Control = new Control(libConfig)
    this.Mining = new Mining(libConfig)
    this.RawTransactions = new RawTransactions(libConfig)

    // Populate utility functions
    this.Address = new Address(libConfig)
    this.BitcoinCash = new BitcoinCash(this.Address)
    this.Blockchain = new Blockchain(libConfig)
    this.Crypto = Crypto
    this.ECPair = ECPair
    this.ECPair.setAddress(this.Address)
    this.encryption = new Encryption(libConfig)
    this.Generating = new Generating(libConfig)
    this.HDNode = new HDNode(this.Address)
    this.Mnemonic = new Mnemonic(this.Address)
    this.Price = new Price(libConfig)
    this.Script = new Script()
    this.TransactionBuilder = TransactionBuilder
    this.TransactionBuilder.setAddress(this.Address)
    this.Util = new Util(libConfig)
    this.Schnorr = new Schnorr(libConfig)

    this.SLP = new SLP(libConfig)
    this.SLP.HDNode = this.HDNode

    this.Utxo = new Utxo(libConfig)
    this.Transaction = new Transaction(libConfig)

    this.DSProof = new DSProof(libConfig)
    this.eCash = new Ecash()

    this.PsfSlpIndexer = new PsfSlpIndexer(libConfig)
  }
}

module.exports = BCHJS

```

`/home/trout/work/psf/code/bch-js/src/blockchain.js`:

```js
/*
  TODO
  - Add blockhash functionality back into getTxOutProof
*/

const axios = require('axios')

// let _this

class Blockchain {
  constructor (config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.authToken = config.authToken

    if (this.authToken) {
      // Add Basic Authentication token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: this.authToken
        }
      }
    } else {
      // Add JWT token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: `Token ${this.apiToken}`
        }
      }
    }

    // _this = this
  }

  /**
   * @api Blockchain.getBestBlockHash() getBestBlockHash()
   * @apiName getBestBlockHash
   * @apiGroup Blockchain
   * @apiDescription
   * Returns the hash of the best (tip) block in the longest blockchain.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getBestBlockHash = await bchjs.Blockchain.getBestBlockHash();
   * console.log(getBestBlockHash);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   * // 241decef88889efac8e6ce428a8ac696fdde5972eceed97e1fb58d6106af31d5
   */
  async getBestBlockHash () {
    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getBestBlockHash`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getBlock() getBlock()
   * @apiName getBlock
   * @apiGroup Blockchain
   * @apiDescription
   * If verbose is 0, returns a string that is serialized, hex-encoded data for block 'hash'. If verbose is 1, returns an Object with information about block hash.
   * If verbose is 2, returns an Object with information about block hash and information about tx.
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getBlock = await bchjs.Blockchain.getBlock("00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09");
   * console.log(getBlock);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // {
   * //  hash: '00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09',
   * //  confirmations: 528236,
   * //  size: 216,
   * //  height: 1000,
   * //  version: 1,
   * //  versionHex: '00000001',
   * //  merkleroot: 'fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33',
   * //  tx:
   * //   [ 'fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33' ],
   * //  time: 1232346882,
   * //  mediantime: 1232344831,
   * //  nonce: 2595206198,
   * //  bits: '1d00ffff',
   * //  difficulty: 1,
   * //  chainwork: '000000000000000000000000000000000000000000000000000003e903e903e9',
   * //  previousblockhash: '0000000008e647742775a230787d66fdf92c46a48c896bfbc85cdc8acc67e87d',
   * //  nextblockhash: '00000000a2887344f8db859e372e7e4bc26b23b9de340f725afbf2edb265b4c6'
   * // }
   */
  async getBlock (blockhash, verbosity = 1) {
    try {
      // Input validation
      if (!blockhash || typeof blockhash !== 'string') {
        throw new Error('blockhash must be a string')
      }
      const response = await axios.post(
        `${this.restURL}blockchain/getblock`,
        {
          blockhash,
          verbosity
        },
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getBlockchainInfo() getBlockchainInfo()
   * @apiName getBlockchainInfo
   * @apiGroup Blockchain
   * @apiDescription
   * Returns an object containing various state info regarding blockchain processing.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getBlockchainInfo = await bchjs.Blockchain.getBlockchainInfo();
   * console.log(getBlockchainInfo);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // { chain: 'main',
   * // blocks: 529235,
   * // headers: 529235,
   * // bestblockhash: '00000000000000000108641af52e01a447b1f9d801571f93a0f20a8cbf80c236',
   * // difficulty: 702784497476.8376,
   * // mediantime: 1525727823,
   * // verificationprogress: 0.9999892037620548,
   * // chainwork: '00000000000000000000000000000000000000000099f5e1cf7d4e462a493a51',
   * // pruned: false,
   * // softforks:
   * //  [ { id: 'bip34', version: 2, reject: [Object] },
   * //    { id: 'bip66', version: 3, reject: [Object] },
   * //    { id: 'bip65', version: 4, reject: [Object] } ],
   * // bip9_softforks:
   * //  { csv:
   * //     { status: 'active',
   * //       startTime: 1462060800,
   * //       timeout: 1493596800,
   * //       since: 419328 } } }
   */
  async getBlockchainInfo () {
    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getBlockchainInfo`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getBlockCount() getBlockCount()
   * @apiName getBlockCount
   * @apiGroup Blockchain
   * @apiDescription
   * Returns the number of blocks in the longest blockchain.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getBlockCount = await bchjs.Blockchain.getBlockCount();
   * console.log(getBlockCount);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   * // 529235
   */
  async getBlockCount () {
    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getBlockCount`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      console.log('Error in bch-js/blockchain.js/getBlockCount()')
      console.log('blockchain.js restURL: ', this.restURL)

      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getBlockHash() getBlockHash()
   * @apiName getBlockHash
   * @apiGroup Blockchain
   * @apiDescription
   * Returns hash of block in best-block-chain at height provided.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getBlockHash = await bchjs.Blockchain.getBlockHash([0]);
   * console.log(getBlockHash);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   * // [ '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f' ]
   */
  async getBlockHash (height = 1) {
    if (typeof height !== 'string') height = JSON.stringify(height)

    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getBlockHash/${height}`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getBlockHeader() getBlockHeader()
   * @apiName getBlockHeader
   * @apiGroup Blockchain
   * @apiDescription
   * If verbose is false, returns a string that is serialized, hex-encoded data for blockheader 'hash'. If verbose is true, returns an Object with information about blockheader hash.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getBlockHeader = await bchjs.Blockchain.getBlockHeader(["00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"]);
   * console.log(getBlockHeader);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // [{ hash: '00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09',
   * // confirmations: 528236,
   * // height: 1000,
   * // version: 1,
   * // versionHex: '00000001',
   * // merkleroot: 'fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33',
   * // time: 1232346882,
   * // mediantime: 1232344831,
   * // nonce: 2595206198,
   * // bits: '1d00ffff',
   * // difficulty: 1,
   * // chainwork: '000000000000000000000000000000000000000000000000000003e903e903e9',
   * // previousblockhash: '0000000008e647742775a230787d66fdf92c46a48c896bfbc85cdc8acc67e87d',
   * // nextblockhash: '00000000a2887344f8db859e372e7e4bc26b23b9de340f725afbf2edb265b4c6' }]
   */
  async getBlockHeader (hash, verbose = true) {
    try {
      // Handle single hash.
      if (typeof hash === 'string') {
        const response = await axios.get(
          `${this.restURL}blockchain/getBlockHeader/${hash}?verbose=${verbose}`,
          this.axiosOptions
        )

        return response.data

        // Handle array of hashes.
      } else if (Array.isArray(hash)) {
        // Dev note: must use axios.post for unit test stubbing.
        const response = await axios.post(
          `${this.restURL}blockchain/getBlockHeader`,
          {
            hashes: hash,
            verbose: verbose
          },
          this.axiosOptions
        )

        return response.data
      }

      throw new Error('Input hash must be a string or array of strings.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getChainTips() getChainTips()
   * @apiName getChainTips
   * @apiGroup Blockchain
   * @apiDescription
   * Return information about all known tips in the block tree, including the main chain as well as orphaned branches.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getChainTips = await bchjs.Blockchain.getChainTips();
   * console.log(getChainTips);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // [ { height: 529235,
   * //   hash: '00000000000000000108641af52e01a447b1f9d801571f93a0f20a8cbf80c236',
   * //   branchlen: 0,
   * //   status: 'active' },
   * // { height: 527442,
   * //   hash: '0000000000000000014cbf7b7aa12e52dd97db4b1ba5f39dccae37773af9272e',
   * //   branchlen: 1,
   * //   status: 'invalid' },
   * // { height: 526861,
   * //   hash: '00000000000000000225b070818bbafd95842ecbd25edf39bff54a7aa5c8fd10',
   * //   branchlen: 1,
   * //   status: 'valid-headers' } ]
   */
  async getChainTips () {
    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getChainTips`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getDifficulty() getDifficulty()
   * @apiName getDifficulty
   * @apiGroup Blockchain
   * @apiDescription
   * Returns the proof-of-work difficulty as a multiple of the minimum difficulty.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getDifficulty = await bchjs.Blockchain.getDifficulty();
   * console.log(getDifficulty);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // 702784497476.8376
   */
  async getDifficulty () {
    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getDifficulty`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  // getMempoolAncestors
  async getMempoolAncestors (txid, verbose = false) {
    if (typeof txid !== 'string') txid = JSON.stringify(txid)

    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getMempoolAncestors/${txid}?verbose=${verbose}`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getMempoolDescendants (txid, verbose = false) {
    if (typeof txid !== 'string') txid = JSON.stringify(txid)

    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getMempoolDescendants/${txid}?verbose=${verbose}`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getMempoolEntry() getMempoolEntry()
   * @apiName getMempoolEntry
   * @apiGroup Blockchain
   * @apiDescription
   * Returns mempool data for given transaction.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getMempoolEntry = await bchjs.Blockchain.getMempoolEntry("fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33");
   * console.log(getMempoolEntry);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // {
   * //   "size": 372,
   * //   "fee": 0.00000374,
   * //   "modifiedfee": 0.00000374,
   * //   "time": 1547738850,
   * //   "height": 565716,
   * //   "startingpriority": 26524545.3974359,
   * //   "currentpriority": 26524545.3974359,
   * //   "descendantcount": 1,
   * //   "descendantsize": 372,
   * //   "descendantfees": 374,
   * //   "ancestorcount": 1,
   * //   "ancestorsize": 372,
   * //   "ancestorfees": 374,
   * //   "depends": []
   * // }
   *
   * (async () => {
   * try {
   * let getMempoolEntry = await bchjs.Blockchain.getMempoolEntry([
   *   "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33",
   *   "defea04c38ee00cf73ad402984714ed22dc0dd99b2ae5cb50d791d94343ba79b"
   *   ]);
   * console.log(getMempoolEntry);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // [
   * //   {
   * //     "size": 372,
   * //     "fee": 0.00000374,
   * //     "modifiedfee": 0.00000374,
   * //     "time": 1547738850,
   * //     "height": 565716,
   * //     "startingpriority": 26524545.3974359,
   * //     "currentpriority": 26524545.3974359,
   * //     "descendantcount": 1,
   * //     "descendantsize": 372,
   * //     "descendantfees": 374,
   * //     "ancestorcount": 1,
   * //     "ancestorsize": 372,
   * //     "ancestorfees": 374,
   * //     "depends": []
   * //   },
   * //   {
   * //     "size": 372,
   * //     "fee": 0.00000374,
   * //     "modifiedfee": 0.00000374,
   * //     "time": 1547738850,
   * //     "height": 565716,
   * //     "startingpriority": 26524545.3974359,
   * //     "currentpriority": 26524545.3974359,
   * //     "descendantcount": 1,
   * //     "descendantsize": 372,
   * //     "descendantfees": 374,
   * //     "ancestorcount": 1,
   * //     "ancestorsize": 372,
   * //     "ancestorfees": 374,
   * //     "depends": []
   * //   }
   * // ]
   */
  async getMempoolEntry (txid) {
    // if (typeof txid !== "string") txid = JSON.stringify(txid)

    try {
      if (typeof txid === 'string') {
        const response = await axios.get(
          `${this.restURL}blockchain/getMempoolEntry/${txid}`,
          this.axiosOptions
        )

        return response.data
      } else if (Array.isArray(txid)) {
        // Dev note: must use axios.post for unit test stubbing.
        const response = await axios.post(
          `${this.restURL}blockchain/getMempoolEntry`,
          {
            txids: txid
          },
          this.axiosOptions
        )

        return response.data
      }

      throw new Error('Input must be a string or array of strings.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getMempoolInfo() getMempoolInfo()
   * @apiName getMempoolInfo
   * @apiGroup Blockchain
   * @apiDescription
   * Returns details on the active state of the TX memory pool.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getMempoolInfo = await bchjs.Blockchain.getMempoolInfo();
   * console.log(getMempoolInfo);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // { size: 257,
   * // bytes: 98257,
   * // usage: 365840,
   * // maxmempool: 300000000,
   * // mempoolminfee: 0 }
   */
  async getMempoolInfo () {
    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getMempoolInfo`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getRawMempool() getRawMempool()
   * @apiName getRawMempool
   * @apiGroup Blockchain
   * @apiDescription
   * Returns all transaction ids in memory pool as a json array of string transaction ids.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getRawMempool = await bchjs.Blockchain.getRawMempool(true);
   * console.log(getRawMempool);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // [  {'2ae541af20db6f2b50410f418af56e349d08877d685f6cf54df54658e892db7a':
   * //  { size: 237,
   * //    fee: 0.00000238,
   * //    modifiedfee: 0.00000238,
   * //    time: 1525732015,
   * //    height: 529235,
   * //    startingpriority: 0,
   * //    currentpriority: 0,
   * //    descendantcount: 10,
   * //    descendantsize: 2376,
   * //    descendantfees: 2380,
   * //    ancestorcount: 3,
   * //    ancestorsize: 712,
   * //    ancestorfees: 714,
   * //    depends:
   * //     [ 'e25682caafc7000645d59f4c11d8d594b2943979b9d8fafb9f946e2b35c21b7e' ] },]
   */
  async getRawMempool (verbose = false) {
    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getRawMempool?vebose=${verbose}`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getTxOut() getTxOut()
   * @apiName getTxOut
   * @apiGroup Blockchain
   * @apiDescription
   * Returns details about an unspent transaction output.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getTxOut = await bchjs.Blockchain.getTxOut("e25682caafc7000645d59f4c11d8d594b2943979b9d8fafb9f946e2b35c21b7e", 1);
   * console.log(getTxOut);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // null
   */
  async getTxOut (txid, n, includeMempool = true) {
    try {
      // Input validation
      if (typeof txid !== 'string' || txid.length !== 64) {
        throw new Error('txid needs to be a proper transaction ID')
      }

      if (isNaN(n)) throw new Error('n must be an integer')

      if (typeof includeMempool !== 'boolean') {
        throw new Error('includeMempool input must be of type boolean')
      }

      // Send the request to the REST API.
      // const response = await axios.get(
      //   `${this.restURL}blockchain/getTxOut/${txid}/${n}?includeMempool=${includeMempool}`,
      //   this.axiosOptions
      // )
      const response = await axios.post(
        `${this.restURL}blockchain/getTxOut`,
        {
          txid: txid,
          vout: n,
          mempool: includeMempool
        },
        this.axiosOptions
      )

      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getTxOutProof() getTxOutProof()
   * @apiName getTxOutProof
   * @apiGroup Blockchain
   * @apiDescription
   * Returns a hex-encoded proof that "txid" was included in a block.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getTxOutProof = await bchjs.Blockchain.getTxOutProof("e25682caafc7000645d59f4c11d8d594b2943979b9d8fafb9f946e2b35c21b7e");
   * console.log(getTxOutProof);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // "0000002086a4a3161f9ba2174883ec0b93acceac3b2f37b36ed1f90000000000000000009cb02406d1094ecf3e0b4c0ca7c585125e721147c39daf6b48c90b512741e13a12333e5cb38705180f441d8c7100000008fee9b60f1edb57e5712839186277ed39e0a004a32be9096ee47472efde8eae62f789f9d7a9f59d0ea7093dea1e0c65ff0b953f1d8cf3d47f92e732ca0295f603c272d5f4a63509f7a887f2549d78af7444aa0ecbb4f66d9cbe13bc6a89f59e05a199df8325d490818ffefe6b6321d32d7496a68580459836c0183f89082fc1b491cc91b23ecdcaa4c347bf599a62904d61f1c15b400ebbd5c90149010c139d9c1e31b774b796977393a238080ab477e1d240d0c4f155d36f519668f49bae6bd8cd5b8e40522edf76faa09cca6188d83ff13af6967cc6a569d1a5e9aeb1fdb7f531ddd2d0cbb81879741d5f38166ac1932136264366a4065cc96a42e41f96294f02df01"
   *
   * (async () => {
   * try {
   * let getTxOutProof = await bchjs.Blockchain.getTxOutProof([
   *   "e25682caafc7000645d59f4c11d8d594b2943979b9d8fafb9f946e2b35c21b7e",
   *   "d16662463fd98eb96c8f6898d58a4461ac3d0120f4d0aea601d72b37759f261c"
   * ]);
   * console.log(getTxOutProof);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // [
   * //   "010000007de867cc8adc5cc8fb6b898ca4462cf9fd667d7830a275277447e60800000000338f121232e169d3100edd82004dc2a1f0e1f030c6c488fa61eafa930b0528fe021f7449ffff001d36b4af9a0100000001338f121232e169d3100edd82004dc2a1f0e1f030c6c488fa61eafa930b0528fe0101",
   * //   "010000007de867cc8adc5cc8fb6b898ca4462cf9fd667d7830a275277447e60800000000338f121232e169d3100edd82004dc2a1f0e1f030c6c488fa61eafa930b0528fe021f7449ffff001d36b4af9a0100000001338f121232e169d3100edd82004dc2a1f0e1f030c6c488fa61eafa930b0528fe0101"
   * // ]
   */
  async getTxOutProof (txids) {
    try {
      // Single txid.
      if (typeof txids === 'string') {
        const path = `${this.restURL}blockchain/getTxOutProof/${txids}`
        // if (blockhash) path = `${path}?blockhash=${blockhash}`

        const response = await axios.get(path, this.axiosOptions)
        return response.data

        // Array of txids.
      } else if (Array.isArray(txids)) {
        // Dev note: must use axios.post for unit test stubbing.
        const response = await axios.post(
          `${this.restURL}blockchain/getTxOutProof`,
          {
            txids: txids
          },
          this.axiosOptions
        )

        return response.data
      }

      throw new Error('Input must be a string or array of strings.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async preciousBlock (blockhash) {
    try {
      const response = await axios.get(
        `${this.restURL}blockchain/preciousBlock/${blockhash}`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async pruneBlockchain (height) {
    try {
      const response = await axios.post(
        `${this.restURL}blockchain/pruneBlockchain/${height}`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async verifyChain (checklevel = 3, nblocks = 6) {
    try {
      const response = await axios.get(
        `${this.restURL}blockchain/verifyChain?checklevel=${checklevel}&nblocks=${nblocks}`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.verifyTxOutProof() verifyTxOutProof()
   * @apiName verifyTxOutProof
   * @apiGroup Blockchain
   * @apiDescription
   * Verifies that a proof points to a transaction in a block, returning the transaction it commits to and throwing an RPC error if the block is not in our best chain.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * const proof = "0000002086a4a3161f9ba2174883ec0b93acceac3b2f37b36ed1f90000000000000000009cb02406d1094ecf3e0b4c0ca7c585125e721147c39daf6b48c90b512741e13a12333e5cb38705180f441d8c7100000008fee9b60f1edb57e5712839186277ed39e0a004a32be9096ee47472efde8eae62f789f9d7a9f59d0ea7093dea1e0c65ff0b953f1d8cf3d47f92e732ca0295f603c272d5f4a63509f7a887f2549d78af7444aa0ecbb4f66d9cbe13bc6a89f59e05a199df8325d490818ffefe6b6321d32d7496a68580459836c0183f89082fc1b491cc91b23ecdcaa4c347bf599a62904d61f1c15b400ebbd5c90149010c139d9c1e31b774b796977393a238080ab477e1d240d0c4f155d36f519668f49bae6bd8cd5b8e40522edf76faa09cca6188d83ff13af6967cc6a569d1a5e9aeb1fdb7f531ddd2d0cbb81879741d5f38166ac1932136264366a4065cc96a42e41f96294f02df01"
   * let verifyTxOutProof = await bchjs.Blockchain.verifyTxOutProof(proof);
   * console.log(verifyTxOutProof);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // [
   * //   "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7"
   * // ]
   *
   * (async () => {
   * try {
   * const proof = "0000002086a4a3161f9ba2174883ec0b93acceac3b2f37b36ed1f90000000000000000009cb02406d1094ecf3e0b4c0ca7c585125e721147c39daf6b48c90b512741e13a12333e5cb38705180f441d8c7100000008fee9b60f1edb57e5712839186277ed39e0a004a32be9096ee47472efde8eae62f789f9d7a9f59d0ea7093dea1e0c65ff0b953f1d8cf3d47f92e732ca0295f603c272d5f4a63509f7a887f2549d78af7444aa0ecbb4f66d9cbe13bc6a89f59e05a199df8325d490818ffefe6b6321d32d7496a68580459836c0183f89082fc1b491cc91b23ecdcaa4c347bf599a62904d61f1c15b400ebbd5c90149010c139d9c1e31b774b796977393a238080ab477e1d240d0c4f155d36f519668f49bae6bd8cd5b8e40522edf76faa09cca6188d83ff13af6967cc6a569d1a5e9aeb1fdb7f531ddd2d0cbb81879741d5f38166ac1932136264366a4065cc96a42e41f96294f02df01"
   * let verifyTxOutProof = await bchjs.Blockchain.verifyTxOutProof([proof, proof]);
   * console.log(verifyTxOutProof);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // [
   * //   "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7",
   * //   "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7"
   * // ]
   */
  async verifyTxOutProof (proof) {
    try {
      // Single block
      if (typeof proof === 'string') {
        const response = await axios.get(
          `${this.restURL}blockchain/verifyTxOutProof/${proof}`,
          this.axiosOptions
        )
        return response.data

        // Array of hashes.
      } else if (Array.isArray(proof)) {
        // Dev note: must use axios.post for unit test stubbing.
        const response = await axios.post(
          `${this.restURL}blockchain/verifyTxOutProof`,
          {
            proofs: proof
          },
          this.axiosOptions
        )

        return response.data
      }

      throw new Error('Input must be a string or array of strings.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = Blockchain

```

`/home/trout/work/psf/code/bch-js/src/script.js`:

```js
const Bitcoin = require('@psf/bitcoincashjs-lib')
const opcodes = require('@psf/bitcoincash-ops')

class Script {
  constructor () {
    this.opcodes = opcodes
    this.nullData = Bitcoin.script.nullData
    this.multisig = {
      input: {
        encode: signatures => {
          const sigs = []
          signatures.forEach(sig => {
            sigs.push(sig)
          })
          return Bitcoin.script.multisig.input.encode(sigs)
        },
        decode: Bitcoin.script.multisig.input.decode,
        check: Bitcoin.script.multisig.input.check
      },
      output: {
        encode: (m, pubKeys) => {
          const pks = []
          pubKeys.forEach(pubKey => {
            pks.push(pubKey)
          })
          return Bitcoin.script.multisig.output.encode(m, pks)
        },
        decode: Bitcoin.script.multisig.output.decode,
        check: Bitcoin.script.multisig.output.check
      }
    }
    this.pubKey = Bitcoin.script.pubKey
    this.pubKeyHash = Bitcoin.script.pubKeyHash
    this.scriptHash = Bitcoin.script.scriptHash
  }

  /**
   * @api Script.classifyInput() classifyInput()
   * @apiName classifyInput
   * @apiGroup Script
   * @apiDescription
   * Classify transaction input.
   *
   * @apiExample Example usage:
   * let pubkeyInput = "3045022100ba2c3b717e023966cb16df65ca83f77029e2a5b80c47c47b6956474ac9ff281302201d48ee3292439e284a6654a0e79ac2b8f7fff5c6b0d715260aa296501a239c6441";
   * bchjs.Script.classifyInput(bchjs.Script.fromASM(pubkeyInput));
   * // pubkey
   *
   * let pubkeyhashInput = "30440220280d4a9954c5afe24089bdd545466bd7a8caad8b295e30de9d3cb5e56fccf64e022036663b2c53b5fac674b4b935b53e2a4ea88dfc71c9b879870976d82887542ab441 02969479fa9bea3082697dce683ac05b13ae63016b41d5ca1a450ad40f6c543751";
   * bchjs.Script.classifyInput(bchjs.Script.fromASM(pubkeyhashInput));
   * // pubkeyhash
   *
   * let multisigInput = "OP_0 3045022100fe324541215798b2df68cbd44039615e23c506d4ec1a05572064392a98196b82022068c849fa6699206da2fc6d7848efc1d3804a5816d6293615fe34c1a7f34e1c2f01 3044022001ab168e80b863fdec694350b587339bb72a37108ac3c989849251444d13ebba02201811272023e3c1038478eb972a82d3ad431bfc2408e88e4da990f1a7ecbb263901 3045022100aaeb7204c17eee2f2c4ff1c9f8b39b79e75e7fbf33e92cc67ac51be8f15b75f90220659eee314a4943a6384d2b154fa5821ef7a084814d7ee2c6f9f7f0ffb53be34b01";
   * bchjs.Script.classifyInput(bchjs.Script.fromASM(multisigInput));
   * // multisig
   *
   * let scripthashInput = "OP_0 304402207515cf147d201f411092e6be5a64a6006f9308fad7b2a8fdaab22cd86ce764c202200974b8aca7bf51dbf54150d3884e1ae04f675637b926ec33bf75939446f6ca2801 3045022100ef253c1faa39e65115872519e5f0a33bbecf430c0f35cf562beabbad4da24d8d02201742be8ee49812a73adea3007c9641ce6725c32cd44ddb8e3a3af460015d140501 522102359c6e3f04cefbf089cf1d6670dc47c3fb4df68e2bad1fa5a369f9ce4b42bbd1210395a9d84d47d524548f79f435758c01faec5da2b7e551d3b8c995b7e06326ae4a52ae";
   * bchjs.Script.classifyInput(bchjs.Script.fromASM(scripthashInput));
   * // scripthash
   */
  classifyInput (script) {
    return Bitcoin.script.classifyInput(script)
  }

  /**
   * @api Script.classifyOutput() classifyOutput()
   * @apiName classifyOutput
   * @apiGroup Script
   * @apiDescription
   * Classify transaction output.
   *
   * @apiExample Example usage:
   * let nullDataOutput = "OP_RETURN 424348466f7245766572796f6e65";
   * bchjs.Script.classifyOutput(bchjs.Script.fromASM(nullDataOutput));
   * // nulldata
   *
   * let pubkeyOutput = "02359c6e3f04cefbf089cf1d6670dc47c3fb4df68e2bad1fa5a369f9ce4b42bbd1 OP_CHECKSIG";
   * bchjs.Script.classifyOutput(bchjs.Script.fromASM(pubkeyOutput));
   * // pubkey
   *
   * let pubkeyhashOutput = "OP_DUP OP_HASH160 aa4d7985c57e011a8b3dd8e0e5a73aaef41629c5 OP_EQUALVERIFY OP_CHECKSIG";
   * bchjs.Script.classifyOutput(bchjs.Script.fromASM(pubkeyhashOutput));
   * // pubkeyhash
   *
   * let multisigOutput = "OP_2 02359c6e3f04cefbf089cf1d6670dc47c3fb4df68e2bad1fa5a369f9ce4b42bbd1 0395a9d84d47d524548f79f435758c01faec5da2b7e551d3b8c995b7e06326ae4a OP_2 OP_CHECKMULTISIG";
   * bchjs.Script.classifyOutput(bchjs.Script.fromASM(multisigOutput));
   * // multisig
   *
   * let scripthashOutput = "OP_HASH160 722ff0bc2c3f47b35c20df646c395594da24e90e OP_EQUAL";
   * bchjs.Script.classifyOutput(bchjs.Script.fromASM(scripthashOutput));
   * // scripthash
   */
  classifyOutput (script) {
    return Bitcoin.script.classifyOutput(script)
  }

  /**
   * @api Script.decode() decode()
   * @apiName decode
   * @apiGroup Script
   * @apiDescription
   * Decode a Script buffer.
   *
   * @apiExample Example usage:
   * // decode P2PKH scriptSig buffer
   * let scriptSigBuffer = Buffer.from("483045022100877e2f9c28421f0a850cc8ff66ba1d0f6c8dbe9e63e199c2c2600c9c15bf9d4402204d35b13d3cc202aa25722b2b1791442ebc5c39d898b609515260ad08f0e766a6012102fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb", 'hex');
   * bchjs.Script.decode(scriptSigBuffer);
   * // [ <Buffer 30 45 02 21 00 87 7e 2f 9c 28 42 1f 0a 85 0c c8 ff 66 ba 1d 0f 6c 8d be 9e 63 e1 99 c2 c2 60 0c 9c 15 bf 9d 44 02 20 4d 35 b1 3d 3c c2 02 aa 25 72 2b ... >, <Buffer 02 fb 72 1b 92 02 5e 77 5b 1b 84 77 4e 65 d5 68 d2 46 45 cb 63 32 75 f5 c2 6f 5c 31 01 b2 14 a8 fb> ]
   *
   * // decode P2PKH scriptPubKey buffer
   * let scriptPubKeyBuffer = Buffer.from("76a91424e9c07804d0ee7e5bda934e0a3ae8710fc007dd88ac", 'hex');
   * bchjs.Script.decode(scriptPubKeyBuffer);
   * // [ 118,
   * // 169,
   * // <Buffer 24 e9 c0 78 04 d0 ee 7e 5b da 93 4e 0a 3a e8 71 0f c0 07 dd>,
   * // 136,
   * // 172 ]
   */
  decode (scriptBuffer) {
    return Bitcoin.script.decompile(scriptBuffer)
  }

  /**
   * @api Script.encode() encode()
   * @apiName encode
   * @apiGroup Script
   * @apiDescription
   * Encode a Script buffer with minimal push data. This function is used for
   * Script files like CashScript. However, it will mangle the OP_RETURN of
   * an SLP token transaction and will burn the tokens as a result. Use encode2()
   * instead for that.
   *
   * @apiExample Example usage:
   * // encode P2PKH scriptSig to buffer
   * let scriptSig = [
   * Buffer.from('3045022100877e2f9c28421f0a850cc8ff66ba1d0f6c8dbe9e63e199c2c2600c9c15bf9d4402204d35b13d3cc202aa25722b2b1791442ebc5c39d898b609515260ad08f0e766a601', 'hex'),
   * Buffer.from('02fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb', 'hex')
   * ]
   * bchjs.Script.encode(scriptSig);
   * // <Buffer 48 30 45 02 21 00 87 7e 2f 9c 28 42 1f 0a 85 0c c8 ff 66 ba 1d 0f 6c 8d be 9e 63 e1 99 c2 c2 60 0c 9c 15 bf 9d 44 02 20 4d 35 b1 3d 3c c2 02 aa 25 72 ... >
   *
   * // encode P2PKH scriptPubKey to buffer
   * let scriptPubKey = [
   * 118,
   * 169,
   * Buffer.from('24e9c07804d0ee7e5bda934e0a3ae8710fc007dd', 'hex'),
   * 136,
   * 172
   * ];
   * bchjs.Script.encode(scriptPubKey);
   * // <Buffer 76 a9 14 24 e9 c0 78 04 d0 ee 7e 5b da 93 4e 0a 3a e8 71 0f c0 07 dd 88 ac>
   */
  encode (scriptChunks) {
    const arr = []
    scriptChunks.forEach(chunk => {
      arr.push(chunk)
    })
    return Bitcoin.script.compile(arr)
  }

  /**
   * @api Script.encode2() encode2()
   * @apiName encode2
   * @apiGroup Script
   * @apiDescription
   * Encode a Script buffer without minimal push data. This should be used if
   * encode() does not produce the desired results. This should be used for compiling
   * SLP OP_RETURNs.
   *
   * @apiExample Example usage:
   * // encode P2PKH scriptSig to buffer
   * let scriptSig = [
   * Buffer.from('3045022100877e2f9c28421f0a850cc8ff66ba1d0f6c8dbe9e63e199c2c2600c9c15bf9d4402204d35b13d3cc202aa25722b2b1791442ebc5c39d898b609515260ad08f0e766a601', 'hex'),
   * Buffer.from('02fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb', 'hex')
   * ]
   * bchjs.Script.encode2(scriptSig);
   * // <Buffer 48 30 45 02 21 00 87 7e 2f 9c 28 42 1f 0a 85 0c c8 ff 66 ba 1d 0f 6c 8d be 9e 63 e1 99 c2 c2 60 0c 9c 15 bf 9d 44 02 20 4d 35 b1 3d 3c c2 02 aa 25 72 ... >
   *
   * // encode P2PKH scriptPubKey to buffer
   * let scriptPubKey = [
   * 118,
   * 169,
   * Buffer.from('24e9c07804d0ee7e5bda934e0a3ae8710fc007dd', 'hex'),
   * 136,
   * 172
   * ];
   * bchjs.Script.encode2(scriptPubKey);
   * // <Buffer 76 a9 14 24 e9 c0 78 04 d0 ee 7e 5b da 93 4e 0a 3a e8 71 0f c0 07 dd 88 ac>
   */
  encode2 (scriptChunks) {
    const arr = []
    scriptChunks.forEach(chunk => {
      arr.push(chunk)
    })
    return Bitcoin.script.compile2(arr)
  }

  /**
   * @api Script.toASM() toASM()
   * @apiName toASM
   * @apiGroup Script
   * @apiDescription
   * Script buffer to ASM.
   *
   * @apiExample Example usage:
   * // P2PKH scriptSig
   * let scriptSigBuffer = Buffer.from('483045022100877e2f9c28421f0a850cc8ff66ba1d0f6c8dbe9e63e199c2c2600c9c15bf9d4402204d35b13d3cc202aa25722b2b1791442ebc5c39d898b609515260ad08f0e766a6012102fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb', 'hex');
   * bchjs.Script.toASM(scriptSigBuffer);
   * // 3045022100877e2f9c28421f0a850cc8ff66ba1d0f6c8dbe9e63e199c2c2600c9c15bf9d4402204d35b13d3cc202aa25722b2b1791442ebc5c39d898b609515260ad08f0e766a601 02fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb
   *
   * // P2PKH scriptPubKey
   * let scriptBuffer = Buffer.from("76a914bee4182d9fbc8931a728410a0cd3e0f340f2995a88ac", 'hex');
   * bchjs.Script.toASM(scriptBuffer);
   * // OP_DUP OP_HASH160 bee4182d9fbc8931a728410a0cd3e0f340f2995a OP_EQUALVERIFY OP_CHECKSIG
   */
  toASM (buffer) {
    return Bitcoin.script.toASM(buffer)
  }

  /**
   * @api Script.fromASM() fromASM()
   * @apiName fromASM
   * @apiGroup Script
   * @apiDescription
   * Script ASM to buffer.
   *
   * @apiExample Example usage:
   * // P2PKH scriptSig
   * let scriptSigASM = "3045022100877e2f9c28421f0a850cc8ff66ba1d0f6c8dbe9e63e199c2c2600c9c15bf9d4402204d35b13d3cc202aa25722b2b1791442ebc5c39d898b609515260ad08f0e766a601 02fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb";
   * bchjs.Script.fromASM(scriptSigASM);
   * // <Buffer 48 30 45 02 21 00 87 7e 2f 9c 28 42 1f 0a 85 0c c8 ff 66 ba 1d 0f 6c 8d be 9e 63 e1 99 c2 c2 60 0c 9c 15 bf 9d 44 02 20 4d 35 b1 3d 3c c2 02 aa 25 72 ... >
   *
   * // P2PKH scriptPubKey
   * let scriptPubKeyASM = "OP_DUP OP_HASH160 bee4182d9fbc8931a728410a0cd3e0f340f2995a OP_EQUALVERIFY OP_CHECKSIG";
   * bchjs.Script.fromASM(scriptPubKeyASM);
   * // <Buffer 76 a9 14 be e4 18 2d 9f bc 89 31 a7 28 41 0a 0c d3 e0 f3 40 f2 99 5a 88 ac>
   */
  fromASM (asm) {
    return Bitcoin.script.fromASM(asm)
  }
}

module.exports = Script

```

`/home/trout/work/psf/code/bch-js/src/slp/ecpair.js`:

```js
// const BCHJS = require("../bch-js")
// const bchjs = new BCHJS()

const BCHJSECPair = require('../ecpair')

const bchaddrjs = require('bchaddrjs-slp')

class ECPair extends BCHJSECPair {
  /*
  constructor(restURL) {
    super(restURL)
    this.restURL = restURL
  }
  */
  /**
   * @api SLP.ECPair.toSLPAddress() toSLPAddress()
   * @apiName toSLPAddress
   * @apiGroup SLP
   * @apiDescription Get slp address of ECPair.
   *
   * @apiExample Example usage:
   *  // create ecpair from wif
   *  let ecpair = bchjs.SLP.ECPair.fromWIF('cUCSrdhu7mCzx4sWqL6irqzprkofxPmLHYgkSnG2WaWVqJDXtWRS')
   *  // to slp address
   *  bchjs.SLP.ECPair.toSLPAddress(ecpair);
   *  // slptest:qq835u5srlcqwrtwt6xm4efwan30fxg9hcqag6fk03
   */
  static toSLPAddress (ecpair) {
    const slpAddress = bchaddrjs.toSlpAddress(this.toCashAddress(ecpair))
    return slpAddress
  }
}

module.exports = ECPair

```

`/home/trout/work/psf/code/bch-js/src/slp/tokentype1.js`:

```js
/*
  This library handles the OP_RETURN of SLP TokenType1 transactions.
*/

// const BCHJS = require("../bch-js")
// const bchjs = new BCHJS()

const Address = require('./address')
const Script = require('../script')

const BigNumber = require('bignumber.js')
const slpMdm = require('slp-mdm')
const axios = require('axios')

// const addy = new Address()
let addy
const TransactionBuilder = require('../transaction-builder')

let _this // local global

class TokenType1 {
  constructor (config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.authToken = config.authToken

    if (this.authToken) {
      // Add Basic Authentication token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: this.authToken
        }
      }
    } else {
      // Add JWT token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: `Token ${this.apiToken}`
        }
      }
    }

    addy = new Address(config)
    this.Script = new Script()

    this.axios = axios

    // Instantiate the transaction builder.
    TransactionBuilder.setAddress(addy)

    _this = this
  }

  /**
   * @api SLP.TokenType1.generateSendOpReturn() generateSendOpReturn()
   * @apiName generateSendOpReturn
   * @apiGroup SLP TokenType1
   * @apiDescription Generate the OP_RETURN value needed to create an SLP Send transaction.
   * It's assumed all elements in the tokenUtxos array belong to the same token.
   *
   * Returns a Buffer representing a transaction output, ready to be added to
   * the Transaction Builder.
   *
   * @apiExample Example usage:
   *
   *  const addr = "bitcoincash:qq6xz6wwcy78uh79vgjvfyahj4arq269w5an8pcjak"
   *  const utxos = await bchjs.Blockbook.utxos(addr)
   *
   *  // Identify the SLP token UTXOs.
   *  let tokenUtxos = await bchjs.SLP.Utils.tokenUtxoDetails(utxos);
   *
   *  // Filter out the token UTXOs that match the user-provided token ID.
   *  tokenUtxos = tokenUtxos.filter((utxo, index) => {
   *    if (
   *      utxo && // UTXO is associated with a token.
   *      utxo.tokenId === TOKENID && // UTXO matches the token ID.
   *      utxo.tokenType === "token" // UTXO is not a minting baton.
   *    )
   *    return true;
   *  });
   *
   *  // Generate the SEND OP_RETURN
   *  const slpData = bchjs.SLP.TokenType1.generateSendOpReturn(
   *    tokenUtxos,
   *    TOKENQTY
   *  );
   *
   *  ...
   *  // Add OP_RETURN as first output.
   *  transactionBuilder.addOutput(slpData, 0);
   *
   *  // See additional code here:
   *  // https://github.com/Permissionless-Software-Foundation/bch-js-examples/blob/master/applications/slp/send-token/send-token.js
   */
  generateSendOpReturn (tokenUtxos, sendQty) {
    try {
      const tokenId = tokenUtxos[0].tokenId
      const decimals = tokenUtxos[0].decimals

      const sendQtyBig = new BigNumber(sendQty).times(10 ** decimals)

      // Calculate the total amount of tokens owned by the wallet.
      const totalTokens = tokenUtxos.reduce(
        (tot, txo) =>
          tot.plus(new BigNumber(txo.tokenQty).times(10 ** decimals)),
        new BigNumber(0)
      )

      const change = totalTokens.minus(sendQtyBig)
      // console.log(`change: ${change}`)

      let script
      let outputs = 1

      // The normal case, when there is token change to return to sender.
      if (change > 0) {
        outputs = 2

        // Convert the send quantity to the format expected by slp-mdm.
        const baseQty = sendQtyBig.toString()
        // console.log('baseQty: ', baseQty)

        // Convert the change quantity to the format expected by slp-mdm.
        const baseChange = change.toString()
        // console.log('baseChange: ', baseChange)

        // Check for potential burns
        const outputQty = new BigNumber(baseChange).plus(new BigNumber(baseQty))
        const inputQty = new BigNumber(totalTokens)
        const tokenOutputDelta = outputQty.minus(inputQty).toString() !== '0'
        if (tokenOutputDelta) {
          throw new Error(
            'Token transaction inputs do not match outputs, cannot send transaction'
          )
        }

        // Generate the OP_RETURN as a Buffer.
        script = slpMdm.TokenType1.send(tokenId, [
          new slpMdm.BN(baseQty),
          new slpMdm.BN(baseChange)
        ])
        //

        // Corner case, when there is no token change to send back.
      } else {
        const baseQty = sendQtyBig.toString()
        // console.log(`baseQty: `, baseQty)

        // Check for potential burns
        const noChangeOutputQty = new BigNumber(baseQty)
        const noChangeInputQty = new BigNumber(totalTokens)
        const tokenSingleOutputError =
          noChangeOutputQty.minus(noChangeInputQty).toString() !== '0'
        if (tokenSingleOutputError) {
          throw new Error(
            'Token transaction inputs do not match outputs, cannot send transaction'
          )
        }

        // Generate the OP_RETURN as a Buffer.
        script = slpMdm.TokenType1.send(tokenId, [new slpMdm.BN(baseQty)])
      }

      return { script, outputs }
    } catch (err) {
      console.log('Error in generateSendOpReturn()')
      throw err
    }
  }

  /**
   * @api SLP.TokenType1.generateBurnOpReturn() generateBurnOpReturn()
   * @apiName generateBurnOpReturn
   * @apiGroup SLP TokenType1
   * @apiDescription Generate the OP_RETURN value needed to create a SLP Send
   * transaction that burns tokens.
   * This is a slight variation of generateSendOpReturn(). It generates a SLP
   * SEND transaction designed to burn a select quantity of tokens.
   *
   * It's assumed all elements in the tokenUtxos array belong to the same token.
   *
   * Returns a Buffer representing a transaction output, ready to be added to
   * the Transaction Builder.
   *
   * @apiExample Example usage:
   *
   *  const addr = "bitcoincash:qq6xz6wwcy78uh79vgjvfyahj4arq269w5an8pcjak"
   *  const utxos = await bchjs.Blockbook.utxos(addr)
   *
   *  // Identify the SLP token UTXOs.
   *  let tokenUtxos = await bchjs.SLP.Utils.tokenUtxoDetails(utxos);
   *
   *  // Filter out the token UTXOs that match the user-provided token ID.
   *  tokenUtxos = tokenUtxos.filter((utxo, index) => {
   *    if (
   *      utxo && // UTXO is associated with a token.
   *      utxo.tokenId === TOKENID && // UTXO matches the token ID.
   *      utxo.tokenType === "token" // UTXO is not a minting baton.
   *    )
   *    return true;
   *  });
   *
   *  // Generate the SEND OP_RETURN
   *  const slpData = bchjs.SLP.TokenType1.generateBurnOpReturn(
   *    tokenUtxos,
   *    10 // Burn 10 tokens
   *  );
   *
   *  ...
   *  // Add OP_RETURN as first output.
   *  transactionBuilder.addOutput(slpData, 0);
   *
   *  // See additional code here:
   *  // https://github.com/Permissionless-Software-Foundation/bch-js-examples/blob/master/applications/slp/burn-tokens/burn-tokens.js
   *
   */
  generateBurnOpReturn (tokenUtxos, burnQty) {
    try {
      const tokenId = tokenUtxos[0].tokenId
      const decimals = tokenUtxos[0].decimals

      // Calculate the total amount of tokens owned by the wallet.
      let totalTokens = 0
      for (let i = 0; i < tokenUtxos.length; i++) {
        totalTokens += parseFloat(tokenUtxos[i].tokenQty)
      }

      // Make sure burn quantity isn't bigger than the total amount in tokens
      if (burnQty > totalTokens) {
        burnQty = totalTokens
      }

      const remainder = totalTokens - burnQty

      let baseQty = new BigNumber(remainder).times(10 ** decimals)
      baseQty = baseQty.absoluteValue()
      baseQty = Math.floor(baseQty)
      baseQty = baseQty.toString()

      // console.log(`baseQty: ${baseQty.toString()}`)

      // Generate the OP_RETURN as a Buffer.
      const script = slpMdm.TokenType1.send(tokenId, [new slpMdm.BN(baseQty)])

      return script
    } catch (err) {
      console.log('Error in generateBurnOpReturn()')
      throw err
    }
  }

  /**
   * @api SLP.TokenType1.generateGenesisOpReturn() generateGenesisOpReturn()
   * @apiName generateGenesisOpReturn
   * @apiGroup SLP TokenType1
   * @apiDescription Generate the OP_RETURN value needed to create a new SLP token class.
   *
   * Expects a config object as input, see the example for properties.:
   *
   * Returns a Buffer representing a transaction output, ready to be added to
   * the Transaction Builder.
   *
   * @apiExample Example usage:
   *
   *   const configObj = {
   *     name: "SLP Test Token",
   *     ticker: "SLPTEST",
   *     documentUrl: "https://FullStack.cash",
   *     documentHash: "",
   *     decimals: 8,
   *     initialQty: 10
   *   }
   *
   *   const result = await bchjs.SLP.TokenType1.generateGenesisOpReturn(
   *     configObj
   *   )
   *
   *  ...
   *  // Add OP_RETURN as first output.
   *  transactionBuilder.addOutput(slpData, 0);
   *
   *  // See additional code here:
   *  // https://github.com/Permissionless-Software-Foundation/bch-js-examples/blob/master/applications/slp/create-token/create-token.js
   *
   */
  generateGenesisOpReturn (configObj) {
    try {
      // TODO: Add input validation.

      let baseQty
      if (configObj.decimals !== 0) {
        baseQty = new BigNumber(configObj.initialQty).times(
          10 ** configObj.decimals
        )
      } else {
        baseQty = new BigNumber(configObj.initialQty)
      }

      baseQty = baseQty.absoluteValue()
      baseQty = Math.floor(baseQty)
      baseQty = baseQty.toString()

      // Prevent error if user fails to add the document hash.
      if (!configObj.documentHash) configObj.documentHash = ''

      // If mint baton is not specified, then replace it with null.
      if (!configObj.mintBatonVout) configObj.mintBatonVout = null

      const script = slpMdm.TokenType1.genesis(
        configObj.ticker,
        configObj.name,
        configObj.documentUrl,
        configObj.documentHash,
        configObj.decimals,
        configObj.mintBatonVout,
        new slpMdm.BN(baseQty)
      )

      return script
    } catch (err) {
      console.log('Error in generateGenesisOpReturn()')
      throw err
    }
  }

  // Expects tokenUtxos to be an array of UTXOs. Must contain a UTXO with the
  // minting baton.
  // mintQty is the number of new coins to mint.
  // destroyBaton is an option Boolean. If true, will destroy the baton. By
  // default it is false and will pass the baton.
  /**
   * @api SLP.TokenType1.generateMintOpReturn() generateMintOpReturn()
   * @apiName generateMintOpReturn
   * @apiGroup SLP TokenType1
   * @apiDescription Generate the OP_RETURN value needed to create an SLP Mint transaction.
   * It's assumed all elements in the tokenUtxos array belong to the same token.
   *
   * Returns a Buffer representing a transaction output, ready to be added to
   * the Transaction Builder.
   *
   * @apiExample Example usage:
   *
   *  const addr = "bitcoincash:qq6xz6wwcy78uh79vgjvfyahj4arq269w5an8pcjak"
   *  const utxos = await bchjs.Blockbook.utxos(addr)
   *
   *  // Identify the SLP token UTXOs.
   *  let tokenUtxos = await bchjs.SLP.Utils.tokenUtxoDetails(utxos);
   *
   *  // Filter out the minting baton.
   *  tokenUtxos = tokenUtxos.filter((utxo, index) => {
   *    if (
   *      utxo && // UTXO is associated with a token.
   *      utxo.tokenId === TOKENID && // UTXO matches the token ID.
   *      utxo.utxoType === "minting-baton" // UTXO is not a minting baton.
   *    )
   *    return true;
   *  });
   *
   *  // Generate the SLP OP_RETURN
   *  const slpData = bchjs.SLP.TokenType1.generateMintOpReturn(
   *    tokenUtxos,
   *    100 // Mint 100 new tokens.
   *  );
   *
   *  ...
   *  // Add OP_RETURN as first output.
   *  transactionBuilder.addOutput(slpData, 0);
   *
   *  // See additional code here:
   *  // https://github.com/Permissionless-Software-Foundation/bch-js-examples/blob/master/applications/slp/mint-token/mint-token.js
   */
  generateMintOpReturn (tokenUtxos, mintQty, destroyBaton = false) {
    try {
      // Throw error if input is not an array.
      if (!Array.isArray(tokenUtxos)) {
        throw new Error('tokenUtxos must be an array.')
      }
      if (!mintQty) {
        throw new Error('mintQty must be a positive number.')
      }

      // Loop through the tokenUtxos array and find the minting baton.
      let mintBatonUtxo
      for (let i = 0; i < tokenUtxos.length; i++) {
        if (tokenUtxos[i].utxoType === 'minting-baton' || tokenUtxos[i].type === 'baton') {
          mintBatonUtxo = tokenUtxos[i]
        }
      }

      // Throw an error if the minting baton could not be found.
      if (!mintBatonUtxo) {
        throw new Error('Minting baton could not be found in tokenUtxos array.')
      }

      const tokenId = mintBatonUtxo.tokenId
      const decimals = mintBatonUtxo.decimals

      if (!tokenId) {
        throw new Error('tokenId property not found in mint-baton UTXO.')
      }
      if (!decimals && decimals !== 0) {
        throw new Error('decimals property not found in mint-baton UTXO.')
      }

      let baseQty = new BigNumber(mintQty).times(10 ** decimals)
      baseQty = baseQty.absoluteValue()
      baseQty = Math.floor(baseQty)
      baseQty = baseQty.toString()

      if (isNaN(baseQty)) throw new Error('baseQty is non a number!')

      // Signal that the baton should be passed or detroyed.
      let batonVout = 2
      if (destroyBaton) batonVout = null

      const script = slpMdm.TokenType1.mint(
        tokenId,
        batonVout,
        new slpMdm.BN(baseQty)
      )

      return script
    } catch (err) {
      console.log('Error in generateMintOpReturn()')
      throw err
    }
  }

  /**
   * @api SLP.TokenType1.getHexOpReturn() getHexOpReturn()
   * @apiName getHexOpReturn
   * @apiGroup SLP TokenType1
   * @apiDescription Get hex representation of an SLP OP_RETURN
   * This command returns a hex encoded OP_RETURN for SLP Send (Token Type 1)
   * transactions. Rather than computing it directly, it calls bch-api to do
   * the heavy lifting. This is easier and lighter weight for web apps.
   *
   * @apiExample Example usage:
   *
   *  const tokenUtxos = [{
   *   tokenId: "0a321bff9761f28e06a268b14711274bb77617410a16807bd0437ef234a072b1",
   *   decimals: 0,
   *   tokenQty: 2
   *  }]
   *
   *  const sendQty = 1.5
   *
   *  const result = await bchjs.SLP.TokenType1.getHexOpReturn(tokenUtxos, sendQty)
   *
   *  // result:
   *  {
   *    "script": "6a04534c500001010453454e44200a321bff9761f28e06a268b14711274bb77617410a16807bd0437ef234a072b1080000000000000001080000000000000000",
   *    "outputs": 2
   *  }
   */
  async getHexOpReturn (tokenUtxos, sendQty) {
    try {
      // TODO: Add input filtering.

      const data = {
        tokenUtxos,
        sendQty
      }

      const result = await _this.axios.post(
        `${this.restURL}slp/generatesendopreturn`,
        data,
        this.axiosOptions
      )

      const slpSendObj = result.data

      // const script = _this.Buffer.from(slpSendObj.script)
      //
      // slpSendObj.script = script
      // return slpSendObj

      return slpSendObj
    } catch (err) {
      console.log('Error in getHexOpReturn()')
      throw err
    }
  }
}

module.exports = TokenType1

```

`/home/trout/work/psf/code/bch-js/src/slp/slp.js`:

```js
/*
  This is the parent library for the SLP class. It was originally forked from slp-sdk.

  TODO: Create an SLP fee calculator like slpjs:
  https://github.com/simpleledger/slpjs/blob/master/lib/slp.ts#L921
*/

// imports
// require deps
// const BCHJS = require("../bch-js")
const Address = require('./address')
const ECPair = require('./ecpair')
// const HDNode = require("./hdnode")
const TokenType1 = require('./tokentype1')
const NFT1 = require('./nft1')
const Utils = require('./utils')

// SLP is a superset of BITBOX
class SLP {
  constructor (config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.authToken = config.authToken

    if (this.authToken) {
      // Add Basic Authentication token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: this.authToken
        }
      }
    } else {
      // Add JWT token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: `Token ${this.apiToken}`
        }
      }
    }

    this.Address = new Address(config)
    this.ECPair = ECPair
    this.TokenType1 = new TokenType1(config)
    this.NFT1 = new NFT1(config)
    this.Utils = new Utils(config)
  }
}

module.exports = SLP

```

`/home/trout/work/psf/code/bch-js/src/slp/address.js`:

```js
const BCHJSAddress = require('../address')
// const bchAddress = new BCHJSAddress()
let bchAddress

const bchaddrjs = require('bchaddrjs-slp')

class Address extends BCHJSAddress {
  constructor (config) {
    super(config)

    this.restURL = config.restURL

    bchAddress = new BCHJSAddress(config)
  }

  /**
   * @api SLP.Address.toSLPAddress() toSLPAddress()
   * @apiName toSLPAddress
   * @apiGroup SLP
   * @apiDescription Converting legacy or cashaddr to slpAddress format.
   *
   * @apiExample Example usage:
   *  // mainnet legacy
   *  bchjs.SLP.Address.toSLPAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN')
   *  // simpleledger:qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzd
   *
   *  // mainnet legacy return no prefix
   *  bchjs.SLP.Address.toSLPAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN', false)
   *  // qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl
   *
   *  // mainnet cashaddr
   *  bchjs.SLP.Address.toSLPAddress('bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
   *  // simpleledger:qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzdp
   *
   *  // mainnet slpaddr no prefix
   *  bchjs.SLP.Address.toSLPAddress('qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
   *  // simpleledger:qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzdp
   *
   *  // testnet legacy
   *  bchjs.SLP.Address.toSLPAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx')
   *  // slptest:qzq9je6pntpva3wf6scr7mlnycr54sjgeqauyclpwv
   *
   *  // testnet legacy return no prefix
   *  bchjs.SLP.Address.toSLPAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx', false)
   *  // qzq9je6pntpva3wf6scr7mlnycr54sjgeqauyclpwv
   *
   *  // tesnet cashaddr
   *  bchjs.SLP.Address.toSLPAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx')
   *  // slptest:qzq9je6pntpva3wf6scr7mlnycr54sjgeqauyclpwv
   *
   *  // testnet cashaddr no prefix
   *  bchjs.SLP.Address.toSLPAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx', false)
   *  // qzq9je6pntpva3wf6scr7mlnycr54sjgeqauyclpwv
   */
  toSLPAddress (address, prefix = true, regtest = false) {
    this._ensureValidAddress(address)
    const slpAddress = bchaddrjs.toSlpAddress(address)
    if (prefix) return slpAddress
    return slpAddress.split(':')[1]
  }

  /**
   * @api SLP.Address.toCashAddress() toCashAddress()
   * @apiName toCashAddress
   * @apiGroup SLP
   * @apiDescription Converting legacy or slpaddr to cashAddress format.
   *
   * @apiExample Example usage:
   *  // mainnet legacy
   *  bchjs.SLP.Address.toCashAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN')
   *  // bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl
   *
   *  // mainnet legacy return no prefix
   *  bchjs.SLP.Address.toCashAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN', false)
   *  // qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl
   *
   *  // mainnet slpaddr
   *  bchjs.SLP.Address.toCashAddress('simpleledger:qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzdp')
   *  // bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl
   *
   *  // mainnet slpaddr no prefix
   *  bchjs.SLP.Address.toCashAddress('qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzdp')
   *  // qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl
   *
   *  // tesnet legacy
   *  bchjs.SLP.Address.toCashAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx')
   *  // bchtest:qzq9je6pntpva3wf6scr7mlnycr54sjgeqxgrr9ku3
   *
   *  // testnet legacy return no prefix
   *  bchjs.SLP.Address.toCashAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx', false)
   *  // qzq9je6pntpva3wf6scr7mlnycr54sjgeqxgrr9ku3
   *
   *  // tesnet cashaddr
   *  bchjs.SLP.Address.toCashAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx')
   *  // bchtest:qzq9je6pntpva3wf6scr7mlnycr54sjgeqxgrr9ku3
   *
   *  // testnet cashaddr no prefix
   *  bchjs.SLP.Address.toCashAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx', false)
   *  // qzq9je6pntpva3wf6scr7mlnycr54sjgeqxgrr9ku3
   */
  toCashAddress (address, prefix = true, regtest = false) {
    this._ensureValidAddress(address)
    const cashAddress = bchaddrjs.toCashAddress(address)
    if (prefix) return cashAddress
    return cashAddress.split(':')[1]
  }

  /**
   * @api SLP.Address.toLegacyAddress() toLegacyAddress()
   * @apiName toLegacyAddress
   * @apiGroup SLP
   * @apiDescription Converting cashaddr or slpaddr to legacy address format.
   *
   * @apiExample Example usage:
   *
   *  // mainnet cashaddr w/ prefix
   *  bchjs.SLP.Address.toLegacyAddress('bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
   *  // 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN
   *
   *  // mainnet cashaddr w/ no prefix
   *  bchjs.SLP.Address.toLegacyAddress('qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
   *  // 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN
   *
   *  // mainnet slpaddr w/ prefix
   *  bchjs.SLP.Address.toLegacyAddress('simpleledger:qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzdp')
   *  // 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN
   *
   *  // mainnet slpaddr w/ no prefix
   *  bchjs.SLP.Address.toLegacyAddress('qzm47qz5ue99y9yl4aca7jnz7dwgdenl857dzayzdp')
   *  // 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN
   *
   *  // testnet cashaddr w/ prefix
   *  bchjs.SLP.Address.toLegacyAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // mqc1tmwY2368LLGktnePzEyPAsgADxbksi
   *
   *  // testnet cashaddr w/ no prefix
   *  bchjs.SLP.Address.toLegacyAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // mqc1tmwY2368LLGktnePzEyPAsgADxbksi
   *
   *  // testnet slpaddr w/ prefix
   *  bchjs.SLP.Address.toLegacyAddress('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // mqc1tmwY2368LLGktnePzEyPAsgADxbksi
   *
   *  // testnet slpaddr w/ no prefix
   *  bchjs.SLP.Address.toLegacyAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // mqc1tmwY2368LLGktnePzEyPAsgADxbksi
   */
  toLegacyAddress (address) {
    this._ensureValidAddress(address)
    const cashAddr = bchaddrjs.toCashAddress(address)
    return bchAddress.toLegacyAddress(cashAddr)
  }

  isLegacyAddress (address) {
    this._ensureValidAddress(address)
    return bchAddress.isLegacyAddress(address)
  }

  isCashAddress (address) {
    this._ensureValidAddress(address)
    if (bchaddrjs.isSlpAddress(address)) return false

    return bchAddress.isCashAddress(address)
  }

  /**
   * @api SLP.Address.isSLPAddress() isSLPAddress()
   * @apiName isSLPAddress
   * @apiGroup SLP
   * @apiDescription Detect if slpAddr encoded address.
   *
   * @apiExample Example usage:
   *
   *  // mainnet slpaddr
   *  bchjs.SLP.Address.isSLPAddress('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // true
   *
   *  // mainnet w/ no slpaddr prefix
   *  bchjs.SLP.Address.isSLPAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // true
   *
   *  // mainnet legacy
   *  bchjs.SLP.Address.isSLPAddress('18HEMuar5ZhXDFep1gEiY1eoPPcBLxfDxj')
   *  // false
   *
   *  // testnet w/ slpaddr prefix
   *  bchjs.SLP.Address.isSLPAddress('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // true
   *
   *  // testnet w/ no slpaddr prefix
   *  bchjs.SLP.Address.isSLPAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // true
   *
   *  // testnet legacy
   *  bchjs.SLP.Address.isSLPAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   *  // false
   */
  isSLPAddress (address) {
    this._ensureValidAddress(address)
    return bchaddrjs.isSlpAddress(address)
  }

  /**
   * @api SLP.Address.isMainnetAddress() isMainnetAddress()
   * @apiName isMainnetAddress
   * @apiGroup SLP
   * @apiDescription Detect if mainnet address.
   *
   * @apiExample Example usage:
   *
   *  // mainnet cashaddr
   *  bchjs.SLP.Address.isMainnetAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // true
   *
   *  // mainnet cashaddr w/ no prefix
   *  bchjs.SLP.Address.isMainnetAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // true
   *
   *  // mainnet slpaddr
   *  bchjs.SLP.Address.isMainnetAddress('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // true
   *
   *  // mainnet slpaddr w/ no prefix
   *  bchjs.SLP.Address.isMainnetAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // true
   *
   *  // mainnet legacy
   *  bchjs.SLP.Address.isMainnetAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
   *  // true
   *
   *  // testnet cashaddr
   *  bchjs.SLP.Address.isMainnetAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // false
   *
   *  // testnet w/ no cashaddr prefix
   *  bchjs.SLP.Address.isMainnetAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // false
   *
   *  // testnet slpaddr
   *  bchjs.SLP.Address.isMainnetAddress('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // false
   *
   *  // testnet w/ no slpaddr prefix
   *  bchjs.SLP.Address.isMainnetAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // false
   *
   *  // testnet legacy
   *  bchjs.SLP.Address.isMainnetAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   *  // false
   */
  isMainnetAddress (address) {
    this._ensureValidAddress(address)
    const cashaddr = bchaddrjs.toCashAddress(address)
    return bchAddress.isMainnetAddress(cashaddr)
  }

  /**
   * @api SLP.Address.isTestnetAddress() isTestnetAddress()
   * @apiName isTestnetAddress
   * @apiGroup SLP
   * @apiDescription Detect if testnet address.
   *
   * @apiExample Example usage:
   *  // cashaddr mainnet
   *  bchjs.SLP.Address.isTestnetAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  //false
   *
   *  // w/ no cashaddr prefix
   *  bchjs.SLP.Address.isTestnetAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // false
   *
   *  // slpaddr mainnet
   *  bchjs.SLP.Address.isTestnetAddress('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  //false
   *
   *  // w/ no slpaddr prefix
   *  bchjs.SLP.Address.isTestnetAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // false
   *
   *  // legacy mainnet
   *  bchjs.SLP.Address.isTestnetAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
   *  // false
   *
   *  // cashaddr testnet
   *  bchjs.SLP.Address.isTestnetAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // true
   *
   *  // testnet w/ no cashaddr prefix
   *  bchjs.SLP.Address.isTestnetAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // true
   *
   *  // slpaddr testnet
   *  bchjs.SLP.Address.isTestnetAddress('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // true
   *
   *  // testnet w/ no slpaddr prefix
   *  bchjs.SLP.Address.isTestnetAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // true
   *
   *  // testnet legacy
   *  bchjs.SLP.Address.isTestnetAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   *  // true
   */
  isTestnetAddress (address) {
    this._ensureValidAddress(address)
    const cashAddr = bchaddrjs.toCashAddress(address)
    return bchAddress.isTestnetAddress(cashAddr)
  }

  /**
   * @api SLP.Address.isP2PKHAddress() isP2PKHAddress()
   * @apiName isP2PKHAddress
   * @apiGroup SLP
   * @apiDescription Detect if p2pkh address.
   *
   * @apiExample Example usage:
   *  // mainnet cashaddr
   *  bchjs.SLP.Address.isP2PKHAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // true
   *
   *  // mainnet w/ no cashaddr prefix
   *  bchjs.SLP.Address.isP2PKHAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // true
   *
   *  // mainnet slpaddr
   *  bchjs.SLP.Address.isP2PKHAddress('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // true
   *
   *  // mainnet w/ no slpaddr prefix
   *  bchjs.SLP.Address.isP2PKHAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // true
   *
   *  // legacy
   *  bchjs.SLP.Address.isP2PKHAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
   *  // true
   *
   *  // cashaddr testnet
   *  bchjs.SLP.Address.isP2PKHAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // true
   *
   *  // testnet w/ no cashaddr prefix
   *  bchjs.SLP.Address.isP2PKHAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // true
   *
   *  // slpaddr testnet
   *  bchjs.SLP.Address.isP2PKHAddress('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // true
   *
   *  // testnet w/ no slpaddr prefix
   *  bchjs.SLP.Address.isP2PKHAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // true
   *
   *  // legacy testnet
   *  bchjs.SLP.Address.isP2PKHAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   *  // true
   */
  isP2PKHAddress (address) {
    this._ensureValidAddress(address)
    const cashAddr = bchaddrjs.toCashAddress(address)
    return bchAddress.isP2PKHAddress(cashAddr)
  }

  /**
   * @api SLP.Address.isP2SHAddress() isP2SHAddress()
   * @apiName isP2SHAddress
   * @apiGroup SLP
   * @apiDescription Detect if p2sh address.
   *
   * @apiExample Example usage:
   *  // mainnet cashaddr
   *  bchjs.SLP.Address.isP2SHAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // false
   *
   *  // mainnet cashaddr w/ no prefix
   *  bchjs.SLP.Address.isP2SHAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // false
   *
   *  // mainnet slpaddr
   *  bchjs.SLP.Address.isP2SHAddress('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // false
   *
   *  // mainnet slpaddr w/ no prefix
   *  bchjs.SLP.Address.isP2SHAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // false
   *
   *  // mainnet legacy
   *  bchjs.SLP.Address.isP2SHAddress('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74')
   *  // false
   *
   *  // cashaddr testnet
   *  bchjs.SLP.Address.isP2SHAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // false
   *
   *  // cashaddr testnet w/ no prefix
   *  bchjs.SLP.Address.isP2SHAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // false
   *
   *  // slpaddr testnet
   *  bchjs.SLP.Address.isP2SHAddress('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // false
   *
   *  // slpaddr testnet w/ no prefix
   *  bchjs.SLP.Address.isP2SHAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // false
   *
   *  // legacy testnet
   *  bchjs.SLP.Address.isP2SHAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   *  // false
   */
  isP2SHAddress (address) {
    this._ensureValidAddress(address)
    const cashAddr = bchaddrjs.toCashAddress(address)
    return bchAddress.isP2SHAddress(cashAddr)
  }

  /**
   * @api SLP.Address.detectAddressFormat() detectAddressFormat()
   * @apiName detectAddressFormat
   * @apiGroup SLP
   * @apiDescription Detect address format.
   *
   * @apiExample Example usage:
   *  // mainnet cashaddr
   *  bchjs.SLP.Address.detectAddressFormat('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // cashaddr
   *
   *  // mainnet cashaddr w/ no prefix
   *  bchjs.SLP.Address.detectAddressFormat('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // cashaddr
   *
   *  // mainnet slpaddr
   *  bchjs.SLP.Address.detectAddressFormat('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // slpaddr
   *
   *  // mainnet slpaddr w/ no prefix
   *  bchjs.SLP.Address.detectAddressFormat('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // slpaddr
   *
   *  // mainnet legacy
   *  bchjs.SLP.Address.detectAddressFormat('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74')
   *  // legacy
   *
   *  // cashaddr testnet
   *  bchjs.SLP.Address.detectAddressFormat('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // cashaddr
   *
   *  // cashaddr testnet w/ no prefix
   *  bchjs.SLP.Address.detectAddressFormat('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // cashaddr
   *
   *  // slpaddr testnet
   *  bchjs.SLP.Address.detectAddressFormat('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // slpaddr
   *
   *  // slpaddr testnet w/ no prefix
   *  bchjs.SLP.Address.detectAddressFormat('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // slpaddr
   *
   *  // legacy testnet
   *  bchjs.SLP.Address.detectAddressFormat('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   *  // legacy
   */
  detectAddressFormat (address) {
    this._ensureValidAddress(address)
    if (bchaddrjs.isSlpAddress(address)) return 'slpaddr'

    return bchAddress.detectAddressFormat(address)
  }

  /**
   * @api SLP.Address.detectAddressNetwork() detectAddressNetwork()
   * @apiName detectAddressNetwork
   * @apiGroup SLP
   * @apiDescription Detect address network.
   *
   * @apiExample Example usage:
   *  // mainnet cashaddr
   *  bchjs.SLP.Address.detectAddressNetwork('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // mainnet
   *
   *  // mainnet cashaddr w/ no prefix
   *  bchjs.SLP.Address.detectAddressNetwork('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
   *  // mainnet
   *
   *  // mainnet slpaddr
   *  bchjs.SLP.Address.detectAddressNetwork('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // mainnet
   *
   *  // mainnet slpaddr w/ no prefix
   *  bchjs.SLP.Address.detectAddressNetwork('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w')
   *  // mainnet
   *
   *  // mainnet legacy
   *  bchjs.SLP.Address.detectAddressNetwork('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74')
   *  // mainnet
   *
   *  // cashaddr testnet
   *  bchjs.SLP.Address.detectAddressNetwork('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // testnet
   *
   *  // cashaddr testnet w/ no prefix
   *  bchjs.SLP.Address.detectAddressNetwork('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
   *  // testnet
   *
   *  // slpaddr testnet
   *  bchjs.SLP.Address.detectAddressNetwork('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // testnet
   *
   *  // slpaddr testnet w/ no prefix
   *  bchjs.SLP.Address.detectAddressNetwork('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse')
   *  // testnet
   *
   *  // legacy testnet
   *  bchjs.SLP.Address.detectAddressNetwork('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
   *  // testnet
   */
  detectAddressNetwork (address) {
    this._ensureValidAddress(address)
    const cashAddr = bchaddrjs.toCashAddress(address)
    return bchAddress.detectAddressNetwork(cashAddr)
  }

  /**
   * @api SLP.Address.detectAddressType() detectAddressType()
   * @apiName detectAddressType
   * @apiGroup SLP
   * @apiDescription Detect address type.
   *
   * @apiExample Example usage:
   *  // mainet cashaddr
   *  bchjs.SLP.Address.detectAddressType('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s');
   *  // p2pkh
   *
   *  // mainet cashaddr w/ no prefix
   *  bchjs.SLP.Address.detectAddressType('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s');
   *  // p2pkh
   *
   *  // mainet slpaddr
   *  bchjs.SLP.Address.detectAddressType('simpleledger:qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w');
   *  // p2pkh
   *
   *  // mainet slpaddr w/ no prefix
   *  bchjs.SLP.Address.detectAddressType('qqfx3wcg8ts09mt5l3zey06wenapyfqq2q0r0fpx3w');
   *  // p2pkh
   *
   *  // mainet legacy
   *  bchjs.SLP.Address.detectAddressType('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74');
   *  // p2pkh
   *
   *  // cashaddr testnet
   *  bchjs.SLP.Address.detectAddressType('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy');
   *  // p2pkh
   *
   *  // cashaddr testnet w/ no prefix
   *  bchjs.SLP.Address.detectAddressType('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy');
   *  // p2pkh
   *
   *  // slpaddr testnet
   *  bchjs.SLP.Address.detectAddressType('slptest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse');
   *  // p2pkh
   *
   *  // slpaddr testnet w/ no prefix
   *  bchjs.SLP.Address.detectAddressType('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggs3v58dse');
   *  // p2pkh
   *
   *  // legacy testnet
   *  bchjs.SLP.Address.detectAddressType('mqc1tmwY2368LLGktnePzEyPAsgADxbksi');
   *  // p2pkh
   */
  detectAddressType (address) {
    this._ensureValidAddress(address)
    const cashAddr = bchaddrjs.toCashAddress(address)
    return bchAddress.detectAddressType(cashAddr)
  }

  /*
  async details(address) {
    let tmpBITBOX
    let network
    if (typeof address === "string")
      network = this.detectAddressNetwork(address)
    else network = this.detectAddressNetwork(address[0])

    if (network === "mainnet")
      tmpBITBOX = new BITBOX({ restURL: "https://rest.bitcoin.com/v2/" })
    else tmpBITBOX = new BITBOX({ restURL: "https://trest.bitcoin.com/v2/" })

    if (typeof address === "string") {
      const cashAddr = bchaddrjs.toCashAddress(address)
      return tmpBITBOX.Address.details(cashAddr)
    }
    address = address.map(address => bchaddrjs.toCashAddress(address))
    return tmpBITBOX.Address.details(address)
  }

  async utxo(address) {
    let tmpBITBOX
    let network
    if (typeof address === "string")
      network = this.detectAddressNetwork(address)
    else network = this.detectAddressNetwork(address[0])

    if (network === "mainnet")
      tmpBITBOX = new BITBOX({ restURL: "https://rest.bitcoin.com/v2/" })
    else tmpBITBOX = new BITBOX({ restURL: "https://trest.bitcoin.com/v2/" })

    if (typeof address === "string") {
      const cashAddr = bchaddrjs.toCashAddress(address)
      return tmpBITBOX.Address.utxo(cashAddr)
    }
    address = address.map(address => bchaddrjs.toCashAddress(address))
    return tmpBITBOX.Address.utxo(address)
  }

  async unconfirmed(address) {
    let tmpBITBOX
    let network
    if (typeof address === "string")
      network = this.detectAddressNetwork(address)
    else network = this.detectAddressNetwork(address[0])

    if (network === "mainnet")
      tmpBITBOX = new BITBOX({ restURL: "https://rest.bitcoin.com/v2/" })
    else tmpBITBOX = new BITBOX({ restURL: "https://trest.bitcoin.com/v2/" })

    if (typeof address === "string") {
      const cashAddr = bchaddrjs.toCashAddress(address)
      return tmpBITBOX.Address.unconfirmed(cashAddr)
    }
    address = address.map(address => bchaddrjs.toCashAddress(address))
    return tmpBITBOX.Address.unconfirmed(address)
  }

  async transactions(address) {
    let tmpBITBOX
    let network
    if (typeof address === "string")
      network = this.detectAddressNetwork(address)
    else network = this.detectAddressNetwork(address[0])

    if (network === "mainnet")
      tmpBITBOX = new BITBOX({ restURL: "https://rest.bitcoin.com/v2/" })
    else tmpBITBOX = new BITBOX({ restURL: "https://trest.bitcoin.com/v2/" })

    if (typeof address === "string") {
      const cashAddr = bchaddrjs.toCashAddress(address)
      return tmpBITBOX.Address.transactions(cashAddr)
    }
    address = address.map(address => bchaddrjs.toCashAddress(address))
    return tmpBITBOX.Address.transactions(address)
  }
*/
  _ensureValidAddress (address) {
    try {
      bchaddrjs.toCashAddress(address)
    } catch (err) {
      throw new Error(
        `Invalid BCH address. Double check your address is valid: ${address}`
      )
    }
  }
}

module.exports = Address

```

`/home/trout/work/psf/code/bch-js/src/slp/utils.js`:

```js
/* eslint-disable no-useless-catch */

// Public npm libraries
const axios = require('axios')
const slpParser = require('slp-parser')

// Local libraries
const Util = require('../util')

let _this

class Utils {
  constructor (config = {}) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.slpParser = slpParser
    this.authToken = config.authToken
    this.axios = axios

    if (this.authToken) {
      // Add Basic Authentication token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: this.authToken
        }
      }
    } else {
      // Add JWT token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: `Token ${this.apiToken}`
        }
      }
    }

    _this = this

    this.whitelist = []

    this.util = new Util(config)
  }

  /**
   * @api SLP.Utils.decodeOpReturn() decodeOpReturn()
   * @apiName decodeOpReturn
   * @apiGroup SLP Utils
   * @apiDescription
   * Retrieves transactions data from a txid and decodes the SLP OP_RETURN data.
   *
   * Throws an error if given a non-SLP txid.
   *
   * If optional associative array parameter cache is used, will cache and
   * reuse responses for the same input.
   *
   * A third optional input, `usrObj`, is used by bch-api for managing rate limits.
   * It can be safely ignored when writing apps using this call.
   *
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   *  const txid =
   *   "266844d53e46bbd7dd37134688dffea6e54d944edff27a0add63dd0908839bc1"
   *
   *  const data = await bchjs.SLP.Utils.decodeOpReturn(txid)
   *
   *  console.log(`Decoded OP_RETURN data: ${JSON.stringify(data,null,2)}`)
   * } catch (error) {
   *  console.error(error)
   * }
   * })()
   *
   * // returns
   * {
   *  "tokenType": 1,
   *  "txType": "SEND",
   *  "tokenId": "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7"
   *  "amounts": [
   *    "100000000",
   *    "99883300000000"
   *  ]
   * }
   *
   */
  // Reimplementation of decodeOpReturn() using slp-parser.
  async decodeOpReturn (txid, cache = null, usrObj = null) {
    // The cache object is an in-memory cache (JS Object) that can be passed
    // into this function. It helps if multiple vouts from the same TXID are
    // being evaluated. In that case, it can significantly reduce the number
    // of API calls.
    // To use: add the output of this function to the cache object:
    // cache[txid] = returnValue
    // Then pass that cache object back into this function every time its called.
    if (cache) {
      if (!(cache instanceof Object)) {
        throw new Error('decodeOpReturn cache parameter must be Object')
      }

      const cachedVal = cache[txid]
      if (cachedVal) return cachedVal
    }

    // console.log(`decodeOpReturn usrObj: ${JSON.stringify(usrObj, null, 2)}`)

    try {
      // Validate the txid input.
      if (!txid || txid === '' || typeof txid !== 'string') {
        throw new Error('txid string must be included.')
      }

      // CT: 2/24/21 Deprected GET in favor of POST, to pass IP address.
      // Retrieve the transaction object from the full node.
      const path = `${this.restURL}rawtransactions/getRawTransaction`
      // console.log('decodeOpReturn() this.axiosOptions: ', this.axiosOptions)
      const response = await this.axios.post(
        path,
        {
          verbose: true,
          txids: [txid],
          usrObj // pass user data when making an internal call.
        },
        this.axiosOptions
      )
      const txDetails = response.data[0]
      // console.log(`txDetails: ${JSON.stringify(txDetails, null, 2)}`)

      // SLP spec expects OP_RETURN to be the first output of the transaction.
      const opReturn = txDetails.vout[0].scriptPubKey.hex
      // console.log(`opReturn hex: ${opReturn}`)

      const parsedData = _this.slpParser.parseSLP(Buffer.from(opReturn, 'hex'))
      // console.log(`parsedData: ${JSON.stringify(parsedData, null, 2)}`)

      // Convert Buffer data to hex strings or utf8 strings.
      let tokenData = {}
      if (parsedData.transactionType === 'SEND') {
        tokenData = {
          tokenType: parsedData.tokenType,
          txType: parsedData.transactionType,
          tokenId: parsedData.data.tokenId.toString('hex'),
          amounts: parsedData.data.amounts
        }
      } else if (parsedData.transactionType === 'GENESIS') {
        tokenData = {
          tokenType: parsedData.tokenType,
          txType: parsedData.transactionType,
          ticker: parsedData.data.ticker.toString(),
          name: parsedData.data.name.toString(),
          tokenId: txid,
          documentUri: parsedData.data.documentUri.toString(),
          documentHash: parsedData.data.documentHash.toString(),
          decimals: parsedData.data.decimals,
          mintBatonVout: parsedData.data.mintBatonVout,
          qty: parsedData.data.qty
        }
      } else if (parsedData.transactionType === 'MINT') {
        tokenData = {
          tokenType: parsedData.tokenType,
          txType: parsedData.transactionType,
          tokenId: parsedData.data.tokenId.toString('hex'),
          mintBatonVout: parsedData.data.mintBatonVout,
          qty: parsedData.data.qty
        }
      }
      // console.log(`tokenData: ${JSON.stringify(tokenData, null, 2)}`)

      if (cache) cache[txid] = tokenData

      return tokenData
    } catch (error) {
      // Used for debugging
      // console.log('decodeOpReturn error: ', error)
      // console.log(`decodeOpReturn error.message: ${error.message}`)
      // if (error.response && error.response.data) {
      //   console.log(
      //     `decodeOpReturn error.response.data: ${JSON.stringify(
      //       error.response.data
      //     )}`
      //   )
      // }
      throw error
    }
  }
}

module.exports = Utils

```

`/home/trout/work/psf/code/bch-js/src/slp/nft1.js`:

```js
/*
  This library wraps the slp-mdm library to generate the OP_RETURN for NFT1 tokens.

  NFT Group tokens (Parents) are generated and minted. They are like amorphous
  NFTs; like stem cells that haven't specialized yet.

  NFT 'Children' are the 'real' NFTs. They are created by burning an NFT Group
  (Parent) token.
*/

// Public npm libraries
// const axios = require('axios')

// Local libraries.
const Address = require('./address')

// const BigNumber = require('bignumber.js')
const slpMdm = require('slp-mdm')

// let _this
// const addy = new Address()
let addy
const TransactionBuilder = require('../transaction-builder')

class Nft1 {
  constructor (config) {
    this.restURL = config.restURL

    addy = new Address(config)

    // Instantiate the transaction builder.
    TransactionBuilder.setAddress(addy)

    // _this = this
  }

  /**
   * @api SLP.NFT1.newNFTGroupOpReturn() newNFTGroupOpReturn()
   * @apiName newNFTGroupOpReturn
   * @apiGroup SLP NFT1
   * @apiDescription Generate the OP_RETURN value needed to create an SLP
   * NFT Group token.
   * It's assumed all elements in the tokenUtxos array belong to the same token.
   *
   * Returns a Buffer representing a transaction output, ready to be added to
   * the Transaction Builder.
   *
   * @apiExample Example usage:
   *
   *   const configObj = {
   *     name: "SLP Test Token",
   *     ticker: "SLPTEST",
   *     documentUrl: "https://FullStack.cash",
   *     initialQty: 1
   *   }
   *
   *   const result = await bchjs.SLP.NFT1.newNFTGroupOpReturn(
   *     configObj
   *   )
   *
   *  ...
   *  // Add OP_RETURN as first output.
   *  transactionBuilder.addOutput(slpData, 0);
   *
   *  // See additional code here:
   *  // https://github.com/Permissionless-Software-Foundation/bch-js-examples/tree/master/applications/slp/nft
   *
   */
  newNFTGroupOpReturn (configObj) {
    try {
      // TODO: Add input validation.

      // Prevent error if user fails to add the document hash.
      if (!configObj.documentHash) configObj.documentHash = ''

      // If mint baton is not specified, then replace it with null.
      if (!configObj.mintBatonVout) configObj.mintBatonVout = null

      const script = slpMdm.NFT1.Group.genesis(
        configObj.ticker,
        configObj.name,
        configObj.documentUrl,
        configObj.documentHash,
        0,
        configObj.mintBatonVout,
        new slpMdm.BN(configObj.initialQty)
      )

      return script
    } catch (err) {
      console.log('Error in generateNFTParentOpReturn()')
      throw err
    }
  }

  // Mint additional NFT Group 'Parent' tokens.
  /**
   * @api SLP.NFT1.mintNFTGroupOpReturn() mintNFTGroupOpReturn()
   * @apiName mintNFTGroupOpReturn
   * @apiGroup SLP NFT1
   * @apiDescription Generate the OP_RETURN value needed to create an SLP Mint
   * transaction for an NFT Group token.
   * It's assumed all elements in the tokenUtxos array belong to the same token.
   *
   * Returns a Buffer representing a transaction output, ready to be added to
   * the Transaction Builder.
   *
   * @apiExample Example usage:
   *
   *  const addr = "bitcoincash:qq6xz6wwcy78uh79vgjvfyahj4arq269w5an8pcjak"
   *  const utxos = await bchjs.Blockbook.utxos(addr)
   *
   *  // Identify the SLP token UTXOs.
   *  let tokenUtxos = await bchjs.SLP.Utils.tokenUtxoDetails(utxos);
   *
   *  // Filter out the minting baton.
   *  tokenUtxos = tokenUtxos.filter((utxo, index) => {
   *    if (
   *      utxo && // UTXO is associated with a token.
   *      utxo.tokenId === TOKENID && // UTXO matches the token ID.
   *      utxo.utxoType === "minting-baton" && // UTXO is not a minting baton.
   *      utxo.tokenType === 129 // UTXO is for NFT Group
   *    )
   *    return true;
   *  });
   *
   *  // Generate the SLP OP_RETURN
   *  const slpData = bchjs.SLP.NFT1.mintNFTGroupOpReturn(
   *    tokenUtxos,
   *    1 // Mint 1 new token.
   *  );
   *
   *  ...
   *  // Add OP_RETURN as first output.
   *  transactionBuilder.addOutput(slpData, 0);
   *
   *  // See additional code here:
   *  // https://github.com/Permissionless-Software-Foundation/bch-js-examples/tree/master/applications/slp/nft
   */
  mintNFTGroupOpReturn (tokenUtxos, mintQty, destroyBaton = false) {
    // try {
    // Throw error if input is not an array.
    if (!Array.isArray(tokenUtxos)) {
      throw new Error('tokenUtxos must be an array.')
    }

    // Loop through the tokenUtxos array and find the minting baton.
    let mintBatonUtxo
    for (let i = 0; i < tokenUtxos.length; i++) {
      if (tokenUtxos[i].utxoType === 'minting-baton' || tokenUtxos[i].type === 'baton') {
        mintBatonUtxo = tokenUtxos[i]
      }
    }

    // Throw an error if the minting baton could not be found.
    if (!mintBatonUtxo) {
      throw new Error('Minting baton could not be found in tokenUtxos array.')
    }

    const tokenId = mintBatonUtxo.tokenId

    if (!tokenId) {
      throw new Error('tokenId property not found in mint-baton UTXO.')
    }

    // Signal that the baton should be passed or detroyed.
    let batonVout = 2
    if (destroyBaton) batonVout = null

    const script = slpMdm.NFT1.Group.mint(
      tokenId,
      batonVout,
      new slpMdm.BN(mintQty)
    )

    return script
    // } catch (err) {
    //   // console.log(`Error in generateMintOpReturn()`)
    //   throw err
    // }
  }

  /**
   * @api SLP.NFT1.generateNFTChildGenesisOpReturn() generateNFTChildGenesisOpReturn()
   * @apiName generateNFTChildGenesisOpReturn
   * @apiGroup SLP NFT1
   * @apiDescription Generate the OP_RETURN value needed to create an SLP
   * NFT Child token.
   * It's assumed all elements in the tokenUtxos array belong to the same token.
   *
   * Returns a Buffer representing a transaction output, ready to be added to
   * the Transaction Builder.
   *
   * @apiExample Example usage:
   *
   *   const configObj = {
   *     name: "NFT Child",
   *     ticker: "NFTC",
   *     documentUrl: "https://FullStack.cash",
   *   }
   *
   *   const result = await bchjs.SLP.NFT1.generateNFTChildGenesisOpReturn(
   *     configObj
   *   )
   *
   *  ...
   *  // Add OP_RETURN as first output.
   *  transactionBuilder.addOutput(slpData, 0);
   *
   *  // See additional code here:
   *  // https://github.com/Permissionless-Software-Foundation/bch-js-examples/tree/master/applications/slp/nft
   *
   */
  generateNFTChildGenesisOpReturn (configObj) {
    try {
      // TODO: Add input validation.

      // Prevent error if user fails to add the document hash.
      if (!configObj.documentHash) configObj.documentHash = ''

      // If mint baton is not specified, then replace it with null.
      if (!configObj.mintBatonVout) configObj.mintBatonVout = null

      const script = slpMdm.NFT1.Child.genesis(
        configObj.ticker,
        configObj.name,
        configObj.documentUrl,
        configObj.documentHash,
        0,
        configObj.mintBatonVout,
        new slpMdm.BN('1')
      )

      return script
    } catch (err) {
      console.log('Error in generateNFTChildGenesisOpReturn()')
      throw err
    }
  }

  /**
   * @api SLP.NFT1.generateNFTChildSendOpReturn() generateNFTChildSendOpReturn()
   * @apiName generateNFTChildSendOpReturn
   * @apiGroup SLP NFT1
   * @apiDescription Generate the OP_RETURN value needed to send an SLP NFT
   * Child token to another address.
   * It's assumed all elements in the tokenUtxos array belong to the same token.
   *
   * Returns a Buffer representing a transaction output, ready to be added to
   * the Transaction Builder.
   *
   * @apiExample Example usage:
   *
   *  const addr = "bitcoincash:qq6xz6wwcy78uh79vgjvfyahj4arq269w5an8pcjak"
   *  const utxos = await bchjs.Blockbook.utxos(addr)
   *
   *  // Identify the SLP token UTXOs.
   *  let tokenUtxos = await bchjs.SLP.Utils.tokenUtxoDetails(utxos);
   *
   *  // Filter out the token UTXOs that match the user-provided token ID.
   *  tokenUtxos = tokenUtxos.filter((utxo, index) => {
   *    if (
   *      utxo && // UTXO is associated with a token.
   *      utxo.tokenId === TOKENID && // UTXO matches the token ID.
   *      utxo.tokenType === "token" && // UTXO is not a minting baton.
   *      utxo.tokenType === 65 // UTXO is for an NFT Child
   *    )
   *    return true;
   *  });
   *
   *  // Generate the SEND OP_RETURN
   *  const slpData = bchjs.SLP.NFT1.generateNFTChildSendOpReturn(
   *    tokenUtxos,
   *    TOKENQTY
   *  );
   *
   *  ...
   *  // Add OP_RETURN as first output.
   *  transactionBuilder.addOutput(slpData, 0);
   *
   *  // See additional code here:
   *  // https://github.com/Permissionless-Software-Foundation/bch-js-examples/tree/master/applications/slp/nft
   */
  generateNFTChildSendOpReturn (tokenUtxos, sendQty) {
    try {
      // TODO: Add input validation.

      const tokenId = tokenUtxos[0].tokenId

      // Calculate the total amount of tokens owned by the wallet.
      let totalTokens = 0
      for (let i = 0; i < tokenUtxos.length; i++) {
        totalTokens += tokenUtxos[i].tokenQty
      }

      const change = totalTokens - sendQty

      let script
      let outputs = 1

      // The normal case, when there is token change to return to sender.
      if (change > 0) {
        outputs = 2

        // Convert to integer string.
        const sendStr = Math.floor(sendQty).toString()
        const changeStr = Math.floor(change).toString()

        // Generate the OP_RETURN as a Buffer.
        script = slpMdm.NFT1.Child.send(tokenId, [
          new slpMdm.BN(sendStr),
          new slpMdm.BN(changeStr)
        ])
        //

        // Corner case, when there is no token change to send back.
      } else {
        // Convert to integer string.
        const sendStr = Math.floor(sendQty).toString()

        // Generate the OP_RETURN as a Buffer.
        script = slpMdm.NFT1.Child.send(tokenId, [new slpMdm.BN(sendStr)])
      }

      return { script, outputs }
    } catch (err) {
      console.log('Error in generateNFTChildSendOpReturn()')
      throw err
    }
  }

  /**
   * @api SLP.NFT1.generateNFTGroupSendOpReturn() generateNFTGroupSendOpReturn()
   * @apiName generateNFTGroupSendOpReturn
   * @apiGroup SLP NFT1
   * @apiDescription Generate the OP_RETURN value needed to send an SLP NFT
   * Group token to another address.
   * It's assumed all elements in the tokenUtxos array belong to the same token.
   *
   * Returns a Buffer representing a transaction output, ready to be added to
   * the Transaction Builder.
   *
   * @apiExample Example usage:
   *
   *  const addr = "bitcoincash:qq6xz6wwcy78uh79vgjvfyahj4arq269w5an8pcjak"
   *  const utxos = await bchjs.Blockbook.utxos(addr)
   *
   *  // Identify the SLP token UTXOs.
   *  let tokenUtxos = await bchjs.SLP.Utils.tokenUtxoDetails(utxos);
   *
   *  // Filter out the token UTXOs that match the user-provided token ID.
   *  tokenUtxos = tokenUtxos.filter((utxo, index) => {
   *    if (
   *      utxo && // UTXO is associated with a token.
   *      utxo.tokenId === TOKENID && // UTXO matches the token ID.
   *      utxo.tokenType === "token" && // UTXO is not a minting baton.
   *      utxo.tokenType === 129 // UTXO is for an NFT Group
   *    )
   *    return true;
   *  });
   *
   *  // Generate the SEND OP_RETURN
   *  const slpData = bchjs.SLP.NFT1.generateNFTGroupSendOpReturn(
   *    tokenUtxos,
   *    TOKENQTY
   *  );
   *
   *  ...
   *  // Add OP_RETURN as first output.
   *  transactionBuilder.addOutput(slpData, 0);
   *
   *  // See additional code here:
   *  // https://github.com/Permissionless-Software-Foundation/bch-js-examples/tree/master/applications/slp/nft
   */
  generateNFTGroupSendOpReturn (tokenUtxos, sendQty) {
    try {
      // TODO: Add input validation.

      const tokenId = tokenUtxos[0].tokenId

      // Calculate the total amount of tokens owned by the wallet.
      let totalTokens = 0
      for (let i = 0; i < tokenUtxos.length; i++) {
        totalTokens += tokenUtxos[i].tokenQty
      }

      const change = totalTokens - sendQty

      let script
      let outputs = 1

      // The normal case, when there is token change to return to sender.
      if (change > 0) {
        outputs = 2

        // Convert to integer string.
        const sendStr = Math.floor(sendQty).toString()
        const changeStr = Math.floor(change).toString()

        // Generate the OP_RETURN as a Buffer.
        script = slpMdm.NFT1.Group.send(tokenId, [
          new slpMdm.BN(sendStr),
          new slpMdm.BN(changeStr)
        ])
        //

        // Corner case, when there is no token change to send back.
      } else {
        // Convert to integer string.
        const sendStr = Math.floor(sendQty).toString()

        // Generate the OP_RETURN as a Buffer.
        script = slpMdm.NFT1.Group.send(tokenId, [new slpMdm.BN(sendStr)])
      }

      return { script, outputs }
    } catch (err) {
      console.log('Error in generateNFTGroupSendOpReturn()')
      throw err
    }
  }
}

module.exports = Nft1

```

`/home/trout/work/psf/code/bch-js/src/encryption.js`:

```js
/*
  This library contains useful functions that deal with encryption.
*/

const axios = require('axios')

let _this

class Encryption {
  constructor (config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.axios = axios
    this.authToken = config.authToken

    if (this.authToken) {
      // Add Basic Authentication token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: this.authToken
        }
      }
    } else {
      // Add JWT token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: `Token ${this.apiToken}`
        }
      }
    }

    _this = this
  }

  /**
   * @api encryption.getPubKey() getPubKey()
   * @apiName Encryption getPubKey()
   * @apiGroup Encryption
   * @apiDescription Get the public key for an address
   * Given an address, the command will search the blockchain for a public
   * key associated with that address. The address needs to have made at least
   * one spend transaction, in order for its public key to be retrievable.
   *
   * @apiExample Example usage:
   *(async () => {
   *  try {
   *    const addr = 'bitcoincash:qqlrzp23w08434twmvr4fxw672whkjy0py26r63g3d'
   *    const pubkey = await bchjs.encryption.getPubKey(addr);
   *    console.log(pubkey);
   *  } catch(err) {
   *   console.error(err)
   *  }
   *})()
   *
   */

  // Search the blockchain for a public key associated with a BCH address.
  async getPubKey (addr) {
    try {
      if (!addr || typeof addr !== 'string') {
        throw new Error('Input must be a valid Bitcoin Cash address.')
      }

      const response = await _this.axios.get(
        `${this.restURL}encryption/publickey/${addr}`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = Encryption

```

`/home/trout/work/psf/code/bch-js/src/crypto.js`:

```js
const randomBytes = require('randombytes')
const Bitcoin = require('@psf/bitcoincashjs-lib')

class Crypto {
  /**
   * @api Crypto.sha256() sha256()
   * @apiName sha256
   * @apiGroup Crypto
   * @apiDescription Utility for creating sha256 hash digests of data
   *
   * @apiExample Example usage:
   *   // buffer from hex
   *  let buffer = Buffer.from('0101010101010101', 'hex')
   *  bchjs.Crypto.sha256(buffer)
   *  // <Buffer c0 35 7a 32 ed 1f 6a 03 be 92 dd 09 44 76 f7 f1 a2 e2 14 ec>
   *
   *  // buffer from hex
   *  let buffer = Buffer.from('031ad329b3117e1d1e2974406868e575d48cff88e8128ba0eedb10da053785033b', 'hex')
   *  bchjs.Crypto.sha256(buffer)
   *  // <Buffer 98 ee ed 79 8e e9 58 d1 65 3e df 2d 85 7d 4a ea ba 97 19 32>
   *
   *  // buffer from hex
   *  let buffer = Buffer.from('03123464075c7a5fa6b8680afa2c962a02e7bf071c6b2395b0ac711d462cac9354', 'hex')
   *  bchjs.Crypto.sha256(buffer)
   *  // <Buffer 97 8c 09 dd 46 09 1d 19 22 fa 01 e9 f4 a9 75 b9 1a 37 1f 26 ba 83 99 de 27 d5 38 01 15 21 21 de>
   *
   * */
  // Translate address from any address format into a specific format.
  static sha256 (buffer) {
    return Bitcoin.crypto.sha256(buffer)
  }

  /**
   * @api Crypto.ripemd160() ripemd160()
   * @apiName ripemd160
   * @apiGroup Crypto
   * @apiDescription Utility for creating ripemd160 hash digests of data
   *
   * @apiExample Example usage:
   *   // buffer from hex
   * let buffer = Buffer.from('0101010101010101', 'hex')
   * bchjs.Crypto.ripemd160(buffer)
   * // <Buffer 58 25 70 1b 4b 97 67 fd 35 06 3b 28 6d ca 35 82 85 3e 06 30>
   *
   * // buffer from hex
   * let buffer = Buffer.from('75618d82d1f6251f2ef1f42f5f0d5040330948a707ff6d69720dbdcb00b48aab', 'hex')
   * bchjs.Crypto.ripemd160(buffer)
   * // <Buffer 88 74 ef 88 8a 9b cb d8 3b 87 d0 6f f7 bc 21 3c 51 49 73 62>
   *
   * // buffer from hex
   * let buffer = Buffer.from('978c09dd46091d1922fa01e9f4a975b91a371f26ba8399de27d53801152121de', 'hex')
   * bchjs.Crypto.ripemd160(buffer)
   * // <Buffer 5f 95 6a 88 86 30 51 ea 52 15 d8 97 0c ed 8e 21 8e b6 15 cf>
   * */
  static ripemd160 (buffer) {
    return Bitcoin.crypto.ripemd160(buffer)
  }

  /**
   * @api Crypto.hash256() hash256()
   * @apiName hash256
   * @apiGroup Crypto
   * @apiDescription Utility for creating double sha256 hash digests of buffer encoded data.
   *
   * @apiExample Example usage:
   *   // buffer from hex
   *  let buffer = Buffer.from('0101010101010101', 'hex')
   *  bchjs.Crypto.hash256(buffer)
   *  // <Buffer 72 83 38 d9 9f 35 61 75 c4 94 5e f5 cc cf a6 1b 7b 56 14 3c bb f4 26 dd d0 e0 fc 7c fe 8c 3c 23>
   *
   *  // buffer from hex
   *  let buffer = Buffer.from('031ad329b3117e1d1e2974406868e575d48cff88e8128ba0eedb10da053785033b', 'hex')
   *  bchjs.Crypto.hash256(buffer)
   *  // <Buffer 7a d2 a7 4b d5 96 98 71 4a 29 91 a8 2b 71 73 6f 35 42 b2 82 8b 6a c2 4d e4 27 c4 40 da 89 d0 1a>
   *
   *  // buffer from hex
   *  let buffer = Buffer.from('03123464075c7a5fa6b8680afa2c962a02e7bf071c6b2395b0ac711d462cac9354', 'hex')
   *  bchjs.Crypto.hash256(buffer)
   *  // <Buffer 68 8f 1d 02 9e d5 4c 34 d0 32 0b 83 8b f6 fc 64 f6 2f 38 a6 e9 30 a0 af 5b db 4e 27 d1 a6 84 cd>
   * */
  static hash256 (buffer) {
    return Bitcoin.crypto.hash256(buffer)
  }

  /**
   * @api Crypto.hash160() hash160()
   * @apiName hash160
   * @apiGroup Crypto
   * @apiDescription Utility for creating ripemd160(sha256()) hash digests of buffer encoded data.
   *
   * @apiExample Example usage:
   *  // buffer from hex
   *  let buffer = Buffer.from('0101010101010101', 'hex')
   *  bchjs.Crypto.hash160(buffer)
   *  // <Buffer ab af 11 19 f8 3e 38 42 10 fe 8e 22 2e ac 76 e2 f0 da 39 dc>
   *
   *  // buffer from hex
   *  let buffer = Buffer.from('031ad329b3117e1d1e2974406868e575d48cff88e8128ba0eedb10da053785033b', 'hex')
   *  bchjs.Crypto.hash160(buffer)
   *  // <Buffer 88 74 ef 88 8a 9b cb d8 3b 87 d0 6f f7 bc 21 3c 51 49 73 62>
   *
   *  // buffer from hex
   *  let buffer = Buffer.from('03123464075c7a5fa6b8680afa2c962a02e7bf071c6b2395b0ac711d462cac9354', 'hex')
   *  bchjs.Crypto.hash160(buffer)
   *
   * */
  static hash160 (buffer) {
    return Bitcoin.crypto.hash160(buffer)
  }

  /**
   * @api Crypto.randomBytes() randomBytes()
   * @apiName randomBytes
   * @apiGroup Crypto
   * @apiDescription Generates cryptographically strong pseudo-random data. The size argument is a number indicating the number of bytes to generate.
   *
   * @apiExample Example usage:
   * bchjs.Crypto.randomBytes(16)
   * // <Buffer 0e 87 d2 7b c4 c3 d0 06 ef bb f3 a4 e5 ea 87 02>
   *
   * bchjs.Crypto.randomBytes(20)
   * // <Buffer 8b 42 7d ca 52 c0 77 69 a3 f2 32 90 6b a5 a8 50 56 e2 47 0f>
   *
   * bchjs.Crypto.randomBytes(24)
   * // <Buffer 28 69 fc 81 f7 a8 dd 5e 25 92 c4 7b 87 31 02 e8 b3 4c 92 fa c4 c9 1a e2>
   *
   * bchjs.Crypto.randomBytes(28)
   * // <Buffer 80 53 dd 21 b6 02 a9 c7 8f 1c 1d 64 1b 6e 21 3e 3f 01 e1 0f aa 6c 59 50 3a b3 41 a6>
   *
   * bchjs.Crypto.randomBytes(32)
   * // <Buffer ec 44 73 72 ea 48 3e 08 a5 0a 62 b8 40 0f 69 64 a7 75 35 af 20 3d e1 6d ce 3b f9 37 11 19 2b c6>
   * */
  static randomBytes (size = 16) {
    return randomBytes(size)
  }
}

module.exports = Crypto

```

`/home/trout/work/psf/code/bch-js/src/control.js`:

```js
/*
  API endpoints for basic control and information of the full node.
*/

const axios = require('axios')

// let _this // Global reference to the instance of this class.

class Control {
  constructor (config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.authToken = config.authToken

    if (this.authToken) {
      // Add Basic Authentication token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: this.authToken
        }
      }
    } else {
      // Add JWT token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: `Token ${this.apiToken}`
        }
      }
    }

    // _this = this
  }

  /**
   * @api Control.getNetworkInfo() getNetworkInfo()
   * @apiName getNetworkInfo
   * @apiGroup Control
   * @apiDescription Returns an object containing various network info.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     let getInfo = await bchjs.Control.getNetworkInfo();
   *     console.log(getInfo);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * // returns
   * { version: 190500,
   *   subversion: '/Bitcoin ABC:0.19.5(EB32.0)/',
   *   protocolversion: 70015,
   *   localservices: '0000000000000425',
   *   localrelay: true,
   *   timeoffset: 0,
   *   networkactive: true,
   *   connections: 17,
   *   networks:
   *   [ { name: 'ipv4',
   *       limited: false,
   *       reachable: true,
   *       proxy: '',
   *       proxy_randomize_credentials: false },
   *     { name: 'ipv6',
   *       limited: false,
   *       reachable: true,
   *       proxy: '',
   *       proxy_randomize_credentials: false },
   *     { name: 'onion',
   *       limited: true,
   *       reachable: false,
   *       proxy: '',
   *       proxy_randomize_credentials: false } ],
   *   relayfee: 0.00001,
   *   excessutxocharge: 0,
   *   warnings:
   *   'Warning: Unknown block versions being mined! It\'s possible unknown rules are in effect' }}
   */
  async getNetworkInfo () {
    try {
      const response = await axios.get(
        `${this.restURL}control/getNetworkInfo`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getMemoryInfo () {
    try {
      const response = await axios.get(
        `${this.restURL}control/getMemoryInfo`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
  //
  // stop() {
  //   // Stop Bitcoin Cash server.
  //   return axios.post(`${this.restURL}control/stop`)
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     return JSON.stringify(error.response.data.error.message);
  //   });
  // }
}

module.exports = Control

```

`/home/trout/work/psf/code/bch-js/src/transaction.js`:

```js
/*
  High-level functions for working with Transactions
*/

// Global npm libraries
// const BigNumber = require('bignumber.js')

// Local libraries
const RawTransaction = require('./raw-transactions')
const SlpUtils = require('./slp/utils')
const Blockchain = require('./blockchain')
const PsfSlpIndexer = require('./psf-slp-indexer')

class Transaction {
  constructor (config = {}) {
    // Encapsulate dependencies
    this.slpUtils = new SlpUtils(config)
    this.rawTransaction = new RawTransaction(config)
    this.blockchain = new Blockchain(config)
    this.psfSlpIndexer = new PsfSlpIndexer(config)
  }

  /**
   * @api Transaction.get() get()
   * @apiName get
   * @apiGroup Transaction
   * @apiDescription
   * Returns an object of transaction data, including addresses for input UTXOs.
   * If it is a SLP token transaction, the token information for inputs and
   * outputs will also be included.
   *
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   *  let txData = await bchjs.Transaction.get("0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098");
   *  console.log(txData);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   */
  async get (txid) {
    // console.log('transaction.get() txid: ', txid)
    return await this.psfSlpIndexer.tx(txid)
  }

  /**
   * @api Transaction.getTokenInfo() getTokenInfo()
   * @apiName getTokenInfo
   * @apiGroup Transaction
   * @apiDescription
   * Given the TXID of a token transaction, it will return data about that
   * token by retrieving the data from the Genesis transaction and docoding
   * the OP_RETURN.
   *
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   *  let txData = await bchjs.Transaction.getTokenInfo("0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098");
   *  console.log(txData);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   */
  // A wrapper for decodeOpReturn(). Returns false if txid is not an SLP tx.
  // Returns the token data if the txid is an SLP tx.
  async getTokenInfo (txid) {
    try {
      const tokenData = await this.slpUtils.decodeOpReturn(txid)
      return tokenData
    } catch (err) {
      return false
    }
  }
}

module.exports = Transaction

```

`/home/trout/work/psf/code/bch-js/src/dsproof.js`:

```js
const axios = require('axios')

let _this

class DSProof {
  constructor (config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.authToken = config.authToken
    this.axios = axios

    if (this.authToken) {
      // Add Basic Authentication token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: this.authToken
        }
      }
    } else {
      // Add JWT token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: `Token ${this.apiToken}`
        }
      }
    }

    _this = this
  }

  /**
   * @api DSProof.getDSProof() getDSProof()
   * @apiName getDSProof
   * @apiGroup DSProof
   * @apiDescription Checks if a transaction generated a double-spend proof.
   *
   * If a double-spend is attempted, one of the transactions will generate a
   * 'double spend proof'. This call can be used to check if a transaction
   * generated such a proof.
   *
   * Merchants should wait 3-5 seconds after receiving notification of a
   * transaction before calling this endpoint, to see if the TXID generated a
   * proof. If this method returns no data, then the TX can be considered 'safe'
   * and not a double spend. If proof data is returned by this method, then
   * the transaction generated a proof and can be considered a 'double spend'.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     const txid = 'ee0df780b58f6f24467605b2589c44c3a50fc849fb8f91b89669a4ae0d86bc7e'
   *     const result = await bchjs.DSProof.getDSProof(txid)
   *     console.log(result);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * // returns
   * null
   */
  async getDSProof (txid) {
    try {
      if (!txid) {
        throw new Error('txid is required')
      }
      if (txid.length !== 64) {
        throw new Error(`txid must be of length 64 (not ${txid.length})`)
      }
      const response = await _this.axios.get(
        `${this.restURL}dsproof/getdsproof/${txid}`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = DSProof

```

`/home/trout/work/psf/code/bch-js/src/electrumx.js`:

```js
/*
  This library interacts with the ElectrumX bch-api REST API endpoints operated
  by FullStack.cash
*/
// Public npm libraries
const axios = require('axios')

// Local libraries.
const Blockchain = require('./blockchain')
// const Address = require('./address')

// let _this

class ElectrumX {
  constructor (config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.authToken = config.authToken

    if (this.authToken) {
      // Add Basic Authentication token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: this.authToken
        }
      }
    } else {
      // Add JWT token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: `Token ${this.apiToken}`
        }
      }
    }

    // Encapsulate dependencies
    this.blockchain = new Blockchain(config)
    // this.address = new Address(config)

    // _this = this
  }

  /**
   * @api Electrumx.utxo()  utxo()
   * @apiName ElectrumX Utxo
   * @apiGroup ElectrumX
   * @apiDescription Return a list of uxtos for an address.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     let utxo = await bchjs.Electrumx.utxo('bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9');
   *     console.log(utxo);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * utxo = {
   *  "success": true,
   *  "utxos": [
   *    {
   *      "height": 602405,
   *     "tx_hash": "2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7",
   *      "tx_pos": 0,
   *      "value": 1000
   *    }
   *  ]
   * }
   *
   * (async () => {
   *   try {
   *     let utxo = await bchjs.Electrumx.utxo(['bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf', 'bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v']);
   *     console.log(utxo);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   *   utxos = {
   *     "success": true,
   *     "utxos": [
   *       {
   *         "utxos": [
   *           {
   *             "height": 604392,
   *             "tx_hash": "7774e449c5a3065144cefbc4c0c21e6b69c987f095856778ef9f45ddd8ae1a41",
   *             "tx_pos": 0,
   *             "value": 1000
   *           },
   *           {
   *             "height": 630834,
   *             "tx_hash": "4fe60a51e0d8f5134bfd8e5f872d6e502d7f01b28a6afebb27f4438a4f638d53",
   *             "tx_pos": 0,
   *             "value": 6000
   *           }
   *         ],
   *         "address": "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"
   *       },
   *       {
   *         "utxos": [],
   *         "address": "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
   *       }
   *     ]
   *   }
   *
   */
  async utxo (address) {
    try {
      // console.log(`electrumx.js/utxo() restURL: ${this.restURL}`)

      // Handle single address.
      if (typeof address === 'string') {
        const response = await axios.get(
          `${this.restURL}electrumx/utxos/${address}`,
          this.axiosOptions
        )
        return response.data

        // Handle array of addresses.
      } else if (Array.isArray(address)) {
        const response = await axios.post(
          `${this.restURL}electrumx/utxos`,
          {
            addresses: address
          },
          this.axiosOptions
        )

        return response.data
      }

      throw new Error('Input address must be a string or array of strings.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Electrumx.balance()  balance()
   * @apiName ElectrumX Balance
   * @apiGroup ElectrumX
   * @apiDescription Return a list of balances for an address.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     let balance = await bchjs.Electrumx.balance('bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf');
   *     console.log(balance);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   *   balance = {
   *     "success": true,
   *     "balance": {
   *       "confirmed": 1000,
   *       "unconfirmed": 0
   *     }
   *   }
   *
   * (async () => {
   *   try {
   *     let balance = await bchjs.Electrumx.balance(['bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf', 'bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v']);
   *     console.log(balance);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   *   balance = {
   *     "success": true,
   *     "balances": [
   *       {
   *         "balance": {
   *           "confirmed": 7000,
   *           "unconfirmed": 0
   *         },
   *         "address": "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"
   *       },
   *       {
   *         "balance": {
   *           "confirmed": 0,
   *           "unconfirmed": 0
   *         },
   *         "address": "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
   *       }
   *     ]
   *   }
   *
   */
  async balance (address) {
    try {
      // Handle single address.
      if (typeof address === 'string') {
        const response = await axios.get(
          `${this.restURL}electrumx/balance/${address}`,
          this.axiosOptions
        )
        return response.data

        // Handle array of addresses.
      } else if (Array.isArray(address)) {
        const response = await axios.post(
          `${this.restURL}electrumx/balance`,
          {
            addresses: address
          },
          this.axiosOptions
        )

        return response.data
      }

      throw new Error('Input address must be a string or array of strings.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Electrumx.transactions()  transactions()
   * @apiName ElectrumX Transactions
   * @apiGroup ElectrumX
   * @apiDescription Return a transaction history for an address.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     let transactions = await bchjs.Electrumx.transactions('bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v');
   *     console.log(utxo);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   *   {
   *     "success": true,
   *     "transactions": [
   *       {
   *         "height": 560430,
   *         "tx_hash": "3e1f3e882be9c03897eeb197224bf87f312be556a89f4308fabeeeabcf9bc851"
   *       },
   *       {
   *         "height": 560534,
   *         "tx_hash": "4ebbeaac51ce141e262964e3a0ce11b96ca72c0dffe9b4127ce80135f503a280"
   *       }
   *     ]
   *   }
   *
   * (async () => {
   *   try {
   *     let transactions = await bchjs.Electrumx.transactions(['bitcoincash:qrl2nlsaayk6ekxn80pq0ks32dya8xfclyktem2mqj', 'bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v']);
   *     console.log(utxo);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   *   transactions = {
   *     "success": true,
   *     "transactions": [
   *       {
   *         "transactions": [
   *           {
   *             "height": 631219,
   *             "tx_hash": "ae2daa01c8172545b5edd205ea438706bcb74e63d4084a26b9ff2a46d46dc97f"
   *           }
   *         ],
   *         "address": "bitcoincash:qrl2nlsaayk6ekxn80pq0ks32dya8xfclyktem2mqj"
   *       },
   *       {
   *         "transactions": [
   *           {
   *             "height": 560430,
   *             "tx_hash": "3e1f3e882be9c03897eeb197224bf87f312be556a89f4308fabeeeabcf9bc851"
   *           },
   *           {
   *             "height": 560534,
   *             "tx_hash": "4ebbeaac51ce141e262964e3a0ce11b96ca72c0dffe9b4127ce80135f503a280"
   *           }
   *         ],
   *         "address": "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
   *       }
   *     ]
   *   }
   *
   */
  async transactions (address, usrObj = null, allTxs = false) {
    try {
      // Handle single address.
      if (typeof address === 'string') {
        const response = await axios.get(
          `${this.restURL}electrumx/transactions/${address}/${allTxs}`,
          this.axiosOptions
        )
        return response.data

        // Handle array of addresses.
      } else if (Array.isArray(address)) {
        const response = await axios.post(
          `${this.restURL}electrumx/transactions`,
          {
            addresses: address,
            usrObj, // pass user data when making an internal call.
            allTxs
          },
          this.axiosOptions
        )

        return response.data
      }

      throw new Error('Input address must be a string or array of strings.')
    } catch (error) {
      // console.log('Error in transactions(): ', error)
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Electrumx.unconfirmed() unconfirmed()
   * @apiName ElectrumX Unconfirmed
   * @apiGroup ElectrumX
   * @apiDescription Return a list of unconfirmed uxtos (mempool) for an address.
   *
   * @apiExample Example usage:
   *    (async () => {
   *   try {
   *     let mempool = await bchjs.Electrumx.unconfirmed('bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9');
   *     console.log(mempool);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * mempool = {
   *  "success": true,
   *  "utxos": [
   *    {
   *      "height": 602405,
   *      "tx_hash": "2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7",
   *      "fee": 24310
   *    }
   *  ]
   * }
   *
   * (async () => {
   *   try {
   *     let mempool = await bchjs.Electrumx.unconfirmed(['bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf', 'bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v']);
   *     console.log(mempool);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   *   mempool = {
   *     "success": true,
   *     "utxos": [
   *       {
   *         "utxos": [
   *           {
   *             "height": 604392,
   *             "tx_hash": "7774e449c5a3065144cefbc4c0c21e6b69c987f095856778ef9f45ddd8ae1a41",
   *             "fee": 24310
   *           },
   *           {
   *             "height": 630834,
   *             "tx_hash": "4fe60a51e0d8f5134bfd8e5f872d6e502d7f01b28a6afebb27f4438a4f638d53",
   *             "fee": 3000
   *           }
   *         ],
   *         "address": "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"
   *       },
   *       {
   *         "utxos": [],
   *         "address": "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
   *       }
   *     ]
   *   }
   *
   */
  async unconfirmed (address) {
    try {
      // Handle single address.
      if (typeof address === 'string') {
        const response = await axios.get(
          `${this.restURL}electrumx/unconfirmed/${address}`,
          this.axiosOptions
        )
        return response.data

        // Handle array of addresses.
      } else if (Array.isArray(address)) {
        const response = await axios.post(
          `${this.restURL}electrumx/unconfirmed`,
          {
            addresses: address
          },
          this.axiosOptions
        )

        return response.data
      }

      throw new Error('Input address must be a string or array of strings.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Electrumx.blockHeader()  blockHeader()
   * @apiName ElectrumX Block headers
   * @apiGroup ElectrumX
   * @apiDescription Return block headers for a given height
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     let headers = await bchjs.Electrumx.blockHeaders(42);
   *     console.log(headers);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * headers = {
   *  "success": true,
   *  "headers": [
   *    "010000008b52bbd72c2f49569059f559c1b1794de5192e4f7d6d2b03c7482bad0000000083e4f8a9d502ed0c419075c1abb5d56f878a2e9079e5612bfb76a2dc37d9c42741dd6849ffff001d2b909dd6",
   *    "01000000f528fac1bcb685d0cd6c792320af0300a5ce15d687c7149548904e31000000004e8985a786d864f21e9cbb7cbdf4bc9265fe681b7a0893ac55a8e919ce035c2f85de6849ffff001d385ccb7c"
   *  ]
   * }
   *
   * (async () => {
   *   try {
   *     let headers = await bchjs.Electrumx.blockHeaders(42, 1);
   *     console.log(headers);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * headers = {
   *  "success": true,
   *  "headers": [
   *    "010000008b52bbd72c2f49569059f559c1b1794de5192e4f7d6d2b03c7482bad0000000083e4f8a9d502ed0c419075c1abb5d56f878a2e9079e5612bfb76a2dc37d9c42741dd6849ffff001d2b909dd6"
   *  ]
   * }
   *
   */
  async blockHeader (height, count = 1) {
    try {
      const response = await axios.get(
        `${this.restURL}electrumx/block/headers/${height}?count=${count}`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      // console.log("error: ", error)
      if (error.response && error.response.data) {
        if (error.response && error.response.data) {
          throw new Error(error.response.data.error)
        } else throw error.response.data
      } else {
        throw error
      }
    }
  }

  /**
   * @api Electrumx.txData() txData()
   * @apiName ElectrumX txData
   * @apiGroup ElectrumX
   * @apiDescription Returns an object with transaction details of the TXID
   *
   * @apiExample Example usage:
   *    (async () => {
   *   try {
   *     let result = await bchjs.Electrumx.txData('4db095f34d632a4daf942142c291f1f2abb5ba2e1ccac919d85bdc2f671fb251')
   *     console.log(result);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * result = {
   *   "success": true,
   *   "details": {
   *      "blockhash": "0000000000000000002aaf94953da3b487317508ebd1003a1d75d6d6ec2e75cc",
   *      "blocktime": 1578327094,
   *      "confirmations": 31861,
   *      "hash": "4db095f34d632a4daf942142c291f1f2abb5ba2e1ccac919d85bdc2f671fb251",
   *      ...
   *      "vin": [
   *        {
   *          "scriptSig": {
   *          ...
   *      "vout": [
   *        {
   *          "n": 0,
   *          "scriptPubKey": {
   *          "addresses": [
   *             "bitcoincash: pqvfecpwxvj53ayqfwkxtjaxsgpvnklcyg8xewk9hl"
   *          ],
   *        }
   *      ...
   * }
   *
   *    (async () => {
   *   try {
   *     let result = await bchjs.Electrumx.txData(['4db095f34d632a4daf942142c291f1f2abb5ba2e1ccac919d85bdc2f671fb251', '4db095f34d632a4daf942142c291f1f2abb5ba2e1ccac919d85bdc2f671fb251'])
   *     console.log(result);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * result = {
   *   "transactions": [
   *     {
   *        "txid": "4db095f34d632a4daf942142c291f1f2abb5ba2e1ccac919d85bdc2f671fb251",
   *        "details": {
   *           "blockhash": "0000000000000000002aaf94953da3b487317508ebd1003a1d75d6d6ec2e75cc",
   *           "blocktime": 1578327094,
   *           "confirmations": 31861,
   *           "hash": "4db095f34d632a4daf942142c291f1f2abb5ba2e1ccac919d85bdc2f671fb251",
   *           ...
   *        }
   *     },
   *     {
   *        "txid": "4db095f34d632a4daf942142c291f1f2abb5ba2e1ccac919d85bdc2f671fb251",
   *        "details": {
   *           "blockhash": "0000000000000000002aaf94953da3b487317508ebd1003a1d75d6d6ec2e75cc",
   *           "blocktime": 1578327094,
   *        ...
   *     }
   *   ]
   * }
   */
  async txData (txid) {
    try {
      // Handle single transaction.
      if (typeof txid === 'string') {
        const response = await axios.get(
          `${this.restURL}electrumx/tx/data/${txid}`,
          this.axiosOptions
        )
        return response.data
      } else if (Array.isArray(txid)) {
        const response = await axios.post(
          `${this.restURL}electrumx/tx/data`,
          {
            txids: txid
          },
          this.axiosOptions
        )

        return response.data
      }

      throw new Error('Input txId must be a string or array of strings.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Electrumx.broadcast()  broadcast()
   * @apiName ElectrumX Broadcast
   * @apiGroup ElectrumX
   * @apiDescription Broadcast a raw transaction and return the transaction ID on success or error on failure.
   *
   *    (async () => {
   *   try {
   *     const txHex = "020000000265d13ef402840c8a51f39779afb7ae4d49e4b0a3c24a3d0e7742038f2c679667010000006441dd1dd72770cadede1a7fd0363574846c48468a398ddfa41a9677c74cac8d2652b682743725a3b08c6c2021a629011e11a264d9036e9d5311e35b5f4937ca7b4e4121020797d8fd4d2fa6fd7cdeabe2526bfea2b90525d6e8ad506ec4ee3c53885aa309ffffffff65d13ef402840c8a51f39779afb7ae4d49e4b0a3c24a3d0e7742038f2c679667000000006441347d7f218c11c04487c1ad8baac28928fb10e5054cd4494b94d078cfa04ccf68e064fb188127ff656c0b98e9ce87f036d183925d0d0860605877d61e90375f774121028a53f95eb631b460854fc836b2e5d31cad16364b4dc3d970babfbdcc3f2e4954ffffffff035ac355000000000017a914189ce02e332548f4804bac65cba68202c9dbf822878dfd0800000000001976a914285bb350881b21ac89724c6fb6dc914d096cd53b88acf9ef3100000000001976a91445f1f1c4a9b9419a5088a3e9c24a293d7a150e6488ac00000000"
   *     let result = await bchjs.Electrumx.broadcast(txHex)
   *     console.log(result);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * result = {
   *  "success": true,
   *  "txid": "..."
   * }
   */
  async broadcast (txHex) {
    try {
      if (typeof txHex === 'string') {
        const response = await axios.post(
          `${this.restURL}electrumx/tx/broadcast`,
          { txHex },
          this.axiosOptions
        )

        return response.data
      }

      throw new Error('Input txHex must be a string.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Electrumx.sortConfTxs()  sortConfTxs()
   * @apiName ElectrumX sortConfTxs
   * @apiGroup ElectrumX
   * @apiDescription Sort the output of Electrum.transactions() by block height.
   *
   * A simple sort function for the output of Electrum.transactions(). Ignores
   * unconfirmed transactions.
   *
   * Sorts in 'DESCENDING' order by default, or 'ASCENDING' can be specified.
   * Descending makes the first element the newest (largest block height).
   *
   * @apiExample Example usage:
   *    (async () => {
   *      const txs = await bchjs.Electrumx.transactions('bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v')
   *      const sortedTxs = bchjs.Electrumx.sortConfTxs(txs.transactions, 'ASCENDING')
   *      console.log(sortedTxs)
   *    })()
   *
   * //   [
   * //     {
   * //       "height": 560430,
   * //       "tx_hash": "3e1f3e882be9c03897eeb197224bf87f312be556a89f4308fabeeeabcf9bc851"
   * //     },
   * //     {
   * //       "height": 560534,
   * //       "tx_hash": "4ebbeaac51ce141e262964e3a0ce11b96ca72c0dffe9b4127ce80135f503a280"
   * //     }
   * //   ]
   */
  // Sort confirmed Transactions by the block height
  sortConfTxs (txs, sortingOrder = 'DESCENDING') {
    try {
      // console.log(`sortConfTxs txs: ${JSON.stringify(txs, null, 2)}`)

      // Filter out unconfirmed transactions, with a height of 0 or less.
      txs = txs.filter(elem => elem.height > 0)

      if (sortingOrder === 'DESCENDING') {
        // console.log('Sorting in descending order')
        return txs.sort((a, b) => {
          // console.log(`descending b.height: ${b.height}, a.height: ${a.height}`)
          return b.height - a.height
        })
      }

      // console.log('Sorting in ascending order')
      return txs.sort((a, b) => {
        // console.log(`ascending b.height: ${b.height}, a.height: ${a.height}`)
        return a.height - b.height
      })
    } catch (err) {
      console.log('Error in util.js/sortConfTxs()')
      throw err
    }
  }

  /**
   * @api Electrumx.sortAllTxs()  sortAllTxs()
   * @apiName ElectrumX sortAllTxs
   * @apiGroup ElectrumX
   * @apiDescription Sort the output of Electrum.transactions() by block height.
   *
   * A simple sort function for the output of Electrum.transactions().
   * Assumes that unconfirmed transactions will make it into the next block. Any
   * unconfirmed transactions have their block height with the height of the next
   * block. Returns a Promise.
   *
   * Sorts in 'ASCENDING' order by default, or 'DESCENDING' can be specified.
   *
   * @apiExample Example usage:
   *    (async () => {
   *      const txs = await bchjs.Electrumx.transactions('bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v')
   *      const sortedTxs = await bchjs.Electrumx.sortAllTxs(txs.transactions, 'ASCENDING')
   *      console.log(sortedTxs)
   *    })()
   *
   * //   [
   * //     {
   * //       "height": 560430,
   * //       "tx_hash": "3e1f3e882be9c03897eeb197224bf87f312be556a89f4308fabeeeabcf9bc851"
   * //     },
   * //     {
   * //       "height": 560534,
   * //       "tx_hash": "4ebbeaac51ce141e262964e3a0ce11b96ca72c0dffe9b4127ce80135f503a280"
   * //     }
   * //   ]
   */
  // Substitute zero-conf txs with the current block-height + 1
  async sortAllTxs (txs, sortingOrder = 'DESCENDING') {
    try {
      // console.log(`sortingOrder: ${sortingOrder}`)

      // Calculate the height of the next block
      const nextBlock = (await this.blockchain.getBlockCount()) + 1

      // Replace the height of any zero-conf transactions with the height of
      // the next block.
      const modifiedTxs = txs.map(elem => {
        if (elem.height <= 0) elem.height = nextBlock
        return elem
      })
      // console.log(`modifiedTxs: ${JSON.stringify(modifiedTxs, null, 2)}`)

      // Sort the modified array of transactions.
      return this.sortConfTxs(modifiedTxs, sortingOrder)
    } catch (err) {
      console.log('Error in util.js/sort0ConfTxs')
      console.log('electrumx.js restURL: ', this.restURL)

      throw err
    }
  }
}

module.exports = ElectrumX

```

`/home/trout/work/psf/code/bch-js/src/mining.js`:

```js
const axios = require('axios')

// let _this

class Mining {
  constructor (config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.authToken = config.authToken

    if (this.authToken) {
      // Add Basic Authentication token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: this.authToken
        }
      }
    } else {
      // Add JWT token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: `Token ${this.apiToken}`
        }
      }
    }

    // _this = this
  }

  async getBlockTemplate (templateRequest) {
    try {
      const response = await axios.get(
        `${this.restURL}mining/getBlockTemplate/${templateRequest}`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getMiningInfo () {
    try {
      const response = await axios.get(
        `${this.restURL}mining/getMiningInfo`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getNetworkHashps (nblocks = 120, height = 1) {
    try {
      const response = await axios.get(
        `${this.restURL}mining/getNetworkHashps?nblocks=${nblocks}&height=${height}`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async submitBlock (hex, parameters) {
    let path = `${this.restURL}mining/submitBlock/${hex}`
    if (parameters) path = `${path}?parameters=${parameters}`

    try {
      const response = await axios.post(path, this.axiosOptions)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = Mining

```

`/home/trout/work/psf/code/bch-js/src/price.js`:

```js
const axios = require('axios')

// let _this

class Price {
  constructor (config) {
    // _this = this

    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.authToken = config.authToken

    if (this.authToken) {
      // Add Basic Authentication token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: this.authToken
        }
      }
    } else {
      // Add JWT token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: `Token ${this.apiToken}`
        }
      }
    }

    this.axios = axios
  }

  // This endpoint is deprecated. Documentation removed.
  // async current (currency = 'usd') {
  //   try {
  //     const response = await this.axios.get(
  //       `https://index-api.bitcoin.com/api/v0/cash/price/${currency.toLowerCase()}`
  //     )
  //     // console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`)
  //
  //     return response.data.price
  //   } catch (err) {
  //     if (err.response && err.response.data) throw err.response.data
  //     else throw err
  //   }
  // }

  /**
   * @api price.getUsd() getUsd()
   * @apiName Price getUsd()
   * @apiGroup Price
   * @apiDescription Return current price of BCH in USD.
   * This endpoint gets the USD price of BCH from the Coinbase API. The price
   * comes from bch-api, so it has a better chance of working in Tor.
   *
   * @apiExample Example usage:
   *(async () => {
   *  try {
   *    let current = await bchjs.Price.getUsd();
   *    console.log(current);
   *  } catch(err) {
   *   console.error(err)
   *  }
   *})()
   *
   * // 266.81
   */
  async getUsd () {
    try {
      const response = await this.axios.get(
        `${this.restURL}price/usd`,
        this.axiosOptions
      )
      // console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`)

      return response.data.usd
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data
      else throw err
    }
  }

  /**
   * @api price.rates() rates()
   * @apiName Price rates()
   * @apiGroup Price
   * @apiDescription Return current price of BCH in several different currencies.
   * This endpoint gets the price of BCH from the Coinbase API in many different
   * currencies. The price
   * comes from bch-api, so it has a better chance of working in Tor.
   *
   * @apiExample Example usage:
   *(async () => {
   *  try {
   *    let current = await bchjs.Price.rates();
   *    console.log(current);
   *  } catch(err) {
   *   console.error(err)
   *  }
   *})()
   *
   * {
   *   AED: "915.049218",
   *   AFN: "19144.48874646",
   *   ALGO: "826.6633482661356600405",
   *   ...
   *   ZRX: "644.844402797695193656",
   *   ZWL: "80215.03"
   * }
   */
  async rates () {
    try {
      const response = await this.axios.get(
        `${this.restURL}price/rates`,
        this.axiosOptions
      )
      // console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`)

      return response.data
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data
      else throw err
    }
  }

  /**
   * @api price.getBchaUsd() getBchaUsd()
   * @apiName Price getBchaUsd()
   * @apiGroup Price
   * @apiDescription Return current price of BCHA in USD.
   * This endpoint gets the USD price of XEC from the Coinex API. The price
   * denominated in BCHA comes from bch-api, so it has a better chance of
   * working in Tor.
   *
   * @apiExample Example usage:
   *(async () => {
   *  try {
   *    let current = await bchjs.Price.getBchaUsd();
   *    console.log(current);
   *  } catch(err) {
   *   console.error(err)
   *  }
   *})()
   *
   * // 212.34
   */
  async getBchaUsd () {
    try {
      const response = await this.axios.get(
        `${this.restURL}price/bchausd`,
        this.axiosOptions
      )
      // console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`)

      const bchaPrice = response.data.usd * 1000000
      // Convert XEC denomination to BCHA denomination

      return bchaPrice
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data
      else throw err
    }
  }

  /**
   * @api price.getXecUsd() getXecUsd()
   * @apiName Price getXecUsd()
   * @apiGroup Price
   * @apiDescription Return current price of XEC in USD.
   * This endpoint gets the USD price of XEC from the Coinex API. The price
   * comes from bch-api, so it has a better chance of working in Tor.
   *
   * @apiExample Example usage:
   *(async () => {
   *  try {
   *    let current = await bchjs.Price.getXecUsd();
   *    console.log(current);
   *  } catch(err) {
   *   console.error(err)
   *  }
   *})()
   *
   * // 0.00021234
   */
  async getXecUsd () {
    try {
      const response = await this.axios.get(
        `${this.restURL}price/bchausd`,
        this.axiosOptions
      )
      // console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`)

      return response.data.usd
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data
      else throw err
    }
  }

  /**
   * @api price.getBchUsd() getBchUsd()
   * @apiName Price getBchUsd()
   * @apiGroup Price
   * @apiDescription Return current price of BCH in USD.
   * This endpoint gets the USD price of BCH from the Coinex API. The price
   * comes from bch-api, so it has a better chance of working in Tor.
   *
   * @apiExample Example usage:
   *(async () => {
   *  try {
   *    let current = await bchjs.Price.getBchUsd();
   *    console.log(current);
   *  } catch(err) {
   *   console.error(err)
   *  }
   *})()
   *
   * // 512.81
   */
  async getBchUsd () {
    try {
      const response = await this.axios.get(
        `${this.restURL}price/bchusd`,
        this.axiosOptions
      )
      // console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`)

      return response.data.usd
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data
      else throw err
    }
  }

  /**
   * @api price.getPsffppPrice() getPsffppPrice()
   * @apiName Price getPsffppPrice()
   * @apiGroup Price
   * @apiDescription Return the cost in PSF tokens to write 1MB of data to the PSFFPP
   * Find out more at PSFFPP.com. This is a IPFS pinning service that can pin
   * up to 100MB per transaction into its network. The cost is denominated in
   * PSF SLP tokens. The endpoint returns the cost to pin 1MB of data to the
   * PSFFPP network.
   *
   * @apiExample Example usage:
   *(async () => {
   *  try {
   *    let current = await bchjs.Price.getPsffppPrice();
   *    console.log(current);
   *  } catch(err) {
   *   console.error(err)
   *  }
   *})()
   *
   * // 0.08335233
   */
  async getPsffppPrice () {
    try {
      const response = await this.axios.get(
         `${this.restURL}price/psffpp`,
         this.axiosOptions
      )

      return response.data.writePrice
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data
      else throw err
    }
  }
}

module.exports = Price

```

`/home/trout/work/psf/code/bch-js/src/schnorr.js`:

```js
const schnorr = require('bip-schnorr')

class Schnorr {
  constructor (config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.authToken = config.authToken

    if (this.authToken) {
      // Add Basic Authentication token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: this.authToken
        }
      }
    } else {
      // Add JWT token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: `Token ${this.apiToken}`
        }
      }
    }
  }

  /**
   * @api Schnorr.sign() sign()
   * @apiName sign
   * @apiGroup Schnorr
   * @apiDescription
   * Sign a 32-byte message with the private key, returning a 64-byte signature.
   *
   * @apiExample Example usage:
   * const Buffer = require("safe-buffer").Buffer
   * const BigInteger = require("bigi")
   *
   * // signing
   * const privateKey = BigInteger.fromHex(
   * "B7E151628AED2A6ABF7158809CF4F3C762E7160F38B4DA56A784D9045190CFEF"
   * )
   * const message = Buffer.from(
   * "243F6A8885A308D313198A2E03707344A4093822299F31D0082EFA98EC4E6C89",
   * "hex"
   * )
   * const createdSignature = bchjs.Schnorr.sign(privateKey, message)
   * console.log("The signature is: " + createdSignature.toString("hex"))
   * // The signature is: 2a298dacae57395a15d0795ddbfd1dcb564da82b0f269bc70a74f8220429ba1d1e51a22ccec35599b8f266912281f8365ffc2d035a230434a1a64dc59f7013fd
   */
  sign (privateKey, message) {
    return schnorr.sign(privateKey, message)
  }

  /**
   * @api Schnorr.verify() verify()
   * @apiName verify
   * @apiGroup Schnorr
   * @apiDescription
   * Verify a 64-byte signature of a 32-byte message against the public key. Throws an Error if verification fails.
   *
   * @apiExample Example usage:
   * const Buffer = require("safe-buffer").Buffer
   * const publicKey = Buffer.from(
   * "02DFF1D77F2A671C5F36183726DB2341BE58FEAE1DA2DECED843240F7B502BA659",
   * "hex"
   * )
   * const message = Buffer.from(
   * "243F6A8885A308D313198A2E03707344A4093822299F31D0082EFA98EC4E6C89",
   * "hex"
   * )
   * const signatureToVerify = Buffer.from(
   * "2A298DACAE57395A15D0795DDBFD1DCB564DA82B0F269BC70A74F8220429BA1D1E51A22CCEC35599B8F266912281F8365FFC2D035A230434A1A64DC59F7013FD",
   * "hex"
   * )
   * try {
   * bchjs.Schnorr.verify(publicKey, message, signatureToVerify)
   * console.log("The signature is valid.")
   * } catch (e) {
   * console.error("The signature verification failed: " + e)
   * }
   */
  verify (publicKey, message, signatureToVerify) {
    return schnorr.verify(publicKey, message, signatureToVerify)
  }

  /**
   * @api Schnorr.batchVerify() batchVerify()
   * @apiName batchVerify
   * @apiGroup Schnorr
   * @apiDescription
   * Verify a list of 64-byte signatures as a batch operation. Throws an Error if verification fails.
   *
   * @apiExample Example usage:
   * const Buffer = require("safe-buffer").Buffer
   * const publicKeys = [
   * Buffer.from(
   * "02DFF1D77F2A671C5F36183726DB2341BE58FEAE1DA2DECED843240F7B502BA659",
   * "hex"
   * ),
   * Buffer.from(
   * "03FAC2114C2FBB091527EB7C64ECB11F8021CB45E8E7809D3C0938E4B8C0E5F84B",
   * "hex"
   * ),
   * Buffer.from(
   * "026D7F1D87AB3BBC8BC01F95D9AECE1E659D6E33C880F8EFA65FACF83E698BBBF7",
   * "hex"
   * )
   * ]
   * const messages = [
   * Buffer.from(
   * "243F6A8885A308D313198A2E03707344A4093822299F31D0082EFA98EC4E6C89",
   * "hex"
   * ),
   * Buffer.from(
   * "5E2D58D8B3BCDF1ABADEC7829054F90DDA9805AAB56C77333024B9D0A508B75C",
   * "hex"
   * ),
   * Buffer.from(
   * "B2F0CD8ECB23C1710903F872C31B0FD37E15224AF457722A87C5E0C7F50FFFB3",
   * "hex"
   * )
   * ]
   * const signatures = [
   * Buffer.from(
   * "2A298DACAE57395A15D0795DDBFD1DCB564DA82B0F269BC70A74F8220429BA1D1E51A22CCEC35599B8F266912281F8365FFC2D035A230434A1A64DC59F7013FD",
   * "hex"
   * ),
   * Buffer.from(
   * "00DA9B08172A9B6F0466A2DEFD817F2D7AB437E0D253CB5395A963866B3574BE00880371D01766935B92D2AB4CD5C8A2A5837EC57FED7660773A05F0DE142380",
   * "hex"
   * ),
   * Buffer.from(
   * "68CA1CC46F291A385E7C255562068357F964532300BEADFFB72DD93668C0C1CAC8D26132EB3200B86D66DE9C661A464C6B2293BB9A9F5B966E53CA736C7E504F",
   * "hex"
   * )
   * ]
   * try {
   * bchjs.Schnorr.batchVerify(publicKeys, messages, signatures)
   * console.log("The signatures are valid.")
   * } catch (e) {
   * console.error("The signature verification failed: " + e)
   * }
   */
  batchVerify (publicKeys, messages, signaturesToVerify) {
    return schnorr.batchVerify(publicKeys, messages, signaturesToVerify)
  }

  /**
   * @api Schnorr.nonInteractive() nonInteractive()
   * @apiName nonInteractive
   * @apiGroup Schnorr
   * @apiDescription
   * Aggregates multiple signatures of different private keys over the same message into a single 64-byte signature using a scheme that is safe from rogue-key attacks.
   *
   * This non-interactive scheme requires the knowledge of all private keys that are participating in the multi-signature creation.
   *
   * @apiExample Example usage:
   * const Buffer = require("safe-buffer").Buffer
   * const BigInteger = require("bigi")
   *
   * const privateKey1 = BigInteger.fromHex(
   * "B7E151628AED2A6ABF7158809CF4F3C762E7160F38B4DA56A784D9045190CFEF"
   * )
   * const privateKey2 = BigInteger.fromHex(
   * "C90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B14E5C7"
   * )
   * const message = Buffer.from(
   * "243F6A8885A308D313198A2E03707344A4093822299F31D0082EFA98EC4E6C89",
   * "hex"
   * )
   * const aggregatedSignature = bchjs.Schnorr.nonInteractive(
   * [privateKey1, privateKey2],
   * message
   * )
   *
   * // verifying an aggregated signature
   * const publicKey1 = Buffer.from(
   * "02DFF1D77F2A671C5F36183726DB2341BE58FEAE1DA2DECED843240F7B502BA659",
   * "hex"
   * )
   * const publicKey2 = Buffer.from(
   * "03FAC2114C2FBB091527EB7C64ECB11F8021CB45E8E7809D3C0938E4B8C0E5F84B",
   * "hex"
   * )
   * const X = bchjs.Schnorr.publicKeyCombine([publicKey1, publicKey2])
   * try {
   * bchjs.Schnorr.verify(X, message, aggregatedSignature)
   * console.log("The signature is valid.")
   * } catch (e) {
   * console.error("The signature verification failed: " + e)
   * }
   */
  nonInteractive (privateKeys, message) {
    return schnorr.muSig.nonInteractive(privateKeys, message)
  }

  /**
   * @api Schnorr.computeEll() computeEll()
   * @apiName computeEll
   * @apiGroup Schnorr
   * @apiDescription
   * Generate ell which is the hash over all public keys participating in a session.
   *
   * @apiExample Example usage:
   * const Buffer = require("safe-buffer").Buffer
   * const BigInteger = require("bigi")
   *
   * const publicData = {
   * pubKeys: [
   * Buffer.from(
   *   "03846f34fdb2345f4bf932cb4b7d278fb3af24f44224fb52ae551781c3a3cad68a",
   *   "hex"
   * ),
   * Buffer.from(
   *   "02cd836b1d42c51d80cef695a14502c21d2c3c644bc82f6a7052eb29247cf61f4f",
   *   "hex"
   * ),
   * Buffer.from(
   *   "03b8c1765111002f09ba35c468fab273798a9058d1f8a4e276f45a1f1481dd0bdb",
   *   "hex"
   * )
   * ],
   * message: bchjs.Schnorr.hash(Buffer.from("muSig is awesome!", "utf8")),
   * pubKeyHash: null,
   * pubKeyCombined: null,
   * commitments: [],
   * nonces: [],
   * nonceCombined: null,
   * partialSignatures: [],
   * signature: null
   * }
   *
   * // data only known by the individual party, these values are never shared
   * // between the signers!
   * const signerPrivateData = [
   * // signer 1
   * {
   * privateKey: BigInteger.fromHex(
   *   "add2b25e2d356bec3770305391cbc80cab3a40057ad836bcb49ef3eed74a3fee"
   * ),
   * session: null
   * },
   * // signer 2
   * {
   * privateKey: BigInteger.fromHex(
   *   "0a1645eef5a10e1f5011269abba9fd85c4f0cc70820d6f102fb7137f2988ad78"
   * ),
   * session: null
   * },
   * // signer 3
   * {
   * privateKey: BigInteger.fromHex(
   *   "2031e7fed15c770519707bb092a6337215530e921ccea42030c15d86e8eaf0b8"
   * ),
   * session: null
   * }
   * ]
   *
   * // -----------------------------------------------------------------------
   * // Step 1: Combine the public keys
   * // The public keys P_i are combined into the combined public key P.
   * // This can be done by every signer individually or by the initializing
   * // party and then be distributed to every participant.
   * // -----------------------------------------------------------------------
   * publicData.pubKeyHash = bchjs.Schnorr.computeEll(publicData.pubKeys)
   */
  computeEll (publicKeys) {
    return schnorr.muSig.computeEll(publicKeys)
  }

  /**
   * @api Schnorr.publicKeyCombine() publicKeyCombine()
   * @apiName publicKeyCombine
   * @apiGroup Schnorr
   * @apiDescription
   * Creates the special rogue-key-resistant combined public key P by applying the MuSig coefficient to each public key P_i before adding them together.
   *
   * @apiExample Example usage:
   * // continued from above
   * publicData.pubKeyCombined = bchjs.Schnorr.publicKeyCombine(
   * publicData.pubKeys,
   * publicData.pubKeyHash
   * )
   */
  publicKeyCombine (publicKeys, publicKeyHash) {
    return schnorr.muSig.pubKeyCombine(publicKeys, publicKeyHash)
  }

  /**
   * @api Schnorr.sessionInitialize() sessionInitialize()
   * @apiName sessionInitialize
   * @apiGroup Schnorr
   * @apiDescription
   * Creates a signing session. Each participant must create a session and must not share the content of the session apart from the commitment and later the nonce.
   *
   * @apiExample Example usage:
   * // continued from above
   * // -----------------------------------------------------------------------
   * // Step 2: Create the private signing session
   * // Each signing party does this in private. The session ID *must* be
   * // unique for every call to sessionInitialize, otherwise it's trivial for
   * // an attacker to extract the secret key!
   * // -----------------------------------------------------------------------
   * signerPrivateData.forEach((data, idx) => {
   * const sessionId = bchjs.Crypto.randomBytes(32) // must never be reused between sessions!
   * data.session = bchjs.Schnorr.sessionInitialize(
   * sessionId,
   * data.privateKey,
   * publicData.message,
   * publicData.pubKeyCombined,
   * publicData.pubKeyHash,
   * idx
   * )
   * })
   * const signerSession = signerPrivateData[0].session
   */
  sessionInitialize (sessionId, privateKey, message, pubKeyCombined, ell, idx) {
    return schnorr.muSig.sessionInitialize(
      sessionId,
      privateKey,
      message,
      pubKeyCombined,
      ell,
      idx
    )
  }

  /**
   * @api Schnorr.sessionNonceCombine() sessionNonceCombine()
   * @apiName sessionNonceCombine
   * @apiGroup Schnorr
   * @apiDescription
   * Combines multiple nonces R_i into the combined nonce R.
   *
   * @apiExample Example usage:
   * // continued from above
   * // -----------------------------------------------------------------------
   * // Step 3: Exchange commitments (communication round 1)
   * // The signers now exchange the commitments H(R_i). This is simulated here
   * // by copying the values from the private data to public data array.
   * // -----------------------------------------------------------------------
   * for (let i = 0; i < publicData.pubKeys.length; i++) {
   * publicData.commitments[i] = signerPrivateData[i].session.commitment
   * }
   *
   * // -----------------------------------------------------------------------
   * // Step 4: Get nonces (communication round 2)
   * // Now that everybody has commited to the session, the nonces (R_i) can be
   * // exchanged. Again, this is simulated by copying.
   * // -----------------------------------------------------------------------
   * for (let i = 0; i < publicData.pubKeys.length; i++) {
   * publicData.nonces[i] = signerPrivateData[i].session.nonce
   * }
   *
   * // -----------------------------------------------------------------------
   * // Step 5: Combine nonces
   * // The nonces can now be combined into R. Each participant should do this
   * // and keep track of whether the nonce was negated or not. This is needed
   * // for the later steps.
   * // -----------------------------------------------------------------------
   * publicData.nonceCombined = bchjs.Schnorr.sessionNonceCombine(
   * signerSession,
   * publicData.nonces
   * )
   * signerPrivateData.forEach(
   * data => (data.session.nonceIsNegated = signerSession.nonceIsNegated)
   * )
   */
  sessionNonceCombine (session, nonces) {
    return schnorr.muSig.sessionNonceCombine(session, nonces)
  }

  /**
   * @api Schnorr.partialSign() partialSign()
   * @apiName partialSign
   * @apiGroup Schnorr
   * @apiDescription
   * Creates a partial signature s_i for a participant.
   *
   * @apiExample Example usage:
   * // continued from above
   * // -----------------------------------------------------------------------
   * // Step 6: Generate partial signatures
   * // Every participant can now create their partial signature s_i over the
   * // given message.
   * // -----------------------------------------------------------------------
   * signerPrivateData.forEach(data => {
   * data.session.partialSignature = bchjs.Schnorr.partialSign(
   * data.session,
   * publicData.message,
   * publicData.nonceCombined,
   * publicData.pubKeyCombined
   * )
   * })
   */
  partialSign (session, message, nonceCombined, pubKeyCombined) {
    return schnorr.muSig.partialSign(
      session,
      message,
      nonceCombined,
      pubKeyCombined
    )
  }

  /**
   * @api Schnorr.partialSignatureVerify() partialSignatureVerify()
   * @apiName partialSignatureVerify
   * @apiGroup Schnorr
   * @apiDescription
   * Verifies a partial signature s_i against the participant's public key P_i. Throws an Error if verification fails.
   *
   * @apiExample Example usage:
   * // continued from above
   * // -----------------------------------------------------------------------
   * // Step 7: Exchange partial signatures (communication round 3)
   * // The partial signature of each signer is exchanged with the other
   * // participants. Simulated here by copying.
   * // -----------------------------------------------------------------------
   * for (let i = 0; i < publicData.pubKeys.length; i++) {
   * publicData.partialSignatures[i] =
   * signerPrivateData[i].session.partialSignature
   * }
   *
   * // -----------------------------------------------------------------------
   * // Step 8: Verify individual partial signatures
   * // Every participant should verify the partial signatures received by the
   * // other participants.
   * // -----------------------------------------------------------------------
   * for (let i = 0; i < publicData.pubKeys.length; i++) {
   * bchjs.Schnorr.partialSignatureVerify(
   * signerSession,
   * publicData.partialSignatures[i],
   * publicData.nonceCombined,
   * i,
   * publicData.pubKeys[i],
   * publicData.nonces[i]
   * )
   * }
   */
  partialSignatureVerify (
    session,
    partialSignature,
    nonceCombined,
    idx,
    pubKey,
    nonce
  ) {
    return schnorr.muSig.partialSigVerify(
      session,
      partialSignature,
      nonceCombined,
      idx,
      pubKey,
      nonce
    )
  }

  /**
   * @api Schnorr.partialSignaturesCombine() partialSignaturesCombine()
   * @apiName partialSignaturesCombine
   * @apiGroup Schnorr
   * @apiDescription
   * Combines multiple partial signatures into a Schnorr signature (s, R) that can be verified against the combined public key P.
   *
   * @apiExample Example usage:
   * // continued from above
   * // -----------------------------------------------------------------------
   * // Step 9: Combine partial signatures
   * // Finally, the partial signatures can be combined into the full signature
   * // (s, R) that can be verified against combined public key P.
   * // -----------------------------------------------------------------------
   * publicData.signature = bchjs.Schnorr.partialSignaturesCombine(
   * publicData.nonceCombined,
   * publicData.partialSignatures
   * )
   *
   * // -----------------------------------------------------------------------
   * // Step 10: Verify signature
   * // The resulting signature can now be verified as a normal Schnorr
   * // signature (s, R) over the message m and public key P.
   * // -----------------------------------------------------------------------
   * bchjs.Schnorr.verify(
   * publicData.pubKeyCombined,
   * publicData.message,
   * publicData.signature
   * )
   */
  partialSignaturesCombine (nonceCombined, partialSignatures) {
    return schnorr.muSig.partialSigCombine(nonceCombined, partialSignatures)
  }

  bufferToInt (buffer) {
    return schnorr.convert.bufferToInt(buffer)
  }

  intToBuffer (bigInteger) {
    return schnorr.convert.intToBuffer(bigInteger)
  }

  hash (buffer) {
    return schnorr.convert.hash(buffer)
  }

  pointToBuffer (point) {
    return schnorr.convert.pointToBuffer(point)
  }

  pubKeyToPoint (publicKey) {
    return schnorr.convert.pubKeyToPoint(publicKey)
  }
}

module.exports = Schnorr

```

`/home/trout/work/psf/code/bch-js/src/mnemonic.js`:

```js
/* eslint no-prototype-builtins: "off" */
/* eslint node/no-callback-literal: "off" */

const BIP39 = require('bip39')
const randomBytes = require('randombytes')
const Bitcoin = require('@psf/bitcoincashjs-lib')
const Buffer = require('safe-buffer').Buffer
const wif = require('wif')

class Mnemonic {
  constructor (address) {
    this._address = address
  }

  /**
   * @api Mnemonic.generate() generate()
   * @apiName generate
   * @apiGroup Mnemonic
   * @apiDescription
   * Generate BIP39 mnemonic from entropy.
   *
   * @apiExample Example usage:
   * // generate 12 word mnemonic
   * bchjs.Mnemonic.generate(128);
   * // boil lonely casino manage habit where total glory muffin name limit mansion
   *
   * // generate 15 word mnemonic
   * bchjs.Mnemonic.generate(160);
   * // steak prevent estate save dance design close noise cheap season among train sleep ketchup gas
   *
   * // generate 18 word mnemonic
   * bchjs.Mnemonic.generate(192);
   * // fever endorse purpose normal fashion desert blood robust prevent clean guard display raise virtual again unit banana rich
   *
   * // generate 21 word mnemonic
   * bchjs.Mnemonic.generate(224);
   * // scan pink shock describe chicken edit budget exit camera morning awesome silk inner pair sea few flock walnut write mountain surface
   *
   * // generate 24 word mnemonic
   * bchjs.Mnemonic.generate(256);
   * // disagree tide elbow citizen jazz cinnamon bridge certain april settle pact film always inmate border inform solution that submit produce cloth balcony upper maid
   *
   * // generate 12 french word mnemonic
   * bchjs.Mnemonic.generate(128, bitbox.Mnemonic.wordLists().french);
   * // annonce ampleur sanglier peser acheter cultiver abroger embellir résoudre dialogue grappin lanterne
   *
   * // generate 256 bit korean word mnemonic
   * bchjs.Mnemonic.generate(256, bitbox.Mnemonic.wordLists().korean)
   * // 기능 단추 교육 비난 시집 근육 운동 코미디 숟가락 과목 한동안 유적 시리즈 삼월 앞날 유난히 흰색 사실 논문 장사 어른 논문 의논 장차
   */
  generate (bits = 128, wordlist) {
    return BIP39.generateMnemonic(bits, randomBytes, wordlist)
  }

  /**
   * @api Mnemonic.fromEntropy() fromEntropy()
   * @apiName fromEntropy
   * @apiGroup Mnemonic
   * @apiDescription
   * Create mnemonic from entropy.
   *
   * @apiExample Example usage:
   * // generate 16 bytes of entropy
   * let entropy = bchjs.Crypto.randomBytes(16);
   * //
   * // turn entropy to 12 word mnemonic
   * bchjs.Mnemonic.fromEntropy(entropy)
   * // security question relief cruel nephew jump chest copper axis assist gift correct
   *
   * // generate 20 bytes of entropy
   * let entropy = bchjs.Crypto.randomBytes(20);
   * //
   * // turn entropy to 15 word mnemonic
   * bchjs.Mnemonic.fromEntropy(entropy)
   * // impact hub pattern turkey cruel adult short moment make toe one actress roast yellow hurt
   *
   * // generate 24 bytes of entropy
   * let entropy = bchjs.Crypto.randomBytes(24);
   * //
   * // turn entropy to 18 word mnemonic
   * bchjs.Mnemonic.fromEntropy(entropy)
   * // bid quantum chronic marriage swing affair record amateur enhance heart object mind spoon speak toast piece chef real
   *
   * // generate 28 bytes of entropy
   * let entropy = bchjs.Crypto.randomBytes(28);
   * //
   * // turn entropy to 21 word mnemonic
   * bchjs.Mnemonic.fromEntropy(entropy)
   * // orchard rural giant okay tape pipe luggage clap bring wear ticket slot fiscal seminar crazy robot distance current dizzy swarm barrel
   *
   * // generate 32 bytes of entropy
   * let entropy = bchjs.Crypto.randomBytes(32);
   * //
   * // turn entropy to 24 word mnemonic
   * bchjs.Mnemonic.fromEntropy(entropy)
   * // vibrant solution level obtain cheap damage october giant chalk cushion assist fossil spawn artist rice edit proof hotel process survey gas sausage mouse property
   *
   * // generate 16 bytes of entropy
   * let entropy = bchjs.Crypto.randomBytes(16);
   * //
   */
  fromEntropy (bytes, wordlist) {
    return BIP39.entropyToMnemonic(bytes, wordlist)
  }

  /**
   * @api Mnemonic.toEntropy() toEntropy()
   * @apiName toEntropy
   * @apiGroup Mnemonic
   * @apiDescription
   * Turn mnemonic to entropy.
   *
   * @apiExample Example usage:
   * // turn 12 word mnemonic to entropy
   * let mnemonic = 'security question relief cruel nephew jump chest copper axis assist gift correct';
   * bchjs.Mnemonic.toEntropy(mnemonic)
   * // <Buffer c2 d5 f2 d5 1a 49 44 f1 c9 e1 7f 10 e1 b9 87 18>
   *
   * // turn 15 word mnemonic to entropy
   * let mnemonic = 'impact hub pattern turkey cruel adult short moment make toe one actress roast yellow hurt';
   * bchjs.Mnemonic.toEntropy(mnemonic)
   * // <Buffer 71 cd d2 85 75 53 48 07 b1 b4 77 86 9c 72 6a 81 6b b1 fe 1b>
   *
   * // turn 18 word mnemonic to entropy
   * let mnemonic = 'bid quantum chronic marriage swing affair record amateur enhance heart object mind spoon speak toast piece chef real';
   * bchjs.Mnemonic.toEntropy(mnemonic)
   * // <Buffer 16 15 e8 a1 c4 2d c0 08 ac f0 3d 4a 8d 4a 60 46 7d 29 a1 b8 c5 23 27 56>
   *
   * // turn 21 word mnemonic to entropy
   * let mnemonic = 'orchard rural giant okay tape pipe luggage clap bring wear ticket slot fiscal seminar crazy robot distance current dizzy swarm barrel';
   * bchjs.Mnemonic.toEntropy(mnemonic)
   * // <Buffer 9c 17 b1 86 cc fd dd 4a a1 31 4e 1c 3f 0f 86 e6 05 79 87 0c b5 d9 3f a6 c1 00 ed b1>
   *
   * // turn 24 word mnemonic to entropy
   * let mnemonic = 'vibrant solution level obtain cheap damage october giant chalk cushion assist fossil spawn artist rice edit proof hotel process survey gas sausage mouse property';
   * bchjs.Mnemonic.toEntropy(mnemonic)
   * // <Buffer f3 79 da 02 cc 42 6e 6e 26 43 0d 25 e6 cc 37 2d fd 0a 1a 2e 4a 33 ac 4d c6 ae 6d 56 01 7f 64 2d>
   */
  toEntropy (mnemonic, wordlist) {
    return Buffer.from(BIP39.mnemonicToEntropy(mnemonic, wordlist), 'hex')
  }

  /**
   * @api Mnemonic.validate() validate()
   * @apiName validate
   * @apiGroup Mnemonic
   * @apiDescription
   * Validate mnemonic.
   *
   * @apiExample Example usage:
   * bchjs.Mnemonic.validate('ca', bchjs.Mnemonic.wordLists().english)
   * // ca is not in wordlist, did you mean cabbage?
   *
   * bchjs.Mnemonic.validate('boil lonely casino manage habit where total glory muffin name limit mansion', bitbox.Mnemonic.wordLists().english)
   * // Valid mnemonic
   *
   * bchjs.Mnemonic.validate('boil lonely casino manage habit where total glory muffin name limit mansion boil lonely casino manage habit where total glory muffin name limit mansion', bitbox.Mnemonic.wordLists().english)
   * // Invalid mnemonic
   */
  validate (mnemonic, wordlist) {
    // Preprocess the words
    const words = mnemonic.split(' ')
    // Detect blank phrase
    if (words.length === 0) return 'Blank mnemonic'

    // Check each word
    for (let i = 0; i < words.length; i++) {
      const word = words[i]
      if (wordlist.indexOf(word) === -1) {
        // Finding closest match to word
        const nearestWord = this.findNearestWord(word, wordlist)
        return `${word} is not in wordlist, did you mean ${nearestWord}?`
      }
    }
    // Check the words are valid
    // const properPhrase = words.join()
    const isValid = BIP39.validateMnemonic(mnemonic, wordlist)
    if (!isValid) return 'Invalid mnemonic'

    return 'Valid mnemonic'
  }

  /**
   * @api Mnemonic.toSeed() toSeed()
   * @apiName toSeed
   * @apiGroup Mnemonic
   * @apiDescription
   * Create root seed from mnemonic. Returns a Promise.
   *
   * @apiExample Example usage:
   * await bchjs.Mnemonic.toSeed('enable stem left method one submit coach bid inspire cluster armed bracket')
   * // <Buffer 0a fa b7 46 8f 0c df 79 0f 0e 44 37 45 0c 33 c3 c8 27 17 42 75 d6 13 02 c3 55 de ef 2e 69 57 e4 f5 dd 55 b6 a8 73 78 6d b8 09 36 75 af 4f 6b 2c 52 63 ... >
   *
   * await bchjs.Mnemonic.toSeed('vendor talk alone sick balance tissue number armor frequent plug transfer chest', 'password');
   * // <Buffer 2d a5 46 52 36 a4 1c 90 bf c5 38 c9 78 16 03 26 1f 70 7c 67 44 aa e0 97 fa 96 1b a1 23 16 a0 e2 0c f6 ac b6 09 cc 2f af 9a 99 50 b3 f9 a9 be c9 f4 19 ... >
   *
   * await bchjs.Mnemonic.toSeed('idea relax weird defense body bronze champion ancient vocal peanut similar dose grit company peasant gate sunset deal library act include penalty annual main', '');
   * // <Buffer c1 56 36 5b 0f 2a 16 04 dd 6f 53 ad 7d 0a 4c 14 ba 38 f9 81 fb 18 0f df c3 14 6e 6a fc d8 af 2f 1f c4 2c b2 d3 65 8a 31 2e a8 48 59 12 bd f0 f1 8d e4 ... >
   *
   * await bchjs.Mnemonic.toSeed('bus aware census desk orphan zebra fashion host try muscle pig close jealous slice elegant prison reject ship great program trumpet syrup tray remove', '');
   * // <Buffer f4 2c e8 e1 88 d1 5a 66 5c 18 c0 cf ae df 09 3c 75 d2 4c 47 9d 52 87 f4 be c0 6b 13 e7 da 04 01 a3 50 36 87 22 1f ee cf c8 57 e8 6e ae bb 17 4b 83 60 ... >
   *
   * await bchjs.Mnemonic.toSeed('frost deliver coin clutch upon round scene wonder various wise luggage country', 'yayayayay');
   * // <Buffer 1d 00 9f a3 a8 86 51 a4 04 d5 03 3d eb 6d b1 01 e2 f1 3b c3 c8 6d 1f b9 93 b4 d1 33 dc 84 21 12 2c 9b 52 10 ba d8 96 15 e0 b0 9a 34 33 52 f8 07 c8 c4 ... >
   */
  toSeed (mnemonic, password = '') {
    return BIP39.mnemonicToSeed(mnemonic, password)
  }

  /**
   * @api Mnemonic.wordLists() wordLists()
   * @apiName wordLists
   * @apiGroup Mnemonic
   * @apiDescription
   * Return mnemonic word lists.
   *
   * @apiExample Example usage:
   * bchjs.Mnemonic.wordLists();
   * // {
   * //   EN: [],
   * //   JA: [],
   * //   chinese_simplified: [],
   * //   chinese_traditional: [],
   * //   english: [],
   * //   french: [],
   * //   italian: [],
   * //   japanese: [],
   * //   korean: [],
   * //   spanish: []
   * // }
   */
  wordLists () {
    return BIP39.wordlists
  }

  /**
   * @api Mnemonic.toKeypairs() toKeypairs()
   * @apiName toKeypairs
   * @apiGroup Mnemonic
   * @apiDescription
   * Returns an array of privateKeyWIF/publicAddress pairs. It generates the addresses as the nth external change address of the first account from that mnemonic w/ this derivation path: m/44’/145’/0’/0/n
   *
   * @apiExample Example usage:
   * // First create a mnemonic from 32 bytes of random entropy
   * let entropy = bchjs.Crypto.randomBytes(32);
   * // <Buffer bd 94 ad 86 be 19 5e 6c 51 b1 aa 52 b3 61 0b f8 9a 5d db 43 ac ee 8a ea 3a 38 6c ac 75 9e b5 42>
   * let mnemonic = bchjs.Mnemonic.fromEntropy(entropy);
   * // rural pistol giant label nominee curtain egg crystal famous only drill van place unit attitude oven memory fade mix sun shrug soon steak easily
   *
   * // Then call toKeypairs and pass in your mnemonic and how many keypairs you'd like
   * bchjs.Mnemonic.toKeypairs(mnemonic, 5)
   * // [ { privateKeyWIF: 'KwuSgSuV6m3U1oahRQEhSQ6e4gRE6LZXNGDTETGPGotKQJdH7ADd',
   * //     address: 'bitcoincash:qqvk7aculs8r6t29pj23de35t43tupks2ua6wmc2hy' },
   * //   { privateKeyWIF: 'L34pfoBm2swLBX5vAx1ReeYbSnpsvu7DRVaiLW8e9wNEJw5p3mV5',
   * //     address: 'bitcoincash:qzt8ju6au2075cpzrhzwe5n96ycqnurarur5k92nd5' },
   * //   { privateKeyWIF: 'L2nCRgDzmTRrQzSssFvVA7xiYHBJyfj62jdDwu1bTjHKVoLGxsqs',
   * //     address: 'bitcoincash:qpdjwtyvqqaapykxr3pr6cty4gpww30aucam9l0qzn' },
   * //   { privateKeyWIF: 'KyDLLa4RZKhnBP78Ue6557B55Jmffu1y8mH8p8WKA12knJUjiq4u',
   * //     address: 'bitcoincash:qq8kee4k4h9fn22xya9p5u203vg69aat3usqdvkdkn' },
   * //   { privateKeyWIF: 'L5gB66JqhfouEtZG5aRMQ9JaVS2ggkK3YozGfzZegBupaPXqdfaz',
   * //     address: 'bitcoincash:qphwlpu2wzjxrjts94pn4wh778fwsu2afg2aj5her9' } ]
   */
  async toKeypairs (mnemonic, numberOfKeypairs = 1, regtest = false) {
    const rootSeedBuffer = await this.toSeed(mnemonic, '')
    const hdNode = Bitcoin.HDNode.fromSeedBuffer(rootSeedBuffer)
    const HDPath = "44'/145'/0'/0/"

    const accounts = []

    for (let i = 0; i < numberOfKeypairs; i++) {
      const childHDNode = hdNode.derivePath(`${HDPath}${i}`)

      let prefix = 128
      if (regtest === true) prefix = 239

      accounts.push({
        privateKeyWIF: wif.encode(
          prefix,
          childHDNode.keyPair.d.toBuffer(32),
          true
        ),
        address: this._address.toCashAddress(
          childHDNode.getAddress(),
          true,
          regtest
        )
      })
    }
    return accounts
  }

  /**
   * @api Mnemonic.findNearestWord() findNearestWord()
   * @apiName findNearestWord
   * @apiGroup Mnemonic
   * @apiDescription
   * Returns nearest matching word from provided word list.
   *
   * @apiExample Example usage:
   * // english
   * let word = 'ab';
   * let wordlist = bchjs.Mnemonic.wordLists().english;
   * bchjs.Mnemonic.findNearestWord(word, wordlist);
   * // abandon
   *
   * // french
   * let word = 'octu';
   * let wordlist = bchjs.Mnemonic.wordLists().french;
   * bchjs.Mnemonic.findNearestWord(word, wordlist);
   * // octupler
   *
   * // spanish
   * let word = 'foobaro';
   * let wordlist = bchjs.Mnemonic.wordLists().spanish;
   * bchjs.Mnemonic.findNearestWord(word, wordlist);
   * // forro
   *
   * // italian
   * let word = 'nv';
   * let wordlist = bchjs.Mnemonic.wordLists().italian;
   * bchjs.Mnemonic.findNearestWord(word, wordlist);
   * // neve
   */
  findNearestWord (word, wordlist) {
    let minDistance = 99
    let closestWord = wordlist[0]
    for (let i = 0; i < wordlist.length; i++) {
      const comparedTo = wordlist[i]
      if (comparedTo.indexOf(word) === 0) return comparedTo

      const distance = Levenshtein.get(word, comparedTo)
      if (distance < minDistance) {
        closestWord = comparedTo
        minDistance = distance
      }
    }
    return closestWord
  }
}

module.exports = Mnemonic

// The following code is from: https://raw.githubusercontent.com/iancoleman/bip39/7ff86d4c983f1e8c80b87b31acfd69fcf98c1b82/src/js/levenshtein.js

/**
 * Extend an Object with another Object's properties.
 *
 * The source objects are specified as additional arguments.
 *
 * @param dst Object the object to extend.
 *
 * @return Object the final object.
 */

const _extend = function (dst) {
  const sources = Array.prototype.slice.call(arguments, 1)
  for (let i = 0; i < sources.length; ++i) {
    const src = sources[i]
    for (const p in src) if (src.hasOwnProperty(p)) dst[p] = src[p]
  }
  return dst
}

/**
 * Defer execution of given function.
 * @param  {Function} func
 */
const _defer = function (func) {
  if (typeof setImmediate === 'function') return setImmediate(func)

  return setTimeout(func, 0)
}

/**
 * Based on the algorithm at http://en.wikipedia.org/wiki/Levenshtein_distance.
 */
const Levenshtein = {
  /**
   * Calculate levenshtein distance of the two strings.
   *
   * @param str1 String the first string.
   * @param str2 String the second string.
   * @return Integer the levenshtein distance (0 and above).
   */
  get: function (str1, str2) {
    // base cases
    if (str1 === str2) return 0
    if (str1.length === 0) return str2.length
    if (str2.length === 0) return str1.length

    // two rows
    const prevRow = new Array(str2.length + 1)
    let curCol, nextCol, i, j, tmp

    // initialise previous row
    for (i = 0; i < prevRow.length; ++i) prevRow[i] = i

    // calculate current row distance from previous row
    for (i = 0; i < str1.length; ++i) {
      nextCol = i + 1

      for (j = 0; j < str2.length; ++j) {
        curCol = nextCol

        // substution
        nextCol = prevRow[j] + (str1.charAt(i) === str2.charAt(j) ? 0 : 1)
        // insertion
        tmp = curCol + 1
        if (nextCol > tmp) nextCol = tmp

        // deletion
        tmp = prevRow[j + 1] + 1
        if (nextCol > tmp) nextCol = tmp

        // copy current col value into previous (in preparation for next iteration)
        prevRow[j] = curCol
      }

      // copy last col value into previous (in preparation for next iteration)
      prevRow[j] = nextCol
    }

    return nextCol
  },

  /**
   * Asynchronously calculate levenshtein distance of the two strings.
   *
   * @param str1 String the first string.
   * @param str2 String the second string.
   * @param cb Function callback function with signature: function(Error err, int distance)
   * @param [options] Object additional options.
   * @param [options.progress] Function progress callback with signature: function(percentComplete)
   */
  getAsync: function (str1, str2, cb, options) {
    options = _extend(
      {},
      {
        progress: null
      },
      options
    )

    // base cases
    if (str1 === str2) return cb(null, 0)
    if (str1.length === 0) return cb(null, str2.length)
    if (str2.length === 0) return cb(null, str1.length)

    // two rows
    const prevRow = new Array(str2.length + 1)
    let curCol, nextCol, i, j, tmp, startTime, currentTime

    // initialise previous row
    for (i = 0; i < prevRow.length; ++i) prevRow[i] = i

    nextCol = 1
    i = 0
    j = -1

    const __calculate = function () {
      // reset timer
      startTime = new Date().valueOf()
      currentTime = startTime

      // keep going until one second has elapsed
      while (currentTime - startTime < 1000) {
        // reached end of current row?
        if (str2.length <= ++j) {
          // copy current into previous (in preparation for next iteration)
          prevRow[j] = nextCol

          // if already done all chars
          if (str1.length <= ++i) return cb(null, nextCol)

          // else if we have more left to do

          nextCol = i + 1
          j = 0
        }

        // calculation
        curCol = nextCol

        // substution
        nextCol = prevRow[j] + (str1.charAt(i) === str2.charAt(j) ? 0 : 1)
        // insertion
        tmp = curCol + 1
        if (nextCol > tmp) nextCol = tmp

        // deletion
        tmp = prevRow[j + 1] + 1
        if (nextCol > tmp) nextCol = tmp

        // copy current into previous (in preparation for next iteration)
        prevRow[j] = curCol

        // get current time
        currentTime = new Date().valueOf()
      }

      // send a progress update?
      if (options.progress !== null) {
        try {
          options.progress.call(null, (i * 100.0) / str1.length)
        } catch (err) {
          return cb(`Progress callback: ${err.toString()}`)
        }
      }

      // next iteration
      _defer(__calculate)
    }

    __calculate()
  }
}

```

`/home/trout/work/psf/code/bch-js/src/util.js`:

```js
const axios = require('axios')

// let _this

class Util {
  constructor (config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.authToken = config.authToken

    if (this.authToken) {
      // Add Basic Authentication token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: this.authToken
        }
      }
    } else {
      // Add JWT token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: `Token ${this.apiToken}`
        }
      }
    }

    // _this = this
  }

  /**
   * @api Util.floor8() floor8()
   * @apiName floor8
   * @apiGroup Util
   * @apiDescription Round a number down to 8 decimal places.
   *
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     const num = 1.234567891111
   *     const result = bchjs.Util.floor8(num)
   *     console.log(result)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * // returns
   *  1.23456789
   */
  // floor8 - round to 8 decimal places
  // Takes a number and returns it, rounded to the nearest 8 decimal place.
  floor8 (num) {
    const thisNum = Number(num)

    if (isNaN(thisNum)) throw new Error('input must be a number')

    let tempNum = thisNum * 100000000
    tempNum = Math.floor(tempNum)
    tempNum = tempNum / 100000000

    return tempNum
  }

  /**
   * @api Util.floor2() floor2()
   * @apiName floor2
   * @apiGroup Util
   * @apiDescription Round a number down to 2 decimal places.
   *
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     const num = 1.234567891111
   *     const result = bchjs.Util.floor2(num)
   *     console.log(result)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * // returns
   *  1.23
   */
  // floor2 - round down to 2 decimal places
  // Takes a number and returns it, rounded to the nearest 2 decimal place.
  floor2 (num) {
    const thisNum = Number(num)

    if (isNaN(thisNum)) throw new Error('input must be a number')

    let tempNum = thisNum * 100
    tempNum = Math.floor(tempNum)
    tempNum = tempNum / 100

    return tempNum
  }

  /**
   * @api Util.chunk20() chunk20()
   * @apiName chunk20
   * @apiGroup Util
   * @apiDescription chunk up an array into multiple arrays of 20 elements each.
   * Input: arrayToSlice - a one-dimensional array of elements.
   * Returns a two-dimensional array. An array of 20-element arrays.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *      const bigArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]
   *
   *      const chunked = bchjs.Util.chunk20(bigArray)
   *      console.log(chunked)
   *   } catch(error) {
   *      console.error(error)
   *   }
   * })()
   *
   * // returns
   *  [
   *    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
   *    [20,21,22,23,24,25,26]
   *  ]
   */
  // chunk20 - chunk up an array into multiple arrays of 20 elements each.
  // Input: arrayToSlice - a one-dimensional array of elements.
  // Returns a two-dimensional array. An array of 20-element arrays.
  chunk20 (arrayToSlice) {
    try {
      // Validate inputs
      if (!Array.isArray(arrayToSlice)) {
        throw new Error('input must be an array')
      }

      let offset = 0
      const result = []

      // Loop over the array and slice off chunks of 20 elements.
      while (offset < arrayToSlice.length) {
        const chunk = arrayToSlice.slice(offset, offset + 20)
        result.push(chunk)
        offset = offset + 20
      }

      return result
    } catch (err) {
      console.error('Error in chunk20()')
      throw err
    }
  }

  /**
   * @api Util.chunk100() chunk100()
   * @apiName chunk100
   * @apiGroup Util
   * @apiDescription chunk up an array into multiple arrays of 100 elements each.
   * Input: arrayToSlice - a one-dimensional array of elements.
   * Returns a two-dimensional array. An array of 100-element arrays.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *      const bigArray = [0,1,2,3,4,5,6,7,8,9,10,...,148, 149, 150]
   *
   *      const chunked = bchjs.Util.chunk20(bigArray)
   *      console.log(chunked)
   *   } catch(error) {
   *      console.error(error)
   *   }
   * })()
   *
   * // returns
   *  [
   *    [0,1,2,3,4,5,6,7,8,9,10,11,...,98,99],
   *    [100,101,102,...,148,149,150]
   *  ]
   */
  chunk100 (arrayToSlice) {
    try {
      // Validate inputs
      if (!Array.isArray(arrayToSlice)) {
        throw new Error('input must be an array')
      }

      let offset = 0
      const result = []

      // Loop over the array and slice off chunks of 100 elements.
      while (offset < arrayToSlice.length) {
        const chunk = arrayToSlice.slice(offset, offset + 100)
        result.push(chunk)
        offset = offset + 100
      }

      return result
    } catch (err) {
      console.error('Error in chunk100()')
      throw err
    }
  }

  /**
   * @api Util.sleep() sleep()
   * @apiName sleep
   * @apiGroup Util
   * @apiDescription Promise-based delay.
   * Expects an integer as input, which represents milliseconds. This function
   * will return a Promise that resolves that many milliseconds later.
   *
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     const tenSeconds = 10000
   *     await bchjs.Util.sleep(tenSeconds)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   */
  sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * @api Util.validateAddress() validateAddress()
   * @apiName Validate Address.
   * @apiGroup Util
   * @apiDescription Return information about the given bitcoin address.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     let validateAddress = await bchjs.Util.validateAddress("bitcoincash:qzc86hrdufhcwlyzk7k82x77kfs2myekn57nv9cw5f");
   *     console.log(validateAddress);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * // { isvalid: true,
   * // address: '17fshh33qUze2yifiJ2sXgijSMzJ2KNEwu',
   * // scriptPubKey: '76a914492ae280d70af33acf0ae7cd329b961e65e9cbd888ac',
   * // ismine: true,
   * // iswatchonly: false,
   * // isscript: false,
   * // pubkey: '0312eeb9ae5f14c3cf43cece11134af860c2ef7d775060e3a578ceec888acada31',
   * // iscompressed: true,
   * // account: 'Test' }
   *
   * (async () => {
   *   try {
   *     let validateAddress = await bchjs.Util.validateAddress(["bitcoincash:qzc86hrdufhcwlyzk7k82x77kfs2myekn57nv9cw5f"]);
   *     console.log(validateAddress);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * // [{ isvalid: true,
   * // address: '17fshh33qUze2yifiJ2sXgijSMzJ2KNEwu',
   * // scriptPubKey: '76a914492ae280d70af33acf0ae7cd329b961e65e9cbd888ac',
   * // ismine: true,
   * // iswatchonly: false,
   * // isscript: false,
   * // pubkey: '0312eeb9ae5f14c3cf43cece11134af860c2ef7d775060e3a578ceec888acada31',
   * // iscompressed: true,
   * // account: 'Test' }]
   */
  async validateAddress (address) {
    try {
      // Single block
      if (typeof address === 'string') {
        const response = await axios.get(
          `${this.restURL}util/validateAddress/${address}`,
          this.axiosOptions
        )
        return response.data

        // Array of blocks.
      } else if (Array.isArray(address)) {
        const options1 = {
          method: 'POST',
          url: `${this.restURL}util/validateAddress`,
          data: {
            addresses: address
          }
          // headers: {
          //   authorization: `Token ${this.apiToken}`
          // }
        }
        const options = Object.assign({}, options1, this.axiosOptions)
        const response = await axios(options)

        return response.data
      }

      throw new Error('Input must be a string or array of strings.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = Util

```

`/home/trout/work/psf/code/bch-js/README.md`:

```md
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

```

`/home/trout/work/psf/code/bch-js/CONTRIBUTING.md`:

```md
# Permissionless Software Foundation Community Contributing Guide 1.0

This document describes a very simple process suitable for most projects under
the PSF umbrella. It is based on [this Medium article](https://medium.com/the-node-js-collection/healthy-open-source-967fa8be7951) and the [Node.js Community Contribution Guide](https://github.com/nodejs/TSC/blob/master/BasePolicies/CONTRIBUTING.md).
Projects are encouraged to adopt this whether they
are hosted under the PSF or not.

The goal of this document is to create a contribution process that:

* Encourages new contributions.
* Encourages contributors to remain involved.
* Avoids unnecessary processes and bureaucracy whenever possible.
* Creates a transparent decision making process which makes it clear how
contributors can be involved in decision making.

This document is based on much prior art in the Node.js community, io.js,
and the Node.js project.

Additional guidance can be found at the [Permissionless Software Foundation Telegram Channel](https://t.me/permissionless_software).

## Vocabulary

* A **Contributor** is any individual creating or commenting on an issue or pull request.
* A **Committer** is a subset of contributors who have been given write access to the repository.
* A **TC (Technical Committee)** is a group of committers representing the required technical
expertise to resolve rare disputes.

# Logging Issues

Log an issue for any question or problem you might have. When in doubt, log an issue,
any additional policies about what to include will be provided in the responses. The only
exception is security disclosures which should be sent privately.

Committers may direct you to another repository, ask for additional clarifications, and
add appropriate metadata before the issue is addressed.

Please be courteous, respectful, and every participant is expected to follow the
project's Code of Conduct.

# Contributions

Any change to resources in this repository must be through pull requests. This applies to all changes
to documentation, code, binary files, etc. Even long term committers and TC members must use
pull requests.

No pull request can be merged without being reviewed.

For non-trivial contributions, pull requests should sit for at least 36 hours to ensure that
contributors in other timezones have time to review. Consideration should also be given to
weekends and other holiday periods to ensure active committers all have reasonable time to
become involved in the discussion and review process if they wish.

The default for each contribution is that it is accepted once no committer has an objection.
During review committers may also request that a specific contributor who is most versed in a
particular area gives a "LGTM" before the PR can be merged. There is no additional "sign off"
process for contributions to land. Once all issues brought by committers are addressed it can
be landed by any committer.

In the case of an objection being raised in a pull request by another committer, all involved
committers should seek to arrive at a consensus by way of addressing concerns being expressed
by discussion, compromise on the proposed change, or withdrawal of the proposed change.

If a contribution is controversial and committers cannot agree about how to get it to land
or if it should land then it should be escalated to the TC. TC members should regularly
discuss pending contributions in order to find a resolution. It is expected that only a
small minority of issues be brought to the TC for resolution and that discussion and
compromise among committers be the default resolution mechanism.

# Becoming a Committer

All contributors who land a non-trivial contribution should be on-boarded in a timely manner,
and added as a committer, and be given write access to the repository.

Committers are expected to follow this policy and continue to send pull requests, go through
proper review, and have other committers merge their pull requests.

# TC Process

The TC uses a "consensus seeking" process for issues that are escalated to the TC.
The group tries to find a resolution that has no open objections among TC members.
If a consensus cannot be reached that has no objections then a majority wins vote
is called. It is also expected that the majority of decisions made by the TC are via
a consensus seeking process and that voting is only used as a last-resort.

Resolution may involve returning the issue to committers with suggestions on how to
move forward towards a consensus. It is not expected that a meeting of the TC
will resolve all issues on its agenda during that meeting and may prefer to continue
the discussion happening among the committers.

Members can be added to the TC at any time. Any committer can nominate another committer
to the TC and the TC uses its standard consensus seeking process to evaluate whether or
not to add this new member. Members who do not participate consistently at the level of
a majority of the other members are expected to resign.

```

`/home/trout/work/psf/code/bch-js/LICENSE.md`:

```md
Copyright 2022 Permissionless Software Foundation contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

`/home/trout/work/psf/code/bch-js/package.json`:

```json
{
  "name": "@psf/bch-js",
  "version": "6.0.0",
  "description": "A JavaScript library for working with Bitcoin Cash, eCash, and SLP Tokens",
  "author": "Chris Troutner <chris.troutner@gmail.com>",
  "contributors": [
    "Gabriel Cardona <gabriel@bitcoin.com>",
    "Stoyan Zhekov <zh@zhware.net>"
  ],
  "main": "src/bch-js",
  "scripts": {
    "test": "nyc mocha --trace-warnings --unhandled-rejections=strict --timeout 30000 test/unit/",
    "test:integration": "npm run test:integration:bchn",
    "test:integration:nft": "export RESTURL=https://bchn.fullstack.cash/v5/ && export IS_USING_FREE_TIER=true && mocha --timeout 30000 -g '#nft1' test/integration/chains/bchn/slp.js",
    "test:integration:abc": "export RESTURL=https://abc.fullstack.cash/v5/ && mocha --timeout 30000 test/integration/ && mocha --timeout 30000 test/integration/chains/abc/",
    "test:integration:bchn": "export RESTURL=https://bchn.fullstack.cash/v5/ && export IS_USING_FREE_TIER=true && mocha --timeout 30000 test/integration/ && mocha --timeout 30000 test/integration/chains/bchn/",
    "test:integration:bchn:slpdb": "export TESTSLP=1 && export RESTURL=https://bchn.fullstack.cash/v5/ && export IS_USING_FREE_TIER=true && mocha --timeout 30000 test/integration/ && mocha --timeout 30000 test/integration/chains/bchn/",
    "test:integration:local:abc": "export RESTURL=http://localhost:3000/v5/ && mocha --timeout 30000 test/integration && mocha --timeout 30000 test/integration/chains/abc/",
    "test:integration:local:bchn": "export RESTURL=http://localhost:3000/v5/ && mocha --timeout 30000 test/integration/ && mocha --timeout 30000 test/integration/chains/bchn/",
    "test:integration:local:testnet": "RESTURL=http://localhost:4000/v5/ mocha --timeout 30000 test/integration/chains/testnet",
    "test:integration:decatur:bchn": "export RESTURL=http://192.168.2.129:3000/v5/ && mocha --timeout 30000 test/integration/ && mocha --timeout 30000 test/integration/chains/bchn/",
    "test:integration:decatur:abc": "export RESTURL=http://192.168.2.142:3000/v5/ && mocha --timeout 30000 test/integration && mocha --timeout 30000 test/integration/chains/abc/",
    "test:integration:temp:bchn": "export RESTURL=http://157.90.174.219:3000/v5/ && mocha --timeout 30000 test/integration/",
    "test:temp": "export RESTURL=http://localhost:3000/v5/ && mocha --timeout 30000 -g '#Encryption' test/integration/",
    "test:temp2": "mocha --timeout=30000 -g '#TransactionLib' test/unit/",
    "test:temp3": "export RESTURL=https://bchn.fullstack.cash/v5/ && mocha --timeout 30000 -g '#DSProof' test/integration/chains/",
    "test:temp4": "export RESTURL=http://localhost:3000/v5/ && mocha --timeout 30000 -g '#decodeOpReturn' test/integration/",
    "coverage": "nyc report --reporter=text-lcov | coveralls",
    "coverage:report": "nyc --reporter=html mocha --timeout 25000 test/unit/",
    "docs": "./node_modules/.bin/apidoc -i src/ -o docs",
    "lint": "standard --env mocha --fix"
  },
  "license": "MIT",
  "homepage": "https://github.com/Permissionless-Software-Foundation/bch-js",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Permissionless-Software-Foundation/bch-js.git"
  },
  "dependencies": {
    "@chris.troutner/bip32-utils": "1.0.5",
    "@psf/bip21": "2.0.1",
    "@psf/bitcoincash-ops": "2.0.0",
    "@psf/bitcoincashjs-lib": "4.0.3",
    "@psf/coininfo": "4.0.0",
    "axios": "1.12.2",
    "bc-bip68": "1.0.5",
    "bchaddrjs-slp": "0.2.5",
    "bigi": "1.4.2",
    "bignumber.js": "9.0.0",
    "bip-schnorr": "0.3.0",
    "bip38": "2.0.2",
    "bip39": "3.0.2",
    "bip66": "1.1.5",
    "bitcoinjs-message": "2.0.0",
    "bs58": "4.0.1",
    "ecashaddrjs": "1.0.7",
    "ini": "1.3.8",
    "randombytes": "2.0.6",
    "safe-buffer": "5.1.2",
    "satoshi-bitcoin": "1.0.4",
    "slp-mdm": "0.0.6",
    "slp-parser": "0.0.4",
    "wif": "2.0.6"
  },
  "devDependencies": {
    "apidoc": "0.50.5",
    "assert": "2.0.0",
    "chai": "4.1.2",
    "coveralls": "3.0.2",
    "eslint": "7.17.0",
    "eslint-config-prettier": "7.1.0",
    "eslint-config-standard": "16.0.3",
    "eslint-plugin-node": "11.1.0",
    "eslint-plugin-prettier": "3.3.1",
    "eslint-plugin-standard": "4.0.0",
    "husky": "4.3.8",
    "lodash.clonedeep": "4.5.0",
    "mocha": "9.2.1",
    "node-mocks-http": "1.7.0",
    "nyc": "15.1.0",
    "semantic-release": "^19.0.2",
    "sinon": "9.2.2",
    "standard": "^16.0.4"
  },
  "apidoc": {
    "title": "bch-js",
    "url": "bchjs."
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint"
    }
  }
}

```