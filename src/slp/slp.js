/*
  This is the parent library for the SLP class. It was originally forked from slp-sdk.

  TODO: Create an SLP fee calculator like slpjs:
  https://github.com/simpleledger/slpjs/blob/master/lib/slp.ts#L921
*/

// imports
// require deps
//const BCHJS = require("../bch-js")
const Address = require("./address")
const ECPair = require("./ecpair")
// const HDNode = require("./hdnode")
const TokenType1 = require("./tokentype1")
const NFT1 = require("./nft1")
const Utils = require("./utils")

// SLP is a superset of BITBOX
class SLP {
  constructor(config) {
    const tmp = {}
    if (!config || !config.restURL) {
      tmp.restURL = `https://api.fullstack.cash/v3/`
    } else {
      tmp.restURL = config.restURL
      tmp.apiToken = config.apiToken
    }

    this.restURL = tmp.restURL
    this.apiToken = tmp.apiToken

    this.Address = new Address(tmp)
    this.ECPair = ECPair
    this.TokenType1 = new TokenType1(tmp)
    this.NFT1 = new NFT1(this.restURL)
    this.Utils = new Utils(tmp)
  }
}

module.exports = SLP
