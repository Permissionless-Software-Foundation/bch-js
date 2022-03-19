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

  // Proxy the call to the psf-slp-indexer.
  async get (txid) {
    return await this.psfSlpIndexer.tx(txid)
  }

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
