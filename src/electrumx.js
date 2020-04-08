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
   * @api ElectrumX.utxo()  utxo() - Get a list of uxto for an address.
   * @apiName ElectrumX Utxo
   * @apiGroup ElectrumX
   * @apiDescription Return a list of uxtos for an address.
   *
   * @apiExample Example usage:
   *    (async () => {
   *   try {
   *     let utxo = await bchjs.Electrumx.utxo('bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf');
   *     console.log(utxo);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   * utxo = {
   *     success: true,
   *     utxos: [
   *       {
   *         height: 602405,
   *         tx_hash:
   *           "2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7",
   *         tx_pos: 0,
   *         value: 1000
   *       }
   *     ]
   *   }
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
}

module.exports = ElectrumX
