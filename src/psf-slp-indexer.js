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
  async getTokenData (tokenId) {
    try {
      const url = `${this.restURL}psf/slp/token/data`
      // console.log(`url: ${url}`)

      // Handle single address.
      if (typeof tokenId === 'string') {
        const response = await axios.post(
          // 'https://bchn.fullstack.cash/v5/psf/slp/token/data/',
          url,
          { tokenId },
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
}

module.exports = PsfSlpIndexer
