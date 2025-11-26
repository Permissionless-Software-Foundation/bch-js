import axios from 'axios'

// let _this

class Price {
  constructor (config) {
    this.restURL = config.restURL
    this.authToken = config.authToken

    this.axiosOptions = {
      headers: {
        authorization: this.authToken
      }
    }

    // Use the shared axios instance if provided, otherwise fall back to axios
    this.axios = config.axios || axios
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

  /**
   * @api price.getPsffppPrice() getPsffppPrice()
   * @apiName Price getPsffppPrice()
   * @apiGroup Price
   * @apiDescription Return the cost in PSF tokens to write 1MB of data to the PSFFPP
   * Find out more at PSFFPP.com. This is a IPFS pinning service that can pin
   * up to 100MB per transaction into its network. The cost is denominated in
   * PSF SLP tokens. The endpoint returns the cost to pin 1MB of data to the
   * PSFFPP network.
   *
   * @apiExample Example usage:
   *(async () => {
   *  try {
   *    let current = await bchjs.Price.getPsffppPrice();
   *    console.log(current);
   *  } catch(err) {
   *   console.error(err)
   *  }
   *})()
   *
   * // 0.08335233
   */
  async getPsffppPrice () {
    try {
      const response = await this.axios.get(
         `${this.restURL}price/psffpp`,
         this.axiosOptions
      )

      return response.data.writePrice
    } catch (err) {
      if (err.response && err.response.data) throw err.response.data
      else throw err
    }
  }
}

export default Price
