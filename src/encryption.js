/*
  This library contains useful functions that deal with encryption.
*/

const axios = require('axios')

let _this

class Encryption {
  constructor (config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.axios = axios
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

    _this = this
  }

  // Search the blockchain for a public key associated with a BCH address.
  async getPubKey (addr) {
    try {
      if (!addr || typeof addr !== 'string') { throw new Error('Input must be a valid Bitcoin Cash address.') }

      const response = await _this.axios.get(
        `${this.restURL}encryption/publickey/${addr}`,
        _this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = Encryption
