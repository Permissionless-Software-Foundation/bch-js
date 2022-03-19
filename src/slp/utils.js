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
