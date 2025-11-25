import axios from 'axios'

// let _this

class Generating {
  constructor (config) {
    this.restURL = config.restURL
    this.authToken = config.authToken

    this.axiosOptions = {
      headers: {
        authorization: this.authToken
      }
    }
  }

  async generateToAddress (blocks, address, maxtries = 1000000) {
    try {
      const response = await axios.post(
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
