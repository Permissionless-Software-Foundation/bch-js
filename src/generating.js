import axios from 'axios'

// let _this

class Generating {
  constructor (config) {
    this.restURL = config.restURL
    this.authToken = config.authToken
    // Use the shared axios instance if provided, otherwise fall back to axios
    this.axios = config.axios || axios

    this.axiosOptions = {
      headers: {
        authorization: this.authToken
      }
    }
  }

  async generateToAddress (blocks, address, maxtries = 1000000) {
    try {
      const response = await this.axios.post(
        `${this.restURL}generating/generateToAddress/${blocks}/${address}?maxtries=${maxtries}`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

export default Generating
