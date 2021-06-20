const axios = require('axios')

let _this

class Mining {
  constructor (config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
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
  }

  async getDSProof (txid) {
    try {
      if (!txid) {
        throw new Error('txid is required')
      }
      if (txid.length !== 64) {
        throw new Error(`txid must be of length 64 (not ${txid.length})`)
      }
      const response = await _this.axios.get(
        `${this.restURL}dsproof/getdsproof/${txid}`,
        _this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = Mining
