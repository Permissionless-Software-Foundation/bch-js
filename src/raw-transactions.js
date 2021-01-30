const axios = require('axios')

const SlpUtils = require('./slp/utils')

let _this

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

    // Dependencies
    this.slpUtils = new SlpUtils(config)

    _this = this
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
          _this.axiosOptions
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
          headers: {
            authorization: `Token ${_this.apiToken}`
          }
        }
        const response = await axios(options)

        return response.data
      }

      throw new Error('Input must be a string or array of strings.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
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
          _this.axiosOptions
        )

        return response.data
      } else if (Array.isArray(script)) {
        const options = {
          method: 'POST',
          url: `${this.restURL}rawtransactions/decodeScript`,
          data: {
            hexes: script
          },
          headers: {
            authorization: `Token ${this.apiToken}`
          }
        }
        const response = await axios(options)

        return response.data
      }

      throw new Error('Input must be a string or array of strings.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
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
  async getRawTransaction (txid, verbose = false) {
    try {
      if (typeof txid === 'string') {
        const response = await axios.get(
          `${this.restURL}rawtransactions/getRawTransaction/${txid}?verbose=${verbose}`,
          _this.axiosOptions
        )

        return response.data
      } else if (Array.isArray(txid)) {
        const options = {
          method: 'POST',
          url: `${this.restURL}rawtransactions/getRawTransaction`,
          data: {
            txids: txid,
            verbose: verbose
          },
          headers: _this.axiosOptions.headers
        }
        const response = await axios(options)

        return response.data
      }

      throw new Error('Input must be a string or array of strings.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
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
          address: voutSender.scriptPubKey.addresses[0]
        })
      }

      return retArray
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
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
      if (typeof txid !== 'string') {
        throw new Error('Input must be a string or array of strings.')
      }

      // Get the TX details for the transaction under consideration.
      const txDetails = await this.getRawTransaction(txid, true)
      // console.log(`txDetails: ${JSON.stringify(txDetails, null, 2)}`)

      const inAddrs = await this._getInputAddrs(txDetails)
      // console.log(`inAddrs: ${JSON.stringify(inAddrs, null, 2)}`)

      // Add the input address to the transaction data.
      for (let i = 0; i < inAddrs.length; i++) {
        txDetails.vin[i].address = inAddrs[i].address
      }

      return txDetails
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  // Wraps getTxData(), but also appends SLP token information to each input
  // and output of the transaction. This is a very API-heavy call.
  // Returns false if the txid is not an SLP transaction.
  //
  // Warning! This is a prototype function and the output can change at any time
  // without reflecting a change in the semantic version. DO NOT USE IN PRODUCTION.
  async getTxDataSlp (txid) {
    try {
      if (typeof txid !== 'string') {
        throw new Error('Input must be a string or array of strings.')
      }

      const txDetails = await this.getTxData(txid)

      // First get the token information for the output. If that fails, then
      // this is not an SLP transaction, and this method can return false.
      let outTokenData
      try {
        outTokenData = await this.slpUtils.decodeOpReturn(txid)
        // console.log(`outTokenData: ${JSON.stringify(outTokenData, null, 2)}`)

        // Add token information to the tx details object.
        txDetails.tokenTxType = outTokenData.txType
        txDetails.tokenId = outTokenData.tokenId

        // Add the token quantity to each output.
        for (let i = 0; i < outTokenData.amounts.length; i++) {
          txDetails.vout[i + 1].tokenQty = outTokenData.amounts[i]
        }

        // Loop through each input and retrieve the token data.
        for (let i = 0; i < txDetails.vin.length; i++) {
          const thisVin = txDetails.vin[i]

          try {
            // If decodeOpReturn() throws an error, then this input is not
            // from an SLP transaction and can be ignored.
            const inTokenData = await this.slpUtils.decodeOpReturn(thisVin.txid)
            // console.log(
            //   `vin[${i}] tokenData: ${JSON.stringify(inTokenData, null, 2)}`
            // )

            // Get the appropriate vout token amount. This may throw an error,
            // which means this Vin is not actually a token UTXO, it was just
            // associated with a previous token TX.
            const tokenQty = inTokenData.amounts[thisVin.vout - 1]
            // console.log(`tokenQty: ${JSON.stringify(tokenQty, null, 2)}`)

            if (tokenQty) {
              thisVin.tokenQty = tokenQty
              // txDetails.vin[i].tokenQty = tokenQty
            } else {
              thisVin.tokenQty = null
            }
          } catch (err) {
            // console.log('catch 2: ', err)
            // If decodeOpReturn() throws an error, then this input is not
            // from an SLP transaction and can be ignored.
            // thisVin.tokenQty = null
            thisVin.tokenQty = null
            continue
          }
          // console.log(
          //   `2: txDetails.vin[i]: ${JSON.stringify(txDetails.vin[i], null, 2)}`
          // )
        }
      } catch (err) {
        // console.log('catch 1: ', err)
        return false
      }

      return txDetails
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
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
          _this.axiosOptions
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
          headers: _this.axiosOptions.headers
        }
        const response = await _this.axios(options)

        return response.data
      }

      throw new Error('Input hex must be a string or array of strings.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = RawTransactions
