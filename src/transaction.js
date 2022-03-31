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
