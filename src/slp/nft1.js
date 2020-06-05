/*
  This library wraps the slp-mdm library to generate the OP_RETURN for NFT1 tokens.
*/

const Address = require("./address")

const BigNumber = require("bignumber.js")
const slpMdm = require("slp-mdm")

// const addy = new Address()
let addy
const TransactionBuilder = require("../transaction-builder")

class TokenType1 {
  constructor(config) {
    this.restURL = config.restURL

    addy = new Address(config)

    // Instantiate the transaction builder.
    TransactionBuilder.setAddress(addy)
  }

  // Parent NFT
  generateNFTParentOpReturn(configObj) {
    try {
      // TODO: Add input validation.

      // Prevent error if user fails to add the document hash.
      if (!configObj.documentHash) configObj.documentHash = ""

      // If mint baton is not specified, then replace it with null.
      if (!configObj.mintBatonVout) configObj.mintBatonVout = null

      const script = slpMdm.NFT1.Group.genesis(
        configObj.ticker,
        configObj.name,
        configObj.documentUrl,
        configObj.documentHash,
        0,
        configObj.mintBatonVout,
        new slpMdm.BN("1")
      )

      return script
    } catch (err) {
      console.log(`Error in generateNFTParentOpReturn()`)
      throw err
    }
  }

  generateNFTChildOpReturn(configObj) {
    try {
      // TODO: Add input validation.

      // Prevent error if user fails to add the document hash.
      if (!configObj.documentHash) configObj.documentHash = ""

      // If mint baton is not specified, then replace it with null.
      if (!configObj.mintBatonVout) configObj.mintBatonVout = null

      const script = slpMdm.NFT1.Group.genesis(
        configObj.ticker,
        configObj.name,
        configObj.documentUrl,
        configObj.documentHash,
        0,
        configObj.mintBatonVout,
        new slpMdm.BN("1")
      )

      return script
    } catch (err) {
      console.log(`Error in generateNFTChildOpReturn()`)
      throw err
    }
  }
}

module.exports = TokenType1
