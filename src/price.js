const axios = require('axios')

// let _this

class Price {
  constructor (config) {
    // _this = this

    this.restURL = config.restURL
    this.apiToken = config.apiToken
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

    this.axios = axios
  }

  // This endpoint is deprecated. Documentation removed.
  async current (currency = 'usd') {
    try {
      const response = await this.axios.get(
        `https://index-api.bitcoin.com/api/v0/cash/price/${currency.toLowerCase()}`
      )
      // console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`)

      return response.data.price
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data
      else throw err
    }
  }

  /**
   * @api price.getUsd() getUsd()
   * @apiName Price getUsd()
   * @apiGroup Price
   * @apiDescription Return current price of BCH in USD.
   * This endpoint gets the USD price of BCH from the Coinbase API. The price
   * comes from bch-api, so it has a better chance of working in Tor.
   *
   * @apiExample Example usage:
   *(async () => {
   *  try {
   *    let current = await bchjs.Price.getUsd();
   *    console.log(current);
   *  } catch(err) {
   *   console.error(err)
   *  }
   *})()
   *
   * // 266.81
   */
  async getUsd () {
    try {
      const response = await this.axios.get(
        `${this.restURL}price/usd`,
        this.axiosOptions
      )
      // console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`)

      return response.data.usd
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data
      else throw err
    }
  }

  /**
   * @api price.rates() rates()
   * @apiName Price rates()
   * @apiGroup Price
   * @apiDescription Return current price of BCH in several different currencies.
   * This endpoint gets the price of BCH from the Coinbase API in many different
   * currencies. The price
   * comes from bch-api, so it has a better chance of working in Tor.
   *
   * @apiExample Example usage:
   *(async () => {
   *  try {
   *    let current = await bchjs.Price.rates();
   *    console.log(current);
   *  } catch(err) {
   *   console.error(err)
   *  }
   *})()
   *
   * {
   *   AED: "915.049218",
   *   AFN: "19144.48874646",
   *   ALGO: "826.6633482661356600405",
   *   ...
   *   ZRX: "644.844402797695193656",
   *   ZWL: "80215.03"
   * }
   */
  async rates () {
    try {
      const response = await this.axios.get(
        `${this.restURL}price/rates`,
        this.axiosOptions
      )
      // console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`)

      return response.data
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data
      else throw err
    }
  }

  /**
   * @api price.getBchaUsd() getBchaUsd()
   * @apiName Price getBchaUsd()
   * @apiGroup Price
   * @apiDescription Return current price of BCHA in USD.
   * This endpoint gets the USD price of XEC from the Coinex API. The price
   * denominated in BCHA comes from bch-api, so it has a better chance of
   * working in Tor.
   *
   * @apiExample Example usage:
   *(async () => {
   *  try {
   *    let current = await bchjs.Price.getBchaUsd();
   *    console.log(current);
   *  } catch(err) {
   *   console.error(err)
   *  }
   *})()
   *
   * // 212.34
   */
  async getBchaUsd () {
    try {
      const response = await this.axios.get(
        `${this.restURL}price/bchausd`,
        this.axiosOptions
      )
      // console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`)

      const bchaPrice = response.data.usd * 1000000
      // Convert XEC denomination to BCHA denomination

      return bchaPrice
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data
      else throw err
    }
  }

  /**
   * @api price.getXecUsd() getXecUsd()
   * @apiName Price getXecUsd()
   * @apiGroup Price
   * @apiDescription Return current price of XEC in USD.
   * This endpoint gets the USD price of XEC from the Coinex API. The price
   * comes from bch-api, so it has a better chance of working in Tor.
   *
   * @apiExample Example usage:
   *(async () => {
   *  try {
   *    let current = await bchjs.Price.getXecUsd();
   *    console.log(current);
   *  } catch(err) {
   *   console.error(err)
   *  }
   *})()
   *
   * // 0.00021234
   */
  async getXecUsd () {
    try {
      const response = await this.axios.get(
        `${this.restURL}price/bchausd`,
        this.axiosOptions
      )
      // console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`)

      return response.data.usd
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data
      else throw err
    }
  }

  /**
   * @api price.getBchUsd() getBchUsd()
   * @apiName Price getBchUsd()
   * @apiGroup Price
   * @apiDescription Return current price of BCH in USD.
   * This endpoint gets the USD price of BCH from the Coinex API. The price
   * comes from bch-api, so it has a better chance of working in Tor.
   *
   * @apiExample Example usage:
   *(async () => {
   *  try {
   *    let current = await bchjs.Price.getBchUsd();
   *    console.log(current);
   *  } catch(err) {
   *   console.error(err)
   *  }
   *})()
   *
   * // 512.81
   */
  async getBchUsd () {
    try {
      const response = await this.axios.get(
        `${this.restURL}price/bchusd`,
        this.axiosOptions
      )
      // console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`)

      return response.data.usd
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data
      else throw err
    }
  }
}

module.exports = Price
