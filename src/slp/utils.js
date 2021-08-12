/* eslint-disable no-useless-catch */

// Public npm libraries
const axios = require('axios')
const slpParser = require('slp-parser')
const BigNumber = require('bignumber.js')

// Local libraries
const Util = require('../util')

let _this

class Utils {
  constructor (config) {
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
  async list (id) {
    let path
    let method

    if (!id) {
      method = 'get'
      path = `${this.restURL}slp/list`
    } else if (typeof id === 'string') {
      method = 'get'
      path = `${this.restURL}slp/list/${id}`
    } else if (typeof id === 'object') {
      method = 'post'
      path = `${this.restURL}slp/list`
    }

    // console.log(`path: ${path}`)

    try {
      let response
      if (method === 'get') {
        response = await _this.axios.get(path, this.axiosOptions)
      } else {
        response = await _this.axios.post(
          path,
          {
            tokenIds: id
          },
          this.axiosOptions
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
  async balancesForAddress (address) {
    try {
      // Single address.
      if (typeof address === 'string') {
        const path = `${this.restURL}slp/balancesForAddress/${address}`

        const response = await _this.axios.get(path, this.axiosOptions)
        return response.data

        // Array of addresses.
      } else if (Array.isArray(address)) {
        const path = `${this.restURL}slp/balancesForAddress`

        // Dev note: must use axios.post for unit test stubbing.
        const response = await _this.axios.post(
          path,
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
  async balancesForToken (tokenId) {
    try {
      const path = `${this.restURL}slp/balancesForToken/${tokenId}`

      const response = await _this.axios.get(path, this.axiosOptions)
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
  // This function has two responses. If SLPDB is working correctly, the output
  // will be like the examples above. If SLPDB has fallen behind real-time
  // processing, it will return this output:
  // [ null ]
  async validateTxid (txid, usrObj = null) {
    const path = `${this.restURL}slp/validateTxid`

    // console.log(`txid: ${JSON.stringify(txid, null, 2)}`)
    // console.log(`validateTxid usrObj: ${JSON.stringify(usrObj, null, 2)}`)

    // Handle a single TXID or an array of TXIDs.
    let txids
    if (typeof txid === 'string') txids = [txid]
    else txids = txid

    try {
      // console.log('validateTxid() this.axiosOptions: ', this.axiosOptions)
      const response = await _this.axios.post(
        path,
        {
          txids: txids,
          usrObj // pass user data when making an internal call.
        },
        this.axiosOptions
      )
      // console.log(
      //   `validateTxid response.data: ${JSON.stringify(response.data, null, 2)}`
      // )

      const validatedTxids = response.data

      return validatedTxids
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.validateTxid2() validateTxid2()
   * @apiName validateTxid2
   * @apiGroup SLP Utils
   * @apiDescription Validate that txid is an SLP transaction.
   *
   * This second validatoin version uses the slp-validate slp library. It is
   * much slower and less efficient than SLPDB and is prone to time-outs for
   * tokens with large DAGs. However, it operates independently of SLPDB and
   * is a great second validation option, particularly when SLPDB returns 'null'
   * values.
   *
   * Due to the inefficiency of this call, only a single TXID can be input at a
   * time. This call will throw an error if the input is an array.
   *
   * @apiExample Example usage:
   *
   * // validate single SLP txid
   * (async () => {
   *  try {
   *    let validated = await bchjs.SLP.Utils.validateTxid2(
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
   */
  async validateTxid2 (txid) {
    try {
      // console.log(`txid: ${JSON.stringify(txid, null, 2)}`)

      if (
        !txid ||
        txid === '' ||
        typeof txid !== 'string' ||
        txid.length !== 64
      ) {
        throw new Error('txid must be 64 character string.')
      }

      const path = `${this.restURL}slp/validateTxid2/${txid}`

      // console.log('validateTxid2() this.axiosOptions: ', this.axiosOptions)
      const response = await _this.axios.get(path, this.axiosOptions)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data

      if (error.error && error.error.indexOf('Network error') > -1) {
        throw new Error('slp-validate timed out')
      }

      throw error
    }
  }

  /**
   * @api SLP.Utils.whitelist() whitelist()
   * @apiName whitelist
   * @apiGroup SLP Utils
   * @apiDescription Get SLP tokens in whitelist
   * Retrieves a list of the SLP tokens that in the whitelist. Tokens in the
   * whitelist can be validated with the validateTxid3() function. validateTxid3()
   * will still work when the SLP network is under stress.
   *
   * @apiExample Example usage:
   *
   * // validate single SLP txid
   * (async () => {
   *  try {
   *    let list = await bchjs.SLP.Utils.whitelit();
   *    console.log(list);
   *  } catch (error) {
   *    console.error(error);
   *  }
   * })();
   *
   * // returns
   * [
   *   {
   *     name: 'USDH',
   *     tokenId:
   *       'c4b0d62156b3fa5c8f3436079b5394f7edc1bef5dc1cd2f9d0c4d46f82cca479'
   *   },
   *   {
   *     name: 'SPICE',
   *     tokenId:
   *       '4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf'
   *   },
   *   {
   *     name: 'PSF',
   *     tokenId:
   *       '38e97c5d7d3585a2cbf3f9580c82ca33985f9cb0845d4dcce220cb709f9538b0'
   *   },
   *   {
   *     name: 'TROUT',
   *     tokenId:
   *       'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2'
   *   },
   *   {
   *     name: 'PSFTEST',
   *     tokenId:
   *       'd0ef4de95b78222bfee2326ab11382f4439aa0855936e2fe6ac129a8d778baa0'
   *   }
   * ]
   */
  async getWhitelist () {
    try {
      const path = `${this.restURL}slp/whitelist`

      // Retrieve the whitelist from the REST API if we haven't gotten it yet.
      if (this.whitelist.length === 0) {
        const response = await _this.axios.get(path, this.axiosOptions)
        // console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`)

        this.whitelist = response.data
      }

      return this.whitelist
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.validateTxid3() validateTxid3()
   * @apiName validateTxid3
   * @apiGroup SLP Utils
   * @apiDescription
   * Validate that txid is an SLP transaction using the SLPDB whitelist server.
   * Same exact functionality as the validateTxid() function, but this function
   * calls the whitelist SLPDB. It will only validate SLP tokens that are in the
   * whitelist. You can retrieve the whitelist with the SLP.Utils.whitelist()
   * function.
   *
   * @apiExample Example usage:
   *
   * // validate single SLP txid
   * (async () => {
   *  try {
   *    let validated = await bchjs.SLP.Utils.validateTxid3(
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
   *    let validated = await bchjs.SLP.Utils.validateTxid3([
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
  async validateTxid3 (txid, usrObj = null) {
    const path = `${this.restURL}slp/validateTxid3`

    // console.log(`txid: ${JSON.stringify(txid, null, 2)}`)
    // console.log(`path: ${JSON.stringify(path, null, 2)}`)
    // console.log('validateTxid3 usrObj: ', usrObj)

    // Handle a single TXID or an array of TXIDs.
    let txids
    if (typeof txid === 'string') txids = [txid]
    else txids = txid

    try {
      // console.log('validateTxid3() this.axiosOptions: ', this.axiosOptions)
      const response = await _this.axios.post(
        path,
        {
          txids: txids,
          usrObj // pass user data when making an internal call.
        },
        this.axiosOptions
      )
      // console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`)

      const validatedTxids = response.data

      return validatedTxids
    } catch (error) {
      // console.log('validateTxid3 error: ', error)

      // This case handles rate limit errors.
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error)
      }

      // Not sure if this can be safely deprecated?
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
  async tokenStats (tokenId) {
    try {
      const path = `${this.restURL}slp/tokenStats/${tokenId}`

      const response = await _this.axios.get(path, this.axiosOptions)

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
  async transactions (tokenId, address) {
    try {
      const path = `${this.restURL}slp/transactions/${tokenId}/${address}`

      const response = await _this.axios.get(path, this.axiosOptions)

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
  async burnTotal (transactionId) {
    try {
      const path = `${this.restURL}slp/burnTotal/${transactionId}`

      const response = await _this.axios.get(path, this.axiosOptions)

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
  async txDetails (txid) {
    try {
      if (
        !txid ||
        txid === '' ||
        typeof txid !== 'string' ||
        txid.length !== 64
      ) {
        throw new Error('txid string must be included.')
      }

      // console.log(`this.restURL: ${this.restURL}`)
      const path = `${this.restURL}slp/txDetails/${txid}`

      const response = await _this.axios.get(path, this.axiosOptions)
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

  /**
   * @api SLP.Utils.tokenUtxoDetails() tokenUtxoDetails()
   * @apiName tokenUtxoDetails
   * @apiGroup SLP Utils
   * @apiDescription Hydrate a UTXO with SLP token metadata.
   *
   * Expects an array of UTXO objects as input. Returns an array of equal size.
   * Returns UTXO data hydrated with token information.
   *
   * - If the UTXO does not belong to a SLP transaction, it will return an
   * `isValid` property set to `false`.
   *
   * - If the UTXO is part of an SLP transaction, it will return the UTXO object
   * with additional SLP information attached. An `isValid` property will be
   * included.
   *   - If the `isValid` property is `true`, the UTXO is a valid SLP UTXO.
   *   - If the `isValid` property is `null`, then SLPDB has not yet processed
   *     that txid and validity has not been confirmed, or a 429 rate-limit error
   *     was enountered during the processing of the request.
   *
   * An optional second input object, `usrObj`, allows the user to inject an
   * artifical delay while processing UTXOs. If `usrObj.utxoDelay` is set to
   * a number, the call will delay by that number of milliseconds between
   * processing UTXOs.
   *
   * This is an API-heavy call. If you get a lot of `null` values, then slow down
   * the calls by using the usrObj.utxoDelay property, or request info on fewer
   * UTXOs at a
   * time. `null` indicates that the UTXO can *not* be safely spent, because
   * a judgement as to weather it is a token UTXO has not been made. Spending it
   * could burn tokens. It's safest to ignore UTXOs with a value of `null`.
   *
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   *  const utxos = await bchjs.Electrumx.utxo(`bitcoincash:qpcqs0n5xap26un2828n55gan2ylj7wavvzeuwdx05`)
   *
   *  // Delay 100mS between processing UTXOs, to prevent rate-limit errors.
   *  const utxoInfo = await bchjs.SLP.Utils.tokenUtxoDetails(utxos, { utxoDelay: 100 })
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
  async tokenUtxoDetails (utxos, usrObj = null) {
    try {
      // Throw error if input is not an array.
      if (!Array.isArray(utxos)) throw new Error('Input must be an array.')

      // console.log(`tokenUtxoDetails usrObj: ${JSON.stringify(usrObj, null, 2)}`)

      // Loop through each element in the array and validate the input before
      // further processing.
      for (let i = 0; i < utxos.length; i++) {
        const utxo = utxos[i]

        // Ensure the UTXO has a txid or tx_hash property.
        if (!utxo.txid) {
          // If Electrumx, convert the tx_hash property to txid.
          if (utxo.tx_hash) {
            utxo.txid = utxo.tx_hash
          } else {
            // If there is neither a txid or tx_hash property, throw an error.
            throw new Error(
              `utxo ${i} does not have a txid or tx_hash property.`
            )
          }
        }

        // Ensure the UTXO has a vout or tx_pos property.
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

      // Hydrate each UTXO with data from SLP OP_REUTRNs.
      const outAry = await this._hydrateUtxo(utxos, usrObj)
      // console.log(`outAry: ${JSON.stringify(outAry, null, 2)}`)

      // *After* each UTXO has been hydrated with SLP data,
      // validate the TXID with SLPDB.
      for (let i = 0; i < outAry.length; i++) {
        const utxo = outAry[i]

        // *After* the UTXO has been hydrated with SLP data,
        // validate the TXID with SLPDB.
        if (utxo.tokenType) {
          // Only execute this code-path if the current UTXO has a 'tokenType'
          // property. i.e. it has been successfully hydrated with SLP
          // information.

          // Validate using a 'waterfall' of validators.
          utxo.isValid = await this.waterfallValidateTxid(utxo.txid, usrObj)
          // console.log(`isValid: ${JSON.stringify(utxo.isValid, null, 2)}`)
        }
      }

      return outAry
    } catch (error) {
      // console.log('Error in tokenUtxoDetails()')
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  /**
   * @api SLP.Utils.tokenUtxoDetailsWL() tokenUtxoDetailsWL()
   * @apiName tokenUtxoDetailsWL
   * @apiGroup SLP Utils
   * @apiDescription
   *
   * Same as tokenUtxoDetails(), but it only uses the whitelist SLPDB to
   * validate UTXOs. This will result in a lot of `isValid: null` values,
   * but much more performant handling of SLP tokens. Some wallet apps prefer
   * the scaling performance over the breadth of supported tokens.
   *
   * An optional second input object, `usrObj`, allows the user to inject an
   * artifical delay while processing UTXOs. If `usrObj.utxoDelay` is set to
   * a number, the call will delay by that number of milliseconds between
   * processing UTXOs.
   *
   * This is an API-heavy call. If you get a lot of `null` values, then slow down
   * the calls by using the usrObj.utxoDelay property, or request info on fewer
   * UTXOs at a
   * time. `null` indicates that the UTXO can *not* be safely spent, because
   * a judgement as to weather it is a token UTXO has not been made. Spending it
   * could burn tokens. It's safest to ignore UTXOs with a value of `null`.
   *
   */
  async tokenUtxoDetailsWL (utxos, usrObj = null) {
    try {
      // Throw error if input is not an array.
      if (!Array.isArray(utxos)) throw new Error('Input must be an array.')

      // Loop through each element in the array and validate the input before
      // further processing.
      for (let i = 0; i < utxos.length; i++) {
        const utxo = utxos[i]

        // Ensure the UTXO has a txid or tx_hash property.
        if (!utxo.txid) {
          // If Electrumx, convert the tx_hash property to txid.
          if (utxo.tx_hash) {
            utxo.txid = utxo.tx_hash
          } else {
            // If there is neither a txid or tx_hash property, throw an error.
            throw new Error(
              `utxo ${i} does not have a txid or tx_hash property.`
            )
          }
        }

        // Ensure the UTXO has a vout or tx_pos property.
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

      // Hydrate each UTXO with data from SLP OP_REUTRNs.
      const outAry = await this._hydrateUtxo(utxos, usrObj)
      // console.log(`outAry: ${JSON.stringify(outAry, null, 2)}`)

      // *After* each UTXO has been hydrated with SLP data,
      // validate the TXID with SLPDB.
      for (let i = 0; i < outAry.length; i++) {
        const utxo = outAry[i]

        // *After* the UTXO has been hydrated with SLP data,
        // validate the TXID with SLPDB.
        if (utxo.tokenType) {
          // Only execute this block if the current UTXO has a 'tokenType'
          // property. i.e. it has been successfully hydrated with SLP
          // information.

          // Validate against the whitelist SLPDB.
          const whitelistResult = await this.validateTxid3(utxo.txid, usrObj)
          // console.log(
          //   `whitelist-SLPDB for ${txid}: ${JSON.stringify(
          //     whitelistResult,
          //     null,
          //     2
          //   )}`
          // )

          let isValid = null

          // Safely retrieve the returned value.
          if (whitelistResult[0] !== null) isValid = whitelistResult[0].valid

          utxo.isValid = isValid
        }
      }

      return outAry
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  // This is a private function that is called by tokenUtxoDetails().
  // It loops through an array of UTXOs and tries to hydrate them with SLP
  // token information from the OP_RETURN data.
  //
  // This function makes several calls to decodeOpReturn() to retrieve SLP
  // token data. If that call throws an error due to hitting rate limits, this
  // function will not throw an error. Instead, it will mark the `isValid`
  // property as `null`
  //
  // Exception to the above: It *will* throw an error if decodeOpReturn() throws
  // an error while trying to get the Genesis transaction for a Send or Mint
  // transaction. However, that is a rare occurence since the cache of
  // decodeOpReturn() will minimize API calls for this case. This behavior
  // could be changed, but right now it's a corner case of a corner case.
  //
  // If the usrObj has a utxoDelay property, then it will delay the loop for
  // each UTXO by that many milliseconds.
  async _hydrateUtxo (utxos, usrObj = null) {
    try {
      const decodeOpReturnCache = {}

      // console.log(`_hydrateUtxo usrObj: ${JSON.stringify(usrObj, null, 2)}`)

      // Output Array
      const outAry = []

      // Loop through each utxo
      for (let i = 0; i < utxos.length; i++) {
        const utxo = utxos[i]

        // If the user passes in a delay, then wait.
        if (usrObj && usrObj.utxoDelay && !isNaN(Number(usrObj.utxoDelay))) {
          const delayMs = Number(usrObj.utxoDelay)
          await this.util.sleep(delayMs)
        }

        // Get raw transaction data from the full node and attempt to decode
        // the OP_RETURN data.
        // If there is no OP_RETURN, mark the UTXO as false.
        let slpData = false
        try {
          slpData = await this.decodeOpReturn(
            utxo.txid,
            decodeOpReturnCache,
            usrObj // pass user data when making an internal call.
          )
          // console.log(`slpData: ${JSON.stringify(slpData, null, 2)}`)
        } catch (err) {
          // console.log(
          //   `error in _hydrateUtxo() from decodeOpReturn(${utxo.txid}): `,
          //   err
          // )

          // An error will be thrown if the txid is not SLP.
          // If error is for some other reason, like a 429 error, mark utxo as 'null'
          // to display the unknown state.
          if (
            !err.message ||
            (err.message.indexOf('scriptpubkey not op_return') === -1 &&
              err.message.indexOf('lokad id') === -1 &&
              err.message.indexOf('trailing data') === -1)
          ) {
            // console.log(
            //   "unknown error from decodeOpReturn(). Marking as 'null'",
            //   err
            // )

            utxo.isValid = null
            outAry.push(utxo)

            // If error is thrown because there is no OP_RETURN, then it's not
            // an SLP UTXO.
            // Mark as false and continue the loop.
          } else {
            // console.log('marking as invalid')
            utxo.isValid = false
            outAry.push(utxo)
          }

          // Halt the execution of the loop and increase to the next index.
          continue
        }
        // console.log(`slpData: ${JSON.stringify(slpData, null, 2)}`)

        const txType = slpData.txType.toLowerCase()

        // console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)

        // If there is an OP_RETURN, attempt to decode it.
        // Handle Genesis SLP transactions.
        if (txType === 'genesis') {
          if (
            utxo.vout !== slpData.mintBatonVout && // UTXO is not a mint baton output.
            utxo.vout !== 1 // UTXO is not the reciever of the genesis or mint tokens.
          ) {
            // Can safely be marked as false.
            utxo.isValid = false
            outAry[i] = utxo
          } else {
            // If this is a valid SLP UTXO, then return the decoded OP_RETURN data.
            // Minting Baton
            if (utxo.vout === slpData.mintBatonVout) {
              utxo.utxoType = 'minting-baton'
            } else {
              // Tokens

              utxo.utxoType = 'token'
              utxo.tokenQty = new BigNumber(slpData.qty)
                .div(Math.pow(10, slpData.decimals))
                .toString()
            }

            utxo.tokenId = utxo.txid
            utxo.tokenTicker = slpData.ticker
            utxo.tokenName = slpData.name
            utxo.tokenDocumentUrl = slpData.documentUri
            utxo.tokenDocumentHash = slpData.documentHash
            utxo.decimals = slpData.decimals
            utxo.tokenType = slpData.tokenType

            // Initial value is null until UTXO can be validated and confirmed
            // to be valid (true) or not (false).
            utxo.isValid = null

            outAry[i] = utxo
          }
        }

        // Handle Mint SLP transactions.
        if (txType === 'mint') {
          if (
            utxo.vout !== slpData.mintBatonVout && // UTXO is not a mint baton output.
            utxo.vout !== 1 // UTXO is not the reciever of the genesis or mint tokens.
          ) {
            // Can safely be marked as false.
            utxo.isValid = false

            outAry[i] = utxo
          } else {
            // If UTXO passes validation, then return formatted token data.

            const genesisData = await this.decodeOpReturn(
              slpData.tokenId,
              decodeOpReturnCache,
              usrObj // pass user data when making an internal call.
            )
            // console.log(`genesisData: ${JSON.stringify(genesisData, null, 2)}`)

            // Minting Baton
            if (utxo.vout === slpData.mintBatonVout) {
              utxo.utxoType = 'minting-baton'
            } else {
              // Tokens

              utxo.utxoType = 'token'
              utxo.tokenQty = new BigNumber(slpData.qty)
                .div(Math.pow(10, genesisData.decimals))
                .toString()
            }

            // Hydrate the UTXO object with information about the SLP token.
            utxo.transactionType = 'mint'
            utxo.tokenId = slpData.tokenId
            utxo.tokenType = slpData.tokenType

            utxo.tokenTicker = genesisData.ticker
            utxo.tokenName = genesisData.name
            utxo.tokenDocumentUrl = genesisData.documentUri
            utxo.tokenDocumentHash = genesisData.documentHash
            utxo.decimals = genesisData.decimals

            utxo.mintBatonVout = slpData.mintBatonVout

            // Initial value is null until UTXO can be validated and confirmed
            // to be valid (true) or not (false).
            utxo.isValid = null

            outAry[i] = utxo
          }
        }

        // Handle Send SLP transactions.
        if (txType === 'send') {
          // Filter out any vouts that match.
          // const voutMatch = slpData.spendData.filter(x => utxo.vout === x.vout)
          // console.log(`voutMatch: ${JSON.stringify(voutMatch, null, 2)}`)

          // Figure out what token quantity is represented by this utxo.
          const tokenQty = slpData.amounts[utxo.vout - 1]
          // console.log('tokenQty: ', tokenQty)

          if (!tokenQty) {
            utxo.isValid = false

            outAry[i] = utxo
          } else {
            // If UTXO passes validation, then return formatted token data.

            const genesisData = await this.decodeOpReturn(
              slpData.tokenId,
              decodeOpReturnCache,
              usrObj // pass user data when making an internal call.
            )
            // console.log(`genesisData: ${JSON.stringify(genesisData, null, 2)}`)

            // console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)

            // Hydrate the UTXO object with information about the SLP token.
            utxo.utxoType = 'token'
            utxo.transactionType = 'send'
            utxo.tokenId = slpData.tokenId
            utxo.tokenTicker = genesisData.ticker
            utxo.tokenName = genesisData.name
            utxo.tokenDocumentUrl = genesisData.documentUri
            utxo.tokenDocumentHash = genesisData.documentHash
            utxo.decimals = genesisData.decimals
            utxo.tokenType = slpData.tokenType

            // Initial value is null until UTXO can be validated and confirmed
            // to be valid (true) or not (false).
            utxo.isValid = null

            // Calculate the real token quantity.

            const tokenQtyBig = new BigNumber(tokenQty).div(
              Math.pow(10, genesisData.decimals)
            )
            // console.log(`tokenQtyBig`, tokenQtyBig.toString())
            utxo.tokenQty = tokenQtyBig.toString()

            // console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)

            outAry[i] = utxo
          }
        }
      }

      return outAry
    } catch (error) {
      // console.log('_hydrateUtxo error: ', error)
      throw error
    }
  }

  /**
   * @api SLP.Utils.waterfallValidateTxid() waterfallValidateTxid()
   * @apiName waterfallValidateTxid
   * @apiGroup SLP Utils
   * @apiDescription Use multiple validators to validate an SLP TXID.
   *
   * This function aggregates all the available SLP token validation sources.
   * It starts with the fastest, most-efficient source first, and continues
   * to other validation sources until the txid is validated (true or false).
   * If the txid goes through all sources and can't be validated, it will
   * return null.
   *
   * Validation sources from most efficient to least efficient:
   * - SLPDB with whitelist filter
   * - SLPDB general purpose
   * - slp-api
   *
   * Currently only supports a single txid at a time.
   *
   * @apiExample Example usage:
   *
   * // validate single SLP txid
   * (async () => {
   *  try {
   *    let validated = await bchjs.SLP.Utils.waterfallValidateTxid(
   *      "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb"
   *    );
   *    console.log(validated);
   *  } catch (error) {
   *    console.error(error);
   *  }
   * })();
   *
   * // returns
   * true
   */
  async waterfallValidateTxid (txid, usrObj = null) {
    try {
      // console.log('txid: ', txid)

      const cachedTxValidation = {}

      // If the value has been cached, use the cached version first.
      let isValid = cachedTxValidation[txid]
      if (!isValid && isValid !== false) {
        isValid = null
      } else {
        return isValid
      }

      // There are two possible responses from SLPDB. If SLPDB is functioning
      // correctly, then validateTxid() will return this:
      // isValid: [
      //   {
      //  "txid": "ff0c0354f8d3ddb34fa36f73494eb58ea24f8b8da6904aa8ed43b7a74886c583",
      //  "valid": true
      //   }
      // ]
      //
      // If SLPDB has fallen behind real-time processing, it will return this:
      // isValid: [
      //   null
      // ]
      //
      // Note: validateTxid3() has the same output as validateTxid().
      // validateTxid2() uses slp-validate, which has a different output format.

      // Validate against the whitelist SLPDB first.
      const whitelistResult = await this.validateTxid3(txid, usrObj)
      // console.log(
      //   `whitelist-SLPDB for ${txid}: ${JSON.stringify(
      //     whitelistResult,
      //     null,
      //     2
      //   )}`
      // )

      // Safely retrieve the returned value.
      if (whitelistResult[0] !== null) isValid = whitelistResult[0].valid

      // Exit if isValid is not null.
      if (isValid !== null) {
        // Save to the cache.
        cachedTxValidation[txid] = isValid

        return isValid
      }

      // Try the general SLPDB, if the whitelist returned null.
      const generalResult = await this.validateTxid(txid, usrObj)
      // console.log(
      //   `validateTxid() isValid: ${JSON.stringify(generalResult, null, 2)}`
      // )

      // Safely retrieve the returned value.
      if (generalResult[0] !== null) isValid = generalResult[0].valid

      // Exit if isValid is not null.
      if (isValid !== null) {
        // Save to the cache.
        cachedTxValidation[txid] = isValid

        return isValid
      }

      // If still null, as a last resort, check it against slp-validate
      let slpValidateResult = null
      try {
        slpValidateResult = await this.validateTxid2(txid)
      } catch (err) {
        /* exit quietly */
      }
      // console.log(
      //   `slpValidateResult: ${JSON.stringify(slpValidateResult, null, 2)}`
      // )

      // Exit if isValid is not null.
      if (slpValidateResult !== null) {
        isValid = slpValidateResult.isValid

        // Save to the cache.
        cachedTxValidation[txid] = isValid

        return isValid
      }

      // If isValid is still null, return that value, signaling that the txid
      // could not be validated.
      return isValid
    } catch (error) {
      // This case handles rate limit errors.
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error)
      }

      // console.log('Error in waterfallValidateTxid()')
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
   * which greatly increases the speed, since fewer API calls need to be made.
   * However, internal API calls are still counted against your rate limits.
   *
   * This function expects an array of UTXO objects as input. It returns an
   * array of equal size. The UTXO data hydrated with token information.
   * - If the UTXO does not belong to a SLP transaction, it will return an
   *   `isValid` property set to `false`.
   * - If the UTXO is part of an SLP transaction, it will return the UTXO object
   *   with additional SLP information attached. An `isValid` property will be
   *   included.
   *     - If `isValid` is `true`, the UTXO is a valid SLP UTXO.
   *     - If `isValid` is `null`, then SLPDB has not yet processed that txid
   *       and validity has not been confirmed,
   *       or a 429 rate-limit error was enountered during the processing of the
   *       request.
   *
   * An optional second input object, `usrObj`, allows the user to inject an
   * artifical delay while processing UTXOs. If `usrObj.utxoDelay` is set to
   * a number, the call will delay by that number of milliseconds between
   * processing UTXOs.
   *
   * This is an API-heavy call. If you get a lot of `null` values, then slow down
   * the calls by using the usrObj.utxoDelay property, or request info on fewer
   * UTXOs at a
   * time. `null` indicates that the UTXO can *not* be safely spent, because
   * a judgement as to weather it is a token UTXO has not been made. Spending it
   * could burn tokens. It's safest to ignore UTXOs with a value of `null`.
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
   *  // Wait 100mS between processing UTXOs, to prevent rate limit errors.
   *  const utxoInfo = await bchjs.SLP.Utils.hydrateUtxos(utxos.utxos, { utxoDelay: 100 })
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
   * (async () => {
   * try {
   *   const utxos = [
   *     {
   *       utxos: [
   *         {
   *           txid: "d56a2b446d8149c39ca7e06163fe8097168c3604915f631bc58777d669135a56",
   *           vout: 3,
   *           value: "6816",
   *           height: 606848,
   *           confirmations: 13,
   *           satoshis: 6816
   *         }
   *       ]
   *    }
   *  ]
   *
   *  const utxoInfo = await bchjs.SLP.Utils.hydrateUtxos(utxos)
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
   *        "txid": "d56a2b446d8149c39ca7e06163fe8097168c3604915f631bc58777d669135a56",
   *        "vout": 3,
   *        "value": "6816",
   *        "height": 606848,
   *        "confirmations": 13,
   *        "satoshis": 6816,
   *        "isValid": false
   *      }
   *    ]
   *  }
   *  ]
   */
  // Same as tokenUtxoDetails(), but reduces API calls by having bch-api server
  // do the heavy lifting.
  async hydrateUtxos (utxos, usrObj) {
    try {
      // Throw error if input is not an array.
      if (!Array.isArray(utxos)) throw new Error('Input must be an array.')

      const response = await _this.axios.post(
        `${this.restURL}slp/hydrateUtxos`,
        {
          utxos: utxos,
          usrObj
        },
        this.axiosOptions
      )

      return response.data
    } catch (error) {
      console.log('Error in hydrateUtxos(): ', error)

      if (error.response && error.response.data) {
        throw new Error(JSON.stringify(error.response.data, null, 2))
      }
      throw error
    }
  }

  /**
   * @api SLP.Utils.hydrateUtxosWL() hydrateUtxosWL()
   * @apiName hydrateUtxosWL
   * @apiGroup SLP Utils
   * @apiDescription
   * This call is exactly the same as `hydrateUtxos()`. This version hydrate a
   * UTXO with SLP token metadata, but only uses the whitelist SLPDB for
   * validation.
   *
   * Whitelist SLPDBs will return `isValid: null` for any token not in the
   * 'whitelist' filter. Filtered SLPDBs are much smaller and more reliable
   * to operate.
   *
   */
  // Same as tokenUtxoDetailsWL(), but reduces API calls by having bch-api server
  // do the heavy lifting.
  async hydrateUtxosWL (utxos) {
    try {
      // Throw error if input is not an array.
      if (!Array.isArray(utxos)) throw new Error('Input must be an array.')

      const response = await _this.axios.post(
        `${this.restURL}slp/hydrateUtxosWL`,
        {
          utxos: utxos
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
   * @api SLP.Utils.getStatus() getStatus()
   * @apiName getStatus
   * @apiGroup SLP Utils
   * @apiDescription Get the status and health of the SLPDB connected to bch-api.
   *
   * @apiExample Example usage:
   *
   * // Get the current blockheight of the SLPDB indexer.
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
   */
  async getStatus (txid) {
    const path = `${this.restURL}slp/status`

    try {
      const response = await _this.axios.get(path, this.axiosOptions)
      // console.log(
      //   `getStatus response.data: ${JSON.stringify(response.data, null, 2)}`
      // )

      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }
}

module.exports = Utils
