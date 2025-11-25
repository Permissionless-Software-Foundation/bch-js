import axios from 'axios'

// let _this

class Mining {
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

  async getBlockTemplate (templateRequest) {
    try {
      const response = await this.axios.get(
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
      const response = await this.axios.get(
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
      const response = await this.axios.get(
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
      const response = await this.axios.post(path, this.axiosOptions)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

export default Mining
