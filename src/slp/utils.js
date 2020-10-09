const axios = require("axios")
const slpParser = require("slp-parser")

// const Script = require("../script")
// const scriptLib = new Script()

// const BigNumber = require("bignumber.js")

let _this

class Utils {
  constructor(config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.slpParser = slpParser

    // Add JWT token to the authorization header.
    this.axiosOptions = {
      headers: {
        authorization: `Token ${this.apiToken}`
      }
    }

    _this = this
  }

  /**
   * @api SLP.Utils.list() list()
   * @apiName list
   * @apiGroup SLP Utils
   * @apiDescription List all tokens or list single token by id.
   *
   * @apiExample Example usage:
   *
   * // List all tokens
   *
   * (async () => {
   * try {
   * let list = await bchjs.SLP.Utils.list();
   *  console.log(list);
   * } catch (error) {
   *  console.error(error);
   * }
   * })();
   *
   * // returns
   * [ { decimals: 5,
   * timestamp: '2019-04-20 05:03',
   * versionType: 1,
   * documentUri: 'developer.bitcoin.com',
   * symbol: 'MYSTERY',
   * name: 'Mystery',
   * containsBaton: true,
   * id:
   *  '10528f22fc20422f7c1075a87ed7270c0a17bc17ea79c6e2f426c6cc14bb25f2',
   * documentHash:
   *  '1010101010101010101010101010101010101010101010101010101010101010',
   * initialTokenQty: 500,
   * blockCreated: 579041,
   * blockLastActiveSend: null,
   * blockLastActiveMint: null,
   * txnsSinceGenesis: 1,
   * validAddresses: 1,
   * totalMinted: 500,
   * totalBurned: 0,
   * circulatingSupply: 500,
   * mintingBatonStatus: 'ALIVE' },
   * { decimals: 8,
   * timestamp: '2019-04-20 04:54',
   * versionType: 1,
   * documentUri: 'developer.bitcoin.com',
   * symbol: 'ENIGMA',
   * name: 'Enigma',
   * containsBaton: true,
   * id:
   * '113c55921fe29919ff84e53a6d5af39ed9d983a1c3b3000f27125688489935fa',
   * documentHash:
   * '1010101010101010101010101010101010101010101010101010101010101010',
   * initialTokenQty: 1234,
   * blockCreated: 579040,
   * blockLastActiveSend: null,
   * blockLastActiveMint: 579040,
   * txnsSinceGenesis: 2,
   * validAddresses: 2,
   * totalMinted: 1334,
   * totalBurned: 0,
   * circulatingSupply: 1334,
   * mintingBatonStatus: 'ALIVE' }
   * ]
   *
   * // List single token
   *
   * (async () => {
   * try {
   *   let list = await bchjs.SLP.Utils.list(
   *     "b3f4f132dc3b9c8c96316346993a8d54d729715147b7b11aa6c8cd909e955313"
   *   );
   *   console.log(list);
   * } catch (error) {
   *   console.error(error);
   * }
   * })();
   *
   * // returns
   * { decimals: 8,
   * timestamp: '2019-04-20 04:54',
   * versionType: 1,
   * documentUri: 'developer.bitcoin.com',
   * symbol: 'ENIGMA',
   * name: 'Enigma',
   * containsBaton: true,
   * id:
   * '113c55921fe29919ff84e53a6d5af39ed9d983a1c3b3000f27125688489935fa',
   * documentHash:
   * '1010101010101010101010101010101010101010101010101010101010101010',
   * initialTokenQty: 1234,
   * blockCreated: 579040,
   * blockLastActiveSend: null,
   * blockLastActiveMint: 579040,
   * txnsSinceGenesis: 2,
   * validAddresses: 2,
   * totalMinted: 1334,
   * totalBurned: 0,
   * circulatingSupply: 1334,
   * mintingBatonStatus: 'ALIVE' }
   *
   * // List multiple tokens by tokenIds
   *
   *  (async () => {
   * try {
   *   let list = await bchjs.SLP.Utils.list([
   *     "fa6c74c52450fc164e17402a46645ce494a8a8e93b1383fa27460086931ef59f",
   *     "38e97c5d7d3585a2cbf3f9580c82ca33985f9cb0845d4dcce220cb709f9538b0"
   *   ]);
   *   console.log(list);
   * } catch (error) {
   *   console.error(error);
   * }
   * })();
   *
   * // returns
   * [ { decimals: 0,
   * timestamp: '2019-02-18 14:47',
   * versionType: 1,
   * documentUri: 'https://simpleledger.cash',
   * symbol: 'SLP',
   * name: 'Official SLP Token',
   * containsBaton: true,
   * id:
   * 'fa6c74c52450fc164e17402a46645ce494a8a8e93b1383fa27460086931ef59f',
   * documentHash: null,
   * initialTokenQty: 18446744073709552000,
   * blockCreated: 570305,
   * blockLastActiveSend: 580275,
   * blockLastActiveMint: 575914,
   * txnsSinceGenesis: 4537,
   * validAddresses: 164,
   * totalMinted: 19414628793626410000,
   * totalBurned: 18446568350267302000,
   * circulatingSupply: 968060443359109600,
   * mintingBatonStatus: 'ALIVE' },
   * { decimals: 8,
   * timestamp: '2019-02-14 03:11',
   * versionType: 1,
   * documentUri: 'psfoundation.cash',
   * symbol: 'PSF',
   * name: 'Permissionless Software Foundation',
   * containsBaton: true,
   * id:
   * '38e97c5d7d3585a2cbf3f9580c82ca33985f9cb0845d4dcce220cb709f9538b0',
   * documentHash: null,
   * initialTokenQty: 19882.09163133,
   * blockCreated: 569658,
   * blockLastActiveSend: 580153,
   * blockLastActiveMint: null,
   * txnsSinceGenesis: 51,
   * validAddresses: 9,
   * totalMinted: 19882.09163133,
   * totalBurned: 0.0534241,
   * circulatingSupply: 19882.03820723,
   * mintingBatonStatus: 'ALIVE' } ]
   */
  async list(id) {
    let path
    let method
    if (!id) {
      method = "get"
      path = `${this.restURL}slp/list`
    } else if (typeof id === "string") {
      method = "get"
      path = `${this.restURL}slp/list/${id}`
    } else if (typeof id === "object") {
      method = "post"
      path = `${this.restURL}slp/list`
    }

    //console.log(`path: ${path}`)

    try {
      let response
      if (method === "get") {
        response = await axios.get(path, _this.axiosOptions)
      } else {
        response = await axios.post(
          path,
          {
            tokenIds: id
          },
          _this.axiosOptions
        )
      }
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.balancesForAddress() balancesForAddress()
   * @apiName balancesForAddress
   * @apiGroup SLP Utils
   * @apiDescription Return all balances for an address or array of addresses.
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   * let balances = await bchjs.SLP.Utils.balancesForAddress('simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk');
   * console.log(balances);
   * } catch (error) {
   * console.error(error);
   * }
   * })();
   *
   * // returns
   * // [ { tokenId:
   * //      '968ff0cc4c93864001e03e9524e351250b94ec56150fa4897f65b0b6477d44d4',
   * //     balance: '9980',
   * //     slpAddress: 'simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk',
   * //     decimalCount: 9 },
   * //   { tokenId:
   * //      'df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb',
   * //     balance: '617',
   * //     slpAddress: 'simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk',
   * //     decimalCount: 8 },
   * //   { tokenId:
   * //      'b96304d12f1bbc2196df582516410e55a9b34e13c7b4585bf5c1770af30d034f',
   * //     balance: '1',
   * //     slpAddress: 'simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk',
   * //     decimalCount: 0 },
   * //   { tokenId:
   * //      'a436c8e1b6bee3d701c6044d190f76f774be83c36de8d34a988af4489e86dd37',
   * //     balance: '776',
   * //     slpAddress: 'simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk',
   * //     decimalCount: 7 } ]
   *
   * // balances for Cash Address
   * (async () => {
   *  try {
   *    let balances = await bchjs.SLP.Utils.balancesForAddress('bitcoincash:qr4zg7xth86yzq94gl8jvnf5z4wuupzt3g4hl47n9y');
   *    console.log(balances);
   *  } catch (error) {
   *    console.error(error);
   *  }
   * })();
   *
   * // returns
   * // [ { tokenId:
   * // '467969e067f5612863d0bf2daaa70dede2c6be03abb6fd401c5ef6e1e1f1f5c5',
   * // balance: '507',
   * // decimalCount: 2 } ]
   *
   * // balances for Legacy Address
   * (async () => {
   *  try {
   *    let balances = await bchjs.SLP.Utils.balancesForAddress('1NM2ozrXVSnMRm66ua6aGeXgMsU7yqwqLS');
   *    console.log(balances);
   *  } catch (error) {
   *    console.error(error);
   *  }
   * })();
   *
   * // returns
   * // [ { tokenId:
   * // '467969e067f5612863d0bf2daaa70dede2c6be03abb6fd401c5ef6e1e1f1f5c5',
   * // balance: '507',
   * // decimalCount: 2 } ]
   *
   * Note: Balances for multiple addresses can be retrieves by passing in an
   * array of addresses.
   */
  // Retrieve token balances for a given address.
  async balancesForAddress(address) {
    try {
      // Single address.
      if (typeof address === "string") {
        const path = `${this.restURL}slp/balancesForAddress/${address}`

        const response = await axios.get(path, _this.axiosOptions)
        return response.data

        // Array of addresses.
      } else if (Array.isArray(address)) {
        const path = `${this.restURL}slp/balancesForAddress`

        // Dev note: must use axios.post for unit test stubbing.
        const response = await axios.post(
          path,
          {
            addresses: address
          },
          _this.axiosOptions
        )

        return response.data
      }

      throw new Error(`Input address must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.balancesForToken() balancesForToken()
   * @apiName balancesForToken
   * @apiGroup SLP Utils
   * @apiDescription List all balances for tokenId.
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   * let balances = await bchjs.SLP.Utils.balancesForToken(
   *   "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb"
   * )
   * console.log(balances)
   * } catch (error) {
   * console.error(error)
   * }
   * })()
   *
   * // returns
   * [
   * {
   * tokenId: "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb",
   * tokenBalance: 20,
   * slpAddress: 'simpleledger:qp4g0q97tq53pasnxk2rs570c6573qvylunsf5gy9e'
   * },
   * {
   * tokenId: "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb",
   * tokenBalance: 335.55,
   * slpAddress: 'simpleledger:qqcraw7q0ys3kg4z6f2zd267fhg2093c5c0spfk03f'
   * }
   * ]
   *
   */
  // Retrieve token balances for a given tokenId.
  async balancesForToken(tokenId) {
    const path = `${this.restURL}slp/balancesForToken/${tokenId}`

    try {
      const response = await axios.get(path, _this.axiosOptions)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.validateTxid() validateTxid()
   * @apiName validateTxid
   * @apiGroup SLP Utils
   * @apiDescription Validate that txid is an SLP transaction.
   *
   * @apiExample Example usage:
   *
   * // validate single SLP txid
   * (async () => {
   *  try {
   *    let validated = await bchjs.SLP.Utils.validateTxid(
   *      "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb"
   *    );
   *    console.log(validated);
   *  } catch (error) {
   *    console.error(error);
   *  }
   * })();
   *
   * // returns
   * [ { txid:
   * 'df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb',
   * valid: true } ]
   *
   * // validate multiple SLP txids
   * (async () => {
   *  try {
   *    let validated = await bchjs.SLP.Utils.validateTxid([
   *      "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb",
   *      "00ea27261196a411776f81029c0ebe34362936b4a9847deb1f7a40a02b3a1476"
   *    ]);
   *    console.log(validated);
   *  } catch (error) {
   *    console.error(error);
   *  }
   * })();
   *
   * // returns
   * [ { txid:
   *     'df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb',
   *    valid: true },
   *  { txid:
   *     '00ea27261196a411776f81029c0ebe34362936b4a9847deb1f7a40a02b3a1476',
   *    valid: true } ]
   */
  async validateTxid(txid) {
    const path = `${this.restURL}slp/validateTxid`

    // console.log(`txid: ${JSON.stringify(txid, null, 2)}`)

    // Handle a single TXID or an array of TXIDs.
    let txids
    if (typeof txid === "string") txids = [txid]
    else txids = txid

    try {
      const response = await axios.post(
        path,
        {
          txids: txids
        },
        _this.axiosOptions
      )
      // console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`)

      const validatedTxids = response.data

      // Handle any null values
      for (let i = 0; i < validatedTxids.length; i++) {
        if (validatedTxids[i] === null) {
          validatedTxids[i] = {
            txid: txids[i],
            valid: false
          }
        }
      }

      return validatedTxids
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.tokenStats() tokenStats()
   * @apiName tokenStats
   * @apiGroup SLP Utils
   * @apiDescription Stats for token by tokenId.
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   *  let stats = await bchjs.SLP.Utils.tokenStats(
   *    "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb"
   *  )
   *  console.log(stats)
   * } catch (error) {
   *  console.error(error)
   * }
   * })()
   *
   * // returns
   * { tokenId:
   *  'df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb',
   *  documentUri: '',
   *  symbol: 'NAKAMOTO',
   *  name: 'NAKAMOTO',
   *  decimals: 8,
   *  txnsSinceGenesis: 367,
   *  validUtxos: 248,
   *  validAddresses: 195,
   *  circulatingSupply: 20995990,
   *  totalBurned: 4010,
   *  totalMinted: 21000000,
   *  satoshisLockedUp: 135408
   * }
   */
  async tokenStats(tokenId) {
    const path = `${this.restURL}slp/tokenStats/${tokenId}`

    try {
      const response = await axios.get(path, _this.axiosOptions)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.transactions() transactions()
   * @apiName transactions
   * @apiGroup SLP Utils
   * @apiDescription SLP Transactions by tokenId and address.
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   *  let transactions = await bchjs.SLP.Utils.transactions(
   *    "495322b37d6b2eae81f045eda612b95870a0c2b6069c58f70cf8ef4e6a9fd43a",
   *    "qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqlsy4gusz"
   *  )
   *  console.log(transactions)
   * } catch (error) {
   *  console.error(error)
   * }
   * })()
   *
   * // returns
   * [
   *  {
   *    "txid": "27e27170b546f05b2af69d6eddff8834038facf5d81302e9e562df09a5c4445f",
   *    "tokenDetails": {
   *      "valid": true,
   *      "detail": {
   *        "decimals": null,
   *        "tokenIdHex": "495322b37d6b2eae81f045eda612b95870a0c2b6069c58f70cf8ef4e6a9fd43a",
   *        "timestamp": null,
   *        "transactionType": "SEND",
   *        "versionType": 1,
   *        "documentUri": null,
   *        "documentSha256Hex": null,
   *        "symbol": null,
   *        "name": null,
   *        "batonVout": null,
   *        "containsBaton": null,
   *        "genesisOrMintQuantity": null,
   *        "sendOutputs": [
   *          {
   *            "$numberDecimal": "0"
   *          },
   *          {
   *            "$numberDecimal": "25"
   *          },
   *          {
   *            "$numberDecimal": "77"
   *          }
   *        ]
   *      },
   *      "invalidReason": null,
   *      "schema_version": 30
   *    }
   *  }
   * ]
   */
  // Retrieve token transactions for a given tokenId and address.
  async transactions(tokenId, address) {
    const path = `${this.restURL}slp/transactions/${tokenId}/${address}`

    try {
      const response = await axios.get(path, _this.axiosOptions)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.burnTotal() burnTotal()
   * @apiName burnTotal
   * @apiGroup SLP Utils
   * @apiDescription List input, output and burn total for slp transaction.
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   *  const burnTotal = await bchjs.SLP.Utils.burnTotal(
   *    "c7078a6c7400518a513a0bde1f4158cf740d08d3b5bfb19aa7b6657e2f4160de"
   *  )
   *  console.log(burnTotal)
   * } catch (error) {
   *  console.error(error)
   * }
   * })()
   *
   * // returns
   * {
   *  transactionId: 'c7078a6c7400518a513a0bde1f4158cf740d08d3b5bfb19aa7b6657e2f4160de',
   *  inputTotal: 100000100,
   *  outputTotal: 100000000,
   *  burnTotal: 100
   * }
   */
  async burnTotal(transactionId) {
    const path = `${this.restURL}slp/burnTotal/${transactionId}`

    try {
      const response = await axios.get(path, _this.axiosOptions)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.txDetails() txDetails()
   * @apiName txDetails
   * @apiGroup SLP Utils
   * @apiDescription Transaction details on a token transfer.
   * There is no bulk method for this endpoint. Can only get one tx at a time.
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   *  const details = await bchjs.SLP.Utils.txDetails(
   *    "c7078a6c7400518a513a0bde1f4158cf740d08d3b5bfb19aa7b6657e2f4160de"
   *  )
   *  console.log(details)
   * } catch (error) {
   *  console.error(error)
   * }
   * })()
   *
   */
  async txDetails(txid) {
    try {
      if (
        !txid ||
        txid === "" ||
        typeof txid !== "string" ||
        txid.length !== 64
      )
        throw new Error(`txid string must be included.`)

      // console.log(`this.restURL: ${this.restURL}`)
      const path = `${this.restURL}slp/txDetails/${txid}`

      const response = await axios.get(path, _this.axiosOptions)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.decodeOpReturn() decodeOpReturn()
   * @apiName decodeOpReturn
   * @apiGroup SLP Utils
   * @apiDescription Retrieves transactions data from a txid and decodes the SLP OP_RETURN data.
   *
   * Similar to decodeOpReturn(), except decodeOpReturn2() uses the slp-parser
   * library maintained by JT Freeman. Outputs have slightly different format.
   *
   * If optional associative array parameter cache is used, will cache and
   * reuse responses for the same input.
   *
   * Throws an error if given a non-SLP txid.
   *
   * In a future version of bch-js, this method will replace the origonal
   * decodeOpReturn() method.
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   *  const txid =
   *   "266844d53e46bbd7dd37134688dffea6e54d944edff27a0add63dd0908839bc1"
   *
   *  const data = await slp.Utils.decodeOpReturn2(txid)
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
   */
  // Reimplementation of decodeOpReturn() using slp-parser.
  async decodeOpReturn(txid, cache = null) {
    // The cache object is an in-memory cache (JS Object) that can be passed
    // into this function. It helps if multiple vouts from the same TXID are
    // being evaluated. In that case, it can significantly reduce the number
    // of API calls.
    // To use: add the output of this function to the cache object:
    // cache[txid] = returnValue
    // Then pass that cache object back into this function every time its called.
    if (cache) {
      if (!(cache instanceof Object))
        throw new Error(`decodeOpReturn cache parameter must be Object`)
      const cachedVal = cache[txid]
      if (cachedVal) return cachedVal
    }

    try {
      // Validate the txid input.
      if (!txid || txid === "" || typeof txid !== "string")
        throw new Error(`txid string must be included.`)

      // Retrieve the transaction object from the full node.
      const path = `${this.restURL}rawtransactions/getRawTransaction/${txid}?verbose=true`
      const response = await axios.get(path, _this.axiosOptions)
      const txDetails = response.data
      // console.log(`txDetails: ${JSON.stringify(txDetails, null, 2)}`)

      // SLP spec expects OP_RETURN to be the first output of the transaction.
      const opReturn = txDetails.vout[0].scriptPubKey.hex
      // console.log(`opReturn hex: ${opReturn}`)

      const parsedData = _this.slpParser.parseSLP(Buffer.from(opReturn, "hex"))
      // console.log(`parsedData: ${JSON.stringify(parsedData, null, 2)}`)

      // Convert Buffer data to hex strings or utf8 strings.
      let tokenData = {}
      if (parsedData.transactionType === "SEND") {
        tokenData = {
          tokenType: parsedData.tokenType,
          txType: parsedData.transactionType,
          tokenId: parsedData.data.tokenId.toString("hex"),
          amounts: parsedData.data.amounts
        }
      } else if (parsedData.transactionType === "GENESIS") {
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
      } else if (parsedData.transactionType === "MINT") {
        tokenData = {
          tokenType: parsedData.tokenType,
          txType: parsedData.transactionType,
          tokenId: parsedData.data.tokenId.toString("hex"),
          mintBatonVout: parsedData.data.mintBatonVout,
          qty: parsedData.data.qty
        }
      }
      // console.log(`tokenData: ${JSON.stringify(tokenData, null, 2)}`)

      if (cache) cache[txid] = tokenData

      return tokenData
    } catch (error) {
      // console.log('decodeOpReturn error: ', error)
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.tokenUtxoDetails() tokenUtxoDetails()
   * @apiName tokenUtxoDetails
   * @apiGroup SLP Utils
   * @apiDescription Hydrate a UTXO with SLP token metadata.
   *
   * Expects an array of UTXO objects as input. Returns an array of equal size.
   * Returns UTXO data hydrated with token information.
   * If the
   * UTXO does not belong to a SLP transaction, it will return an `isValid` property
   * set to false.
   * If the UTXO is part of an SLP transaction, it will return the UTXO object
   * with additional SLP information attached. An `isValid` property will be included.
   * If its value is true, the UTXO is a valid SLP UTXO.
   * If the isValid value is null,
   * then SLPDB has not yet processed that txid and validity has not been confirmed,
   * or a 429 rate-limit error was enountered during the processing of the request.
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   *  const utxos = await bchjs.Electrumx.utxo(`bitcoincash:qpcqs0n5xap26un2828n55gan2ylj7wavvzeuwdx05`)
   *
   *  const utxoInfo = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
   *
   *  console.log(`utxoInfo: ${JSON.stringify(utxoInfo, null, 2)}`)
   * } catch (error) {
   *  console.error(error)
   * }
   * })()
   *
   * // returns
   * {
   *  "txid": "fde117b1f176b231e2fa9a6cb022e0f7c31c288221df6bcb05f8b7d040ca87cb",
   *  "vout": 1,
   *  "amount": 0.00000546,
   *  "satoshis": 546,
   *  "height": 596089,
   *  "confirmations": 748,
   *  "utxoType": "token",
   *  "tokenId": "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7",
   *  "tokenTicker": "TOK-CH",
   *  "tokenName": "TokyoCash",
   *  "tokenDocumentUrl": "",
   *  "tokenDocumentHash": "",
   *  "decimals": 8,
   *  "tokenQty": 2,
   *  "isValid": true,
   *  "tokenType": 1
   * }
   */

  // CT 1/11/20: Refactored to comply with this GitHub Issue:
  // https://github.com/Bitcoin-com/slp-sdk/issues/84

  // CT 5/31/20: Refactored to use slp-parse library.
  async tokenUtxoDetails(utxos) {
    try {
      // utxo list may have duplicate tx_hash, varying tx_pos
      // only need to call decodeOpReturn once for those
      const decodeOpReturnCache = {}
      const cachedTxValidation = {}
      // Throw error if input is not an array.
      if (!Array.isArray(utxos)) throw new Error(`Input must be an array.`)

      // Loop through each element in the array and validate the input before
      // further processing.
      for (let i = 0; i < utxos.length; i++) {
        const utxo = utxos[i]

        if (!utxo.satoshis) {
          // If Electrumx, convert the value to satoshis.
          if (utxo.value) {
            utxo.satoshis = utxo.value
          }
          // If there is neither a satoshis or value property, throw an error.
          else {
            throw new Error(
              `utxo ${i} does not have a satoshis or value property.`
            )
          }
        }

        if (!utxo.txid) {
          // If Electrumx, convert the tx_hash property to txid.
          if (utxo.tx_hash) {
            utxo.txid = utxo.tx_hash
          }
          // If there is neither a txid or tx_hash property, throw an error.
          else {
            throw new Error(
              `utxo ${i} does not have a txid or tx_hash property.`
            )
          }
        }

        if (!Number.isInteger(utxo.vout)) {
          if (Number.isInteger(utxo.tx_pos)) {
            utxo.vout = utxo.tx_pos
          } else {
            throw new Error(
              `utxo ${i} does not have a vout or tx_pos property.`
            )
          }
        }
      }

      // Output Array
      const outAry = []

      // Loop through each utxo
      for (let i = 0; i < utxos.length; i++) {
        const utxo = utxos[i]

        // Get raw transaction data from the full node and attempt to decode
        // the OP_RETURN data.
        // If there is no OP_RETURN, mark the UTXO as false.
        let slpData = false
        try {
          slpData = await this.decodeOpReturn(utxo.txid, decodeOpReturnCache)
          // console.log(`slpData: ${JSON.stringify(slpData, null, 2)}`)
        } catch (err) {
          // console.log(`error from decodeOpReturn(${utxo.txid}): `, err)

          // An error will be thrown if the txid is not SLP.
          // If error is for some other reason, like a 429 error, mark utxo as 'null'
          // to display the unknown state.
          if (
            !err.message ||
            err.message.indexOf("scriptpubkey not op_return") === -1
          ) {
            // console.log(`error from decodeOpReturn(${utxo.txid}): `, err)

            utxo.isValid = null
            outAry.push(utxo)

            // If error is thrown because there is no OP_RETURN, then it's not
            // an SLP UTXO.
            // Mark as false and continue the loop.
          } else {
            utxo.isValid = false
            outAry.push(utxo)
          }

          // Halt the execution of the loop and increase to the next index.
          continue
        }

        const txType = slpData.txType.toLowerCase()

        // console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)

        // If there is an OP_RETURN, attempt to decode it.
        // Handle Genesis SLP transactions.
        if (txType === "genesis") {
          if (
            utxo.vout !== slpData.mintBatonVout && // UTXO is not a mint baton output.
            utxo.vout !== 1 // UTXO is not the reciever of the genesis or mint tokens.
          ) {
            // Can safely be marked as false.
            // outAry[i] = false
            utxo.isValid = false
            outAry[i] = utxo
          }

          // If this is a valid SLP UTXO, then return the decoded OP_RETURN data.
          else {
            // Minting Baton
            if (utxo.vout === slpData.mintBatonVout) {
              utxo.utxoType = "minting-baton"
            }
            // Tokens
            else {
              utxo.utxoType = "token"
              utxo.tokenQty = slpData.qty / Math.pow(10, slpData.decimals)
            }

            utxo.tokenId = utxo.txid
            utxo.tokenTicker = slpData.ticker
            utxo.tokenName = slpData.name
            utxo.tokenDocumentUrl = slpData.documentUri
            utxo.tokenDocumentHash = slpData.documentHash
            utxo.decimals = slpData.decimals
            utxo.tokenType = slpData.tokenType

            // something
            outAry[i] = utxo
          }
        }

        // Handle Mint SLP transactions.
        if (txType === "mint") {
          if (
            utxo.vout !== slpData.mintBatonVout && // UTXO is not a mint baton output.
            utxo.vout !== 1 // UTXO is not the reciever of the genesis or mint tokens.
          ) {
            // Can safely be marked as false.
            // outAry[i] = false
            utxo.isValid = false
            outAry[i] = utxo
          }

          // If UTXO passes validation, then return formatted token data.
          else {
            const genesisData = await this.decodeOpReturn(
              slpData.tokenId,
              decodeOpReturnCache
            )
            // console.log(`genesisData: ${JSON.stringify(genesisData, null, 2)}`)

            // Minting Baton
            if (utxo.vout === slpData.mintBatonVout) {
              utxo.utxoType = "minting-baton"
            }
            // Tokens
            else {
              utxo.utxoType = "token"
              utxo.tokenQty = slpData.qty / Math.pow(10, genesisData.decimals)
            }

            // Hydrate the UTXO object with information about the SLP token.
            utxo.transactionType = "mint"
            utxo.tokenId = slpData.tokenId
            utxo.tokenType = slpData.tokenType

            utxo.tokenTicker = genesisData.ticker
            utxo.tokenName = genesisData.name
            utxo.tokenDocumentUrl = genesisData.documentUri
            utxo.tokenDocumentHash = genesisData.documentHash
            utxo.decimals = genesisData.decimals

            utxo.mintBatonVout = slpData.mintBatonVout

            outAry[i] = utxo
          }
        }

        // Handle Send SLP transactions.
        if (txType === "send") {
          // Filter out any vouts that match.
          // const voutMatch = slpData.spendData.filter(x => utxo.vout === x.vout)
          // console.log(`voutMatch: ${JSON.stringify(voutMatch, null, 2)}`)

          // Figure out what token quantity is represented by this utxo.
          const tokenQty = slpData.amounts[utxo.vout - 1]
          // console.log(`tokenQty: `, tokenQty)

          if (!tokenQty) {
            // outAry[i] = false
            utxo.isValid = false
            outAry[i] = utxo
          }

          // If UTXO passes validation, then return formatted token data.
          else {
            const genesisData = await this.decodeOpReturn(
              slpData.tokenId,
              decodeOpReturnCache
            )
            // console.log(`genesisData: ${JSON.stringify(genesisData, null, 2)}`)

            // console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)

            // Hydrate the UTXO object with information about the SLP token.
            utxo.utxoType = "token"
            utxo.transactionType = "send"
            utxo.tokenId = slpData.tokenId
            utxo.tokenTicker = genesisData.ticker
            utxo.tokenName = genesisData.name
            utxo.tokenDocumentUrl = genesisData.documentUri
            utxo.tokenDocumentHash = genesisData.documentHash
            utxo.decimals = genesisData.decimals
            utxo.tokenType = slpData.tokenType

            // Calculate the real token quantity.
            utxo.tokenQty = tokenQty / Math.pow(10, genesisData.decimals)

            // console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)

            outAry[i] = utxo
          }
        }

        // Finally, validate the SLP txid with SLPDB.
        if (outAry[i].tokenType) {
          var isValid = cachedTxValidation[utxo.txid]
          if (isValid == null) {
            isValid = await this.validateTxid(utxo.txid)
            cachedTxValidation[utxo.txid] = isValid
          }
          // console.log(`isValid: ${JSON.stringify(isValid, null, 2)}`)

          outAry[i].isValid = isValid[0].valid
        }
      }

      return outAry
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.hydrateUtxos() hydrateUtxos()
   * @apiName hydrateUtxos
   * @apiGroup SLP Utils
   * @apiDescription Hydrate a UTXO with SLP token metadata.
   *
   * The same as tokenUtxoDetails(), but uses bch-api to do the heavy lifting,
   * which greatly reduces the number of API calls.
   *
   * Expects an array of UTXO objects as input. Returns an array of equal size.
   * Returns UTXO data hydrated with token information.
   * If the
   * UTXO does not belong to a SLP transaction, it will return an `isValid` property
   * set to false.
   * If the UTXO is part of an SLP transaction, it will return the UTXO object
   * with additional SLP information attached. An `isValid` property will be included.
   * If its value is true, the UTXO is a valid SLP UTXO. \
   * If the isValid value is null,
   * then SLPDB has not yet processed that txid and validity has not been confirmed,
   * or a 429 rate-limit error was enountered during the processing of the request.
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   *  const utxos = await bchjs.Electrumx.utxo([
   *   "bitcoincash:qq6mvsm7l92d77zpymmltvaw09p5uzghyuyx7spygg",
   *   "bitcoincash:qpjdrs8qruzh8xvusdfmutjx62awcepnhyperm3g89",
   *   "bitcoincash:qzygn28zpgeemnptkn26xzyuzzfu9l8f9vfvq7kptk"
   *  ])
   *
   *  const utxoInfo = await bchjs.SLP.Utils.hydrateUtxos(utxos.utxos)
   *
   *  console.log(`${JSON.stringify(utxoInfo, null, 2)}`)
   * } catch (error) {
   *  console.error(error)
   * }
   * })()
   *
   * // returns
   * {
   *  "slpUtxos": [
   *   {
   *    "utxos": [
   *      {
   *        "height": 654522,
   *         "tx_hash": "516e763932061f9e868652d727045b714db1ecac459e84cd52b5b4cb39572ecc",
   *        "tx_pos": 0,
   *        "value": 6000,
   *        "satoshis": 6000,
   *        "txid": "516e763932061f9e868652d727045b714db1ecac459e84cd52b5b4cb39572ecc",
   *        "vout": 0,
   *        "isValid": false
   *      }
   *    ],
   *    "address": "bitcoincash:qq6mvsm7l92d77zpymmltvaw09p5uzghyuyx7spygg"
   *   },
   *   {
   *    "utxos": [
   *      {
   *        "height": 654522,
   *        "tx_hash": "8ec01d851d9df9fb4b4331275e2ff680257c224100d0081cec6fbeedf982f738",
   *        "tx_pos": 1,
   *        "value": 546,
   *        "satoshis": 546,
   *        "txid": "8ec01d851d9df9fb4b4331275e2ff680257c224100d0081cec6fbeedf982f738",
   *        "vout": 1,
   *        "utxoType": "token",
   *        "transactionType": "send",
   *        "tokenId": "a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2",
   *        "tokenTicker": "TROUT",
   *        "tokenName": "Trout's test token",
   *        "tokenDocumentUrl": "troutsblog.com",
   *        "tokenDocumentHash": "",
   *        "decimals": 2,
   *        "tokenType": 1,
   *        "tokenQty": 10,
   *        "isValid": true
   *      }
   *    ],
   *    "address": "bitcoincash:qpjdrs8qruzh8xvusdfmutjx62awcepnhyperm3g89"
   *   },
   *   {
   *    "utxos": [
   *      {
   *        "height": 654522,
   *        "tx_hash": "072a1e2c2d5f1309bf4eef7f88684e4ecd544a903b386b07f3e04b91b13d8af1",
   *        "tx_pos": 0,
   *        "value": 6999,
   *        "satoshis": 6999,
   *        "txid": "072a1e2c2d5f1309bf4eef7f88684e4ecd544a903b386b07f3e04b91b13d8af1",
   *        "vout": 0,
   *        "isValid": false
   *      },
   *      {
   *        "height": 654522,
   *        "tx_hash": "a72db6a0883ecb8e379f317231b2571e41e041b7b1107e3e54c2e0b3386ac6ca",
   *        "tx_pos": 1,
   *        "value": 546,
   *        "satoshis": 546,
   *        "txid": "a72db6a0883ecb8e379f317231b2571e41e041b7b1107e3e54c2e0b3386ac6ca",
   *        "vout": 1,
   *        "utxoType": "token",
   *        "transactionType": "send",
   *        "tokenId": "6201f3efe486c577433622817b99645e1d473cd3882378f9a0efc128ab839a82",
   *        "tokenTicker": "VALENTINE",
   *        "tokenName": "Valentine day token",
   *        "tokenDocumentUrl": "fullstack.cash",
   *        "tokenDocumentHash": "",
   *        "decimals": 2,
   *        "tokenType": 1,
   *        "tokenQty": 5,
   *        "isValid": true
   *      }
   *    ],
   *    "address": "bitcoincash:qzygn28zpgeemnptkn26xzyuzzfu9l8f9vfvq7kptk"
   *   }
   *  ]
   * }
   *
   */
  // Same as tokenUtxoDetails(), but reduces API calls by having bch-api server
  // do the heavy lifting.
  async hydrateUtxos(utxos) {
    try {
      // Throw error if input is not an array.
      if (!Array.isArray(utxos)) throw new Error(`Input must be an array.`)

      const response = await axios.post(
        `${this.restURL}slp/hydrateUtxos`,
        {
          utxos: utxos
        },
        _this.axiosOptions
      )

      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = Utils
