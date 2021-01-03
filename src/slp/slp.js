/*
  This is the parent library for the SLP class. It was originally forked from slp-sdk.

  TODO: Create an SLP fee calculator like slpjs:
  https://github.com/simpleledger/slpjs/blob/master/lib/slp.ts#L921
*/

// imports
// require deps
// const BCHJS = require("../bch-js")
const Address = require('./address')
const ECPair = require('./ecpair')
// const HDNode = require("./hdnode")
const TokenType1 = require('./tokentype1')
const NFT1 = require('./nft1')
const Utils = require('./utils')

// SLP is a superset of BITBOX
class SLP {
  constructor (config) {
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

    this.Address = new Address(config)
    this.ECPair = ECPair
    this.TokenType1 = new TokenType1(config)
    this.NFT1 = new NFT1(this.restURL)
    this.Utils = new Utils(config)
  }
}

module.exports = SLP
