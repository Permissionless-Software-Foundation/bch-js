/*
  This library interacts with the public REST API endpoints that OpenBazaar
  provides for their application.
*/

const axios = require("axios")

let _this

class OpenBazaar {
  constructor(config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken

    // Add JWT token to the authorization header.
    this.axiosOptions = {
      headers: {
        authorization: `Token ${this.apiToken}`
      }
    }

    _this = this
  }

  /**
   * @api OpenBazaar.balance() balance()
   * @apiName OpenBazaar Balance
   * @apiGroup OpenBazaar
   * @apiDescription Return Balance about an address.
   *
   * @apiExample Example usage:
   * (async () => {
   *   try {
   *     let balance = await bchjs.OpenBazaar.balance('bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9');
   *     console.log(balance)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * {
   *   page: 1,
   *   totalPages: 1,
   *   itemsOnPage: 1000,
   *   addrStr: "bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9",
   *   balance: "0.00001",
   *   totalReceived: "0.00001",
   *   totalSent: "0",
   *   unconfirmedBalance: "0",
   *   unconfirmedTxApperances: 0,
   *   txApperances: 1,
   *   transactions: [
   *     "2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7"
   *   ]
   * }
   *
   */
  async balance(address) {
    try {
      // Handle single address.
      if (typeof address === "string") {
        let response
        if (process.env.NETWORK === "testnet") {
          response = await axios.get(
            `https://tbch.blockbook.api.openbazaar.org/api/address/${address}`,
            _this.axiosOptions
          )
        } else {
          response = await axios.get(
            `https://bch.blockbook.api.openbazaar.org/api/address/${address}`,
            _this.axiosOptions
          )
        }

        return response.data
      }

      throw new Error(`Input address must be a string.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api OpenBazaar.utxo()  utxo()
   * @apiName OpenBazaar Utxo
   * @apiGroup OpenBazaar
   * @apiDescription Return list of uxto for address.
   *
   * @apiExample Example usage:
   *    (async () => {
   *   try {
   *     let utxo = await bchjs.OpenBazaar.utxo('bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9');
   *     console.log(utxo);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * [
   *   {
   *     txid: "2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7",
   *     vout: 0,
   *     amount: "0.00001",
   *     satoshis: 1000,
   *     height: 602405,
   *     confirmations: 11
   *   }
   * ]
   */
  async utxo(address) {
    try {
      // Handle single address.
      if (typeof address === "string") {
        let response
        if (process.env.NETWORK === "testnet") {
          response = await axios.get(
            `https://tbch.blockbook.api.openbazaar.org/api/utxo/${address}`,
            _this.axiosOptions
          )
        } else {
          response = await axios.get(
            `https://bch.blockbook.api.openbazaar.org/api/utxo/${address}`,
            _this.axiosOptions
          )
        }
        return response.data
      }
      throw new Error(`Input address must be a string.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api OpenBazaar.tx()  tx()
   * @apiName OpenBazaar Tx
   * @apiGroup OpenBazaar
   * @apiDescription Get details on a transaction.
   *
   * @apiExample Example usage:
   *    (async () => {
   *   try {
   *     let txDetails = await bchjs.OpenBazaar.tx(`2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7`);
   *     console.log(txDetails);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   *{
   *  txid: "2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7",
   *  version: 2,
   *  vin: [
   *   {
   *    txid: "5f09d317e24c5d376f737a2711f3bd1d381abdb41743fff3819b4f76382e1eac",
   *    vout: 1,
   *    sequence: 4294967295,
   *    n: 0,
   *    scriptSig: {
   *      hex:
   *        "473044022000dd11c41a472f2e54348db996e60864d489429f12d1e044d49ff600b880c9590220715a926404bb0e2731a3795afb341ec1dad3f84ead7d27cd31fcc59abb14738c4121038476128287ac37c7a3cf7e8625fd5f024db1bc3d8e37395abe7bf42fda78d0d9"
   *    },
   *    addresses: ["bitcoincash:qqxy8hycqe89j7wa79gnggq6z3gaqu2uvqy26xehfe"],
   *    value: "0.00047504"
   *   }
   *  ],
   *  vout: [
   *   {
   *    value: "0.00001",
   *    n: 0,
   *    scriptPubKey: {
   *      hex: "76a9142fe2c4c5ef359bb2fe1a849f891cecffbcfb4f7788ac",
   *      addresses: ["bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9"]
   *    },
   *    spent: false
   *   },
   *   {
   *    value: "0.00046256",
   *    n: 1,
   *    scriptPubKey: {
   *      hex: "76a9142dbf5e1804c39a497b908c876097d63210c8490288ac",
   *      addresses: ["bitcoincash:qqkm7hscqnpe5jtmjzxgwcyh6ceppjzfqg3jdn422e"]
   *    },
   *    spent: false
   *   }
   *  ],
   *  blockhash: "0000000000000000010903a1fc4274499037c9339be9ec7338ee980331c20ce5",
   *  blockheight: 602405,
   *  confirmations: 11,
   *  blocktime: 1569792892,
   *  valueOut: "0.00047256",
   *  valueIn: "0.00047504",
   *  fees: "0.00000248",
   *  hex:
   *    "0200000001ac1e2e38764f9b81f3ff4317b4bd1a381dbdf311277a736f375d4ce217d3095f010000006a473044022000dd11c41a472f2e54348db996e60864d489429f12d1e044d49ff600b880c9590220715a926404bb0e2731a3795afb341ec1dad3f84ead7d27cd31fcc59abb14738c4121038476128287ac37c7a3cf7e8625fd5f024db1bc3d8e37395abe7bf42fda78d0d9ffffffff02e8030000000000001976a9142fe2c4c5ef359bb2fe1a849f891cecffbcfb4f7788acb0b40000000000001976a9142dbf5e1804c39a497b908c876097d63210c8490288ac00000000"
   * }
   *
   */
  async tx(txid) {
    try {
      // Handle single txid.
      if (typeof txid === "string") {
        let response
        if (process.env.NETWORK === "testnet") {
          response = await axios.get(
            `https://tbch.blockbook.api.openbazaar.org/api/tx/${txid}`,
            _this.axiosOptions
          )
        } else {
          response = await axios.get(
            `https://bch.blockbook.api.openbazaar.org/api/tx/${txid}`,
            _this.axiosOptions
          )
        }
        return response.data
      }

      throw new Error(`Input txid must be a string.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = OpenBazaar
