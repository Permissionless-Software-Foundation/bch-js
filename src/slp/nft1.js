/*
  This library wraps the slp-mdm library to generate the OP_RETURN for NFT1 tokens.

  NFT Group tokens (Parents) are generated and minted. They are like amorphous
  NFTs; like stem cells that haven't specialized yet.

  NFT 'Children' are the 'real' NFTs. They are created by burning an NFT Group
  (Parent) token.
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

  // New NFT Group 'Parent'
  newNFTGroupOpReturn(configObj) {
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

  // Mint additional NFT Group 'Parent' tokens.
  mintNFTGroupOpReturn(tokenUtxos, mintQty, destroyBaton = false) {
    try {
      // Throw error if input is not an array.
      if (!Array.isArray(tokenUtxos))
        throw new Error(`tokenUtxos must be an array.`)

      // Loop through the tokenUtxos array and find the minting baton.
      let mintBatonUtxo
      for (let i = 0; i < tokenUtxos.length; i++) {
        if (tokenUtxos[i].utxoType === "minting-baton")
          mintBatonUtxo = tokenUtxos[i]
      }

      // Throw an error if the minting baton could not be found.
      if (!mintBatonUtxo)
        throw new Error(`Minting baton could not be found in tokenUtxos array.`)

      const tokenId = mintBatonUtxo.tokenId

      if (!tokenId)
        throw new Error(`tokenId property not found in mint-baton UTXO.`)

      // Signal that the baton should be passed or detroyed.
      let batonVout = 2
      if (destroyBaton) batonVout = null

      const script = slpMdm.NFT1.Group.mint(
        tokenId,
        batonVout,
        new slpMdm.BN(mintQty)
      )

      return script
    } catch (err) {
      // console.log(`Error in generateMintOpReturn()`)
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
