/*
  This library interacts with the ElectrumX bch-api REST API endpoints operated
  by FullStack.cash
*/
// Public npm libraries
const axios = require('axios')

// Local libraries.
const Blockchain = require('./blockchain')

let _this

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

    this.blockchain = new Blockchain(config)

    _this = this
  }

  /**
   * @api Electrumx.utxo()  utxo()
   * @apiName ElectrumX Utxo
   * @apiGroup ElectrumX
   * @apiDescription Return a list of uxtos for an address.
   *
   * @apiExample Example usage:
   *    (async () => {
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
      // Handle single address.
      if (typeof address === 'string') {
        const response = await axios.get(
          `${this.restURL}electrumx/utxos/${address}`,
          _this.axiosOptions
        )
        return response.data

        // Handle array of addresses.
      } else if (Array.isArray(address)) {
        const response = await axios.post(
          `${this.restURL}electrumx/utxos`,
          {
            addresses: address
          },
          _this.axiosOptions
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
   *     console.log(utxo);
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
   *     console.log(utxo);
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
          _this.axiosOptions
        )
        return response.data

        // Handle array of addresses.
      } else if (Array.isArray(address)) {
        const response = await axios.post(
          `${this.restURL}electrumx/balance`,
          {
            addresses: address
          },
          _this.axiosOptions
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
  async transactions (address) {
    try {
      // Handle single address.
      if (typeof address === 'string') {
        const response = await axios.get(
          `${this.restURL}electrumx/transactions/${address}`,
          _this.axiosOptions
        )
        return response.data

        // Handle array of addresses.
      } else if (Array.isArray(address)) {
        const response = await axios.post(
          `${this.restURL}electrumx/transactions`,
          {
            addresses: address
          },
          _this.axiosOptions
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
          _this.axiosOptions
        )
        return response.data

        // Handle array of addresses.
      } else if (Array.isArray(address)) {
        const response = await axios.post(
          `${this.restURL}electrumx/unconfirmed`,
          {
            addresses: address
          },
          _this.axiosOptions
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
        _this.axiosOptions
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
          _this.axiosOptions
        )
        return response.data
      } else if (Array.isArray(txid)) {
        const response = await axios.post(
          `${this.restURL}electrumx/tx/data`,
          {
            txids: txid
          },
          _this.axiosOptions
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
          _this.axiosOptions
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
      // Filter out unconfirmed transactions, with a height of 0 or less.
      txs = txs.filter(elem => elem.height > 0)

      if (sortingOrder === 'DESCENDING') {
        return txs.sort((a, b) => b.height - a.height)
      }
      return txs.sort((a, b) => a.height - b.height)
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
      throw err
    }
  }
}

module.exports = ElectrumX
