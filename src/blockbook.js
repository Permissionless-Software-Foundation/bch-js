/*
  This library interacts with the REST API endpoints in bch-api that communicate
  with the Blockbook API.

  CT 11/10/20
  These endpoints will be soon be deprecated. Blockbook is being fazed out in
  favor of Fulcrum.
*/

const axios = require("axios")

let _this

class Blockbook {
  constructor(config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    // console.log(`Blockbook apiToken: ${this.apiToken}`)

    // Add JWT token to the authorization header.
    this.axiosOptions = {
      headers: {
        authorization: `Token ${this.apiToken}`
      }
    }

    _this = this
  }

  async balance(address) {
    try {
      // Handle single address.
      if (typeof address === "string") {
        const response = await axios.get(
          `${this.restURL}blockbook/balance/${address}`,
          _this.axiosOptions
        )

        return response.data

        // Handle array of addresses.
      } else if (Array.isArray(address)) {
        const response = await axios.post(
          `${this.restURL}blockbook/balance`,
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

  async utxo(address) {
    try {
      // Handle single address.
      if (typeof address === "string") {
        const response = await axios.get(
          `${this.restURL}blockbook/utxos/${address}`,
          _this.axiosOptions
        )
        return response.data

        // Handle array of addresses.
      } else if (Array.isArray(address)) {
        const response = await axios.post(
          `${this.restURL}blockbook/utxos`,
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

  async tx(txid) {
    try {
      // Handle single txid.
      if (typeof txid === "string") {
        const response = await axios.get(
          `${this.restURL}blockbook/tx/${txid}`,
          _this.axiosOptions
        )
        return response.data

        // Handle array of addresses.
      } else if (Array.isArray(txid)) {
        const response = await axios.post(
          `${this.restURL}blockbook/tx`,
          {
            txids: txid
          },
          _this.axiosOptions
        )

        return response.data
      }

      throw new Error(`Input txid must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = Blockbook
