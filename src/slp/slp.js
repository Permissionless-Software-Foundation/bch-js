/*
  This is the parent library for the SLP class. It was originally forked from slp-sdk.

  TODO: Create an SLP fee calculator like slpjs:
  https://github.com/simpleledger/slpjs/blob/master/lib/slp.ts#L921
*/

// imports
// require deps
// import BCHJS from "../bch-js.js"
import Address from './address.js'
import ECPair from './ecpair.js'
// import HDNode from "./hdnode.js"
import TokenType1 from './tokentype1.js'
import NFT1 from './nft1.js'
import Utils from './utils.js'

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
    this.NFT1 = new NFT1(config)
    this.Utils = new Utils(config)
  }
}

export default SLP
