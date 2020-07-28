/*
  This library interacts with the ElectrumX bch-api REST API endpoints operated
  by FullStack.cash
*/

const axios = require("axios")

let _this

class ElectrumX {
  constructor(config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken

    // Add JWT token to the authorization header.
    this.axiosOptions = {
      headers: {
        authorization: `Token ${this.apiToken}`,
        timeout: 15000
      }
    }

    _this = this
  }

  /**
   * @api Electrumx.utxo()  utxo() - Get a list of uxto for an address.
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
  async utxo(address) {
    try {
      // Handle single address.
      if (typeof address === "string") {
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

      throw new Error(`Input address must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Electrumx.balance()  balance() - Get the balance for an address.
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
  async balance(address) {
    try {
      // Handle single address.
      if (typeof address === "string") {
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

      throw new Error(`Input address must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Electrumx.transactions()  transactions() - Get the transaction history for an address.
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
  async transactions(address) {
    try {
      // Handle single address.
      if (typeof address === "string") {
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

      throw new Error(`Input address must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = ElectrumX
