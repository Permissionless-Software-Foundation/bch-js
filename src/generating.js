const axios = require("axios")

let _this

class Generating {
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

  async generateToAddress(blocks, address, maxtries = 1000000) {
    try {
      const response = await axios.post(
        `${this.restURL}generating/generateToAddress/${blocks}/${address}?maxtries=${maxtries}`,
        _this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = Generating
