import axios from 'axios'

// let _this

class Mining {
  constructor (config) {
    this.restURL = config.restURL
    this.authToken = config.authToken

    this.axiosOptions = {
      headers: {
        authorization: this.authToken
      }
    }
  }

  async getBlockTemplate (templateRequest) {
    try {
      const response = await axios.get(
        `${this.restURL}mining/getBlockTemplate/${templateRequest}`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getMiningInfo () {
    try {
      const response = await axios.get(
        `${this.restURL}mining/getMiningInfo`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getNetworkHashps (nblocks = 120, height = 1) {
    try {
      const response = await axios.get(
        `${this.restURL}mining/getNetworkHashps?nblocks=${nblocks}&height=${height}`,
        this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async submitBlock (hex, parameters) {
    let path = `${this.restURL}mining/submitBlock/${hex}`
    if (parameters) path = `${path}?parameters=${parameters}`

    try {
      const response = await axios.post(path, this.axiosOptions)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

export default Mining
