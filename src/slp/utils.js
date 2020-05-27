const axios = require("axios")
const slpParser = require("slp-parser")

const Script = require("../script")
const scriptLib = new Script()

const BigNumber = require("bignumber.js")

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
   * @api SLP.Utils.list() list() - List all tokens or list single token by id.
   * @apiName list
   * @apiGroup SLP
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
   * @api SLP.Utils.balancesForAddress() balancesForAddress() - Return all balances for an address.
   * @apiName balancesForAddress
   * @apiGroup SLP
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
   * @api SLP.Utils.balancesForToken() balancesForToken() - List all balances for tokenId.
   * @apiName balancesForToken
   * @apiGroup SLP
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
   * @api SLP.Utils.balance() balance() - Return single balance for an address by token id.
   * @apiName balance
   * @apiGroup SLP
   * @apiDescription Return single balance for an address by token id.
   *
   * @apiExample Example usage:
   *
   * // single balance for SLP Address
   * (async () => {
   *  try {
   *    let balance = await bchjs.SLP.Utils.balance(
   *      "simpleledger:qr5agtachyxvrwxu76vzszan5pnvuzy8duhv4lxrsk",
   *      "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb"
   *    );
   *    console.log(balance);
   *  } catch (error) {
   *    console.error(error);
   *  }
   * })();
   *
   * // returns
   * // { tokenId:
   * //   'df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb',
   * //   balance: '617',
   * //   decimalCount: 8 }
   *
   * // single balance for Cash Address
   * (async () => {
   *  try {
   *    let balance = await bchjs.SLP.Utils.balance(
   *      "bitcoincash:qr5agtachyxvrwxu76vzszan5pnvuzy8dumh7ynrwg",
   *      "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb"
   *    );
   *    console.log(balance);
   *  } catch (error) {
   *    console.error(error);
   *  }
   * })();
   *
   * // returns
   * // { tokenId:
   * //   'df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb',
   * //   balance: '617',
   * //   decimalCount: 8 }
   *
   * // single balance for Legacy Address
   * (async () => {
   *  try {
   *    let balance = await bchjs.SLP.Utils.balance(
   *      "1DwQqpWc8pzaRydCmiJsPdoqCzmjSQQbp8",
   *      "467969e067f5612863d0bf2daaa70dede2c6be03abb6fd401c5ef6e1e1f1f5c5"
   *    );
   *    console.log(balance);
   *  } catch (error) {
   *    console.error(error);
   *  }
   * })();
   *
   * // returns
   * // { tokenId:
   * //    '467969e067f5612863d0bf2daaa70dede2c6be03abb6fd401c5ef6e1e1f1f5c5',
   * //   balance: '1234',
   * //   decimalCount: 2 }
   */
  // Retrieve a balance for a specific address and token ID
  async balance(address, tokenId) {
    const path = `${this.restURL}slp/balance/${address}/${tokenId}`

    try {
      const response = await axios.get(path, _this.axiosOptions)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.validateTxid() validateTxid() - Validate that txid is an SLP transaction.
   * @apiName validateTxid
   * @apiGroup SLP
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
   * @api SLP.Utils.tokenStats() tokenStats() - Stats for token by tokenId.
   * @apiName tokenStats
   * @apiGroup SLP
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
   * @api SLP.Utils.transactions() transactions() - SLP Transactions by tokenId and address.
   * @apiName transactions
   * @apiGroup SLP
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
   * @api SLP.Utils.burnTotal() burnTotal() - List input, output and burn total for slp transaction.
   * @apiName burnTotal
   * @apiGroup SLP
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
   * @api SLP.Utils.txDetails() txDetails() - SLP transaction details
   * @apiName txDetails
   * @apiGroup SLP
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
   * @api SLP.Utils.decodeOpReturn() decodeOpReturn() - Read the OP_RETURN data from an SLP transaction.
   * @apiName decodeOpReturn
   * @apiGroup SLP
   * @apiDescription Retrieves transactions data from a txid and decodes the SLP OP_RETURN data.
   *
   * Returns an object with properties corresponding to the SLP spec:
   * https://github.com/simpleledger/slp-specifications/blob/master/slp-token-type-1.md
   *
   * Throws an error if given a non-SLP txid.
   *
   * Note: At some point, this method will be deprecated in favor of decodeOpReturn2().
   * At that time, decodeOpReturn2() will be rename to decodeOpReturn().
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   *  const txid =
   *   "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90"
   *
   *  const data = await slp.Utils.decodeOpReturn(txid)
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
   *  "transactionType": "genesis",
   *  "ticker": "SLPSDK",
   *  "name": "SLP SDK example using BITBOX",
   *  "documentUrl": "developer.bitcoin.com",
   *  "documentHash": "",
   *  "decimals": 8,
   *  "mintBatonVout": 2,
   *  "initialQty": 507,
   *  "tokensSentTo": "bitcoincash:qpcqs0n5xap26un2828n55gan2ylj7wavvzeuwdx05",
   *  "batonHolder": "bitcoincash:qpcqs0n5xap26un2828n55gan2ylj7wavvzeuwdx05"
   * }
   */
  async decodeOpReturn(txid) {
    try {
      if (!txid || txid === "" || typeof txid !== "string")
        throw new Error(`txid string must be included.`)

      const path = `${this.restURL}rawtransactions/getRawTransaction/${txid}?verbose=true`
      const lokadIdHex = "534c5000"

      // Create an empty output object that will be populated with metadata.
      const outObj = {}

      // Retrieve the transaction object from the full node.
      const response = await axios.get(path, _this.axiosOptions)
      const txDetails = response.data
      //console.log(`txDetails: ${JSON.stringify(txDetails, null, 2)}`)

      // Retrieve the OP_RETURN data.
      const script = scriptLib
        .toASM(Buffer.from(txDetails.vout[0].scriptPubKey.hex, "hex"))
        .split(" ")

      if (script[0] !== "OP_RETURN") throw new Error("Not an OP_RETURN")

      if (script[1] !== lokadIdHex) throw new Error("Not a SLP OP_RETURN")

      // Validate token type.
      if (script[2] !== "OP_1" && script[2] !== "01" && script[2] !== "0001") {
        // NOTE: bitcoincashlib-js converts hex 01 to OP_1 due to BIP62.3 enforcement
        throw new Error("Unknown token type")
      }
      outObj.tokenType = 1

      const type = Buffer.from(script[3], "hex")
        .toString("ascii")
        .toLowerCase()
      script[3] = type
      //console.log(`type: ${type}`)

      // Decode a GENSIS SLP transaction.
      if (type === "genesis") {
        //console.log(`txDetails: ${JSON.stringify(txDetails, null, 2)}`)
        //console.log(`script: ${JSON.stringify(script, null, 2)}`)

        outObj.transactionType = "genesis"

        // Convert the next four entries into ascii.
        for (let i = 4; i < 8; i++)
          script[i] = Buffer.from(script[i], "hex").toString("ascii")
        //.toLowerCase()

        outObj.ticker = script[4]
        outObj.name = script[5]
        outObj.documentUrl = script[6]
        outObj.documentHash = script[7]

        // decimal precision of the token.
        if (typeof script[8] === "string" && script[8].startsWith("OP_"))
          script[8] = parseInt(script[8].slice(3)).toString(16)

        const decimals = Number(script[8])
        outObj.decimals = decimals

        // Mint Baton vout.
        if (typeof script[9] === "string" && script[9].startsWith("OP_"))
          script[9] = parseInt(script[9].slice(3)).toString(16)
        outObj.mintBatonVout = Number(script[9])

        // Initial quantity of tokens created.
        let qty = new BigNumber(script[10], 16)
        qty = qty / Math.pow(10, decimals)
        script[10] = qty
        outObj.initialQty = qty

        // Address initial tokens were sent to.
        outObj.tokensSentTo = txDetails.vout[1].scriptPubKey.addresses[0]

        // Mint baton address holder.
        if (!outObj.mintBatonVout) {
          outObj.batonHolder = "NEVER_CREATED"
        } else {
          outObj.batonHolder =
            txDetails.vout[outObj.mintBatonVout].scriptPubKey.addresses[0]
        }

        // Mint type transaction
      } else if (type === "mint") {
        //console.log(`txDetails: ${JSON.stringify(txDetails, null, 2)}`)

        outObj.transactionType = "mint"
        outObj.tokenId = script[4]

        // Locate the vout UTXO containing the minting baton.
        let mintBatonVout = 0
        // Dev note: Haven't seen this if-statement in the wild. Copied from
        // someone elses code.
        if (typeof script[5] === "string" && script[5].startsWith("OP_"))
          mintBatonVout = parseInt(script[5].slice(3))
        // This is the common use case I see.
        else mintBatonVout = parseInt(script[5])

        outObj.mintBatonVout = mintBatonVout

        // Check if baton was passed or destroyed.
        // Dev Note: There should be some more extensive checking here. The most
        // common way of 'burning' the minting baton is to set script[5] to a
        // value of 0, but it could also point to a non-existant vout.
        // TODO: Add checking if script[5] refers to a non-existant vout.
        outObj.batonStillExists = false // false by default.
        if (mintBatonVout > 1) outObj.batonStillExists = true

        // Parse the quantity generated in this minting operation.
        // Returns a string. But without the decimals information included,
        // I'm not sure how to properly represent the quantity.
        if (typeof script[6] === "string" && script[6].startsWith("OP_"))
          script[6] = parseInt(script[6].slice(3)).toString(16)

        outObj.quantity = new BigNumber(script[6], 16)

        // Report the reciever of the minted tokens.
        outObj.tokensSentTo = txDetails.vout[1].scriptPubKey.addresses[0]

        // Report the address that controls the mint baton.
        if (outObj.batonStillExists) {
          outObj.batonHolder =
            txDetails.vout[mintBatonVout].scriptPubKey.addresses[0]
        }

        // Send tokens.
      } else if (type === "send") {
        //console.log(`txDetails: ${JSON.stringify(txDetails, null, 2)}`)
        //console.log(`script: ${JSON.stringify(script,null,2)}`)

        if (script.length <= 4) throw new Error("Not a SLP txout")

        outObj.transactionType = "send"

        // Retrieve the token ID.
        outObj.tokenId = script[4]

        // Loop through each output.
        const spendData = []
        for (let i = 5; i < script.length; i++) {
          let thisScript = script[i]
          const spendObj = {}

          if (typeof thisScript === "string" && thisScript.startsWith("OP_"))
            thisScript = parseInt(thisScript.slice(3)).toString(16)

          // Compute the quantity of tokens.
          spendObj.quantity = new BigNumber(thisScript, 16)

          // Calculate which vouts are SLP UTXOs.
          const thisVout = i - 4
          spendObj.sentTo = txDetails.vout[thisVout].scriptPubKey.addresses[0]
          spendObj.vout = thisVout

          spendData.push(spendObj)
        }

        outObj.spendData = spendData
      }

      return outObj
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.decodeOpReturn2() decodeOpReturn2() - Read the OP_RETURN data from an SLP transaction.
   * @apiName decodeOpReturn2
   * @apiGroup SLP
   * @apiDescription Retrieves transactions data from a txid and decodes the SLP OP_RETURN data.
   *
   * Similar to decodeOpReturn(), except decodeOpReturn2() uses the slp-parser
   * library maintained by JT Freeman. Outputs have slightly different format.
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
  async decodeOpReturn2(txid) {
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

      return tokenData
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.isTokenUtxo() isTokenUtxo() - Determine if UTXO belongs to an SLP transaction.
   * @apiName isTokenUtxo
   * @apiGroup SLP
   * @apiDescription Determine if UTXO belongs to an SLP transaction.
   *
   * Expects an array of UTXO objects as input. Returns the same array with
   * additional properties for each UTXO, including an isSlp property which
   * will be true or false indicating if the UTXO belongs to a valid SLP
   * transaction.
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   *  const addr = 'bitcoincash:qqkpnx2rff4q5jranf3wk9jsprhae9unxckq07gph4'
   *  const utxos = await bchjs.Blockbook.utxo(addr)
   *
   *  const isSLPUtxo = await bchjs.SLP.Utils.isTokenUtxo(utxos)
   *
   *  console.log(`${JSON.stringify(isSLPUtxo,null,2)}`)
   * } catch (error) {
   *  console.error(error)
   * }
   * })()
   *
   * // returns
   * [
   *  {
   *   "txid": "99093e8a19e0a649bf943dbc33d926feb09c02e61258c1bdaf2caffa7183c730",
   *   "vout": 1,
   *   "value": "546",
   *   "height": 636885,
   *   "confirmations": 123,
   *   "satoshis": 546,
   *   "isSlp": true
   *  },
   *  {
   *   "txid": "2069e99a90499693e42cd1db82147e3e0acfe5e7315c6cc2f0252432f45300d7",
   *   "vout": 0,
   *   "value": "600",
   *   "height": 636885,
   *   "confirmations": 123,
   *   "satoshis": 600,
   *   "isSlp": false
   *  }
   * ]
   */

  // Note: There is no way to validate SLP UTXOs without inspecting the OP_RETURN.
  // If a UTXO returns false when its txid is passed to validateTxid(), then the
  // UTXO is not associated with SLP. This is a fast and quick check.
  // If a UTXO returns true though, the OP_RETURN has to be inspected to determine
  // for sure that it *is* associated with an SLP transaction not just change.
  async isTokenUtxo(utxos) {
    try {
      // Throw error if input is not an array.
      if (!Array.isArray(utxos)) throw new Error(`Input must be an array.`)

      // Loop through each element in the array and spot check the required
      // properties.
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

      const validatedSlpUtxos = []

      // Loop through each utxo.
      for (let i = 0; i < utxos.length; i++) {
        const utxo = utxos[i]

        // console.log(`thisValidation: `, thisValidation)
        // console.log(`utxo: `, utxo)

        // Validate the txid for the UTXO using SLPDB.
        const isValid = await _this.validateTxid(utxo.txid)
        // console.log(`isValid: ${JSON.stringify(isValid, null, 2)}`)

        // If SLPDB says the UTXOs TXID is invalid, mark the UTXO and move on.
        if (!isValid) {
          utxo.isSlp = false
          validatedSlpUtxos.push(utxo)
          continue
        }

        // Decode the OP_RETURN.
        let slpData = {}
        try {
          slpData = await _this.decodeOpReturn2(utxo.txid)
          // console.log(`slpData: ${JSON.stringify(slpData, null, 2)}`)
        } catch (err) {
          // console.log(`decodeOpReturn2 error: `, err)
          // If that function throws an error, then mark the UTXO as false.
          utxo.isSlp = false
          validatedSlpUtxos.push(utxo)
          continue
        }

        const txType = slpData.txType.toLowerCase()

        // Handle Genesis and Mint SLP transactions.
        if (txType === "genesis" || txType === "mint") {
          if (
            utxo.vout !== slpData.mintBatonVout && // UTXO is not a mint baton output.
            utxo.vout !== 1 // UTXO is not the reciever of the genesis or mint tokens.
          ) {
            // Can safely be marked as false.
            utxo.isSlp = false
            validatedSlpUtxos.push(utxo)
            continue
          }
          //

          // Handle Send transactions.
        } else if (txType === "send") {
          const slpOutputs = slpData.amounts.length

          // If the UTXO vout value does not line up with an SLP output in the
          // OP_RETURN, then it is not an SLP UTXO.
          if (utxo.vout > slpOutputs) {
            utxo.isSlp = false
            validatedSlpUtxos.push(utxo)
            continue
          }
        }

        // If code path gets to this point and it hasn't been marked false,
        // then it can safely be marked as true.
        utxo.isSlp = true
        validatedSlpUtxos.push(utxo)

        // Below is deprecated, but kept for posterity:
        // Invalidate the utxo if it contains more than dust, since SLP token
        // UTXOs only contain dust values. <--- NOT TRUE
        // Note: This is not a very accurate way to make a determination.
        // See https://gist.github.com/christroutner/434ae0c710001b57e33a4fa8abb7d478
        //if (utxo.satoshis > 546) validations[i] = false
      }

      return validatedSlpUtxos
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.tokenUtxoDetails() tokenUtxoDetails() - Get token details on a UTXO
   * @apiName tokenUtxoDetails
   * @apiGroup SLP
   * @apiDescription Hydrate a UTXO with SLP token metadata.
   *
   * Expects an array of UTXO objects as input. Returns an array of equal size.
   * If the
   * UTXO does not belong to a SLP transaction, it will return false.
   * If the UTXO is part of an SLP transaction, it will return the UTXO object
   * with additional SLP information attached. An isValid property will be included.
   * If its value is true, the UTXO is a valid SLP UTXO. If the value is null,
   * then SLPDB has not yet processed that txid and validity has not been confirmed.
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   *  const u = await bchjs.Blockbook.utxos(`bitcoincash:qpcqs0n5xap26un2828n55gan2ylj7wavvzeuwdx05`)
   *  const utxos = u.utxos
   *
   *  const utxoInfo = await bchjs.SLP.Utils.tokenUtxoDetails(utxos)
   *
   *  console.log(`utxoInfo: ${JSON.stringify(isSLPUtxo,null,2)}`)
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
   *  "isValid": true
   * }
   */

  // CT 1/11/20: Refactored to comply with this GitHub Issue:
  // https://github.com/Bitcoin-com/slp-sdk/issues/84
  async tokenUtxoDetails(utxos) {
    try {
      // Throw error if input is not an array.
      if (!Array.isArray(utxos)) throw new Error(`Input must be an array.`)

      // Loop through each element in the array and validate the input before
      // further processing.
      for (let i = 0; i < utxos.length; i++) {
        const utxo = utxos[i]

        // Convert Blockbook UTXOs to Insight format.
        if (utxo.value) utxo.satoshis = Number(utxo.value)

        // Throw error if utxo does not have a satoshis property.
        if (!utxo.satoshis)
          throw new Error(`utxo ${i} does not have a satoshis property.`)

        // Throw error if utxo does not have a txid property.
        if (!utxo.txid)
          throw new Error(`utxo ${i} does not have a txid property.`)
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
          slpData = await this.decodeOpReturn(utxo.txid)
          // console.log(`slpData: ${JSON.stringify(slpData, null, 2)}`)
        } catch (err) {
          // console.log(`decodeOpReturn err: `, err)

          if (
            err.message === "Not an OP_RETURN" ||
            err.message === "Not a SLP OP_RETURN"
          ) {
            // An error will be thrown if the txid is not SLP.
            // Mark as false and continue the loop.
            outAry.push(false)

            continue
          } else {
            throw err
          }
        }

        // If there is an OP_RETURN, attempt to decode it.
        // Handle Genesis SLP transactions.
        if (slpData.transactionType === "genesis") {
          if (
            utxo.vout !== slpData.mintBatonVout && // UTXO is not a mint baton output.
            utxo.vout !== 1 // UTXO is not the reciever of the genesis or mint tokens.
          ) {
            // Can safely be marked as false.
            outAry[i] = false
          }

          // If this is a valid SLP UTXO, then return the decoded OP_RETURN data.
          else {
            utxo.tokenType = "minting-baton"
            utxo.tokenId = utxo.txid
            utxo.tokenTicker = slpData.ticker
            utxo.tokenName = slpData.name
            utxo.tokenDocumentUrl = slpData.documentUrl
            utxo.tokenDocumentHash = slpData.documentHash
            utxo.decimals = slpData.decimals

            // something
            outAry[i] = utxo
          }
        }

        // Handle Mint SLP transactions.
        if (slpData.transactionType === "mint") {
          if (
            utxo.vout !== slpData.mintBatonVout && // UTXO is not a mint baton output.
            utxo.vout !== 1 // UTXO is not the reciever of the genesis or mint tokens.
          ) {
            // Can safely be marked as false.
            outAry[i] = false
          }

          // If UTXO passes validation, then return formatted token data.
          else {
            const genesisData = await this.decodeOpReturn(slpData.tokenId)

            // Hydrate the UTXO object with information about the SLP token.
            utxo.utxoType = "token"
            utxo.transactionType = "mint"
            utxo.tokenId = slpData.tokenId

            utxo.tokenTicker = genesisData.ticker
            utxo.tokenName = genesisData.name
            utxo.tokenDocumentUrl = genesisData.documentUrl
            utxo.tokenDocumentHash = genesisData.documentHash
            utxo.decimals = genesisData.decimals

            utxo.mintBatonVout = slpData.mintBatonVout
            utxo.batonStillExists = slpData.batonStillExists

            // Calculate the real token quantity.
            utxo.tokenQty = slpData.quantity / Math.pow(10, utxo.decimals)

            outAry[i] = utxo
          }
        }

        // Handle Send SLP transactions.
        if (slpData.transactionType === "send") {
          // Filter out any vouts that match.
          const voutMatch = slpData.spendData.filter(x => utxo.vout === x.vout)
          // console.log(`voutMatch: ${JSON.stringify(voutMatch, null, 2)}`)

          // If there are no vout matches, the UTXO can safely be marked as false.
          if (voutMatch.length === 0) {
            outAry[i] = false
          }

          // If UTXO passes validation, then return formatted token data.
          else {
            const genesisData = await this.decodeOpReturn(slpData.tokenId)
            // console.log(`genesisData: ${JSON.stringify(genesisData, null, 2)}`)

            // console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)

            // Hydrate the UTXO object with information about the SLP token.
            utxo.utxoType = "token"
            utxo.transactionType = "send"
            utxo.tokenId = slpData.tokenId
            utxo.tokenTicker = genesisData.ticker
            utxo.tokenName = genesisData.name
            utxo.tokenDocumentUrl = genesisData.documentUrl
            utxo.tokenDocumentHash = genesisData.documentHash
            utxo.decimals = genesisData.decimals

            // Calculate the real token quantity.
            utxo.tokenQty = voutMatch[0].quantity / Math.pow(10, utxo.decimals)

            // console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)

            outAry[i] = utxo
          }
        }

        // Finally, validate the SLP txid with SLPDB.
        if (outAry[i]) {
          const isValid = await this.validateTxid(utxo.txid)
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
}

module.exports = Utils
