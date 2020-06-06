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
        new slpMdm.BN(configObj.initialQty)
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

  generateNFTChildGenesisOpReturn(configObj) {
    try {
      // TODO: Add input validation.

      // Prevent error if user fails to add the document hash.
      if (!configObj.documentHash) configObj.documentHash = ""

      // If mint baton is not specified, then replace it with null.
      if (!configObj.mintBatonVout) configObj.mintBatonVout = null

      const script = slpMdm.NFT1.Child.genesis(
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
      console.log(`Error in generateNFTChildGenesisOpReturn()`)
      throw err
    }
  }

  // Generate the OP_RETURN for sending an NFT Child token.
  // Assumes all tokenUtxos have the same tokenId in common. It does not filter
  // the input.
  generateNFTChildSendOpReturn(tokenUtxos, sendQty) {
    try {
      // TODO: Add input validation.

      const tokenId = tokenUtxos[0].tokenId

      // Calculate the total amount of tokens owned by the wallet.
      let totalTokens = 0
      for (let i = 0; i < tokenUtxos.length; i++)
        totalTokens += tokenUtxos[i].tokenQty

      const change = totalTokens - sendQty

      let script
      let outputs = 1

      // The normal case, when there is token change to return to sender.
      if (change > 0) {
        outputs = 2

        // Convert to integer string.
        const sendStr = Math.floor(sendQty).toString()
        const changeStr = Math.floor(change).toString()

        // Generate the OP_RETURN as a Buffer.
        script = slpMdm.NFT1.Child.send(tokenId, [
          new slpMdm.BN(sendStr),
          new slpMdm.BN(changeStr)
        ])
        //

        // Corner case, when there is no token change to send back.
      } else {
        // Convert to integer string.
        const sendStr = Math.floor(sendQty).toString()

        // Generate the OP_RETURN as a Buffer.
        script = slpMdm.NFT1.Child.send(tokenId, [new slpMdm.BN(sendStr)])
      }

      return { script, outputs }
    } catch (err) {
      console.log(`Error in generateNFTChildSendOpReturn()`)
      throw err
    }
  }

  // Generate the OP_RETURN for sending an NFT Group token.
  // Assumes all tokenUtxos have the same tokenId in common, it does not filter
  // the input.
  generateNFTGroupSendOpReturn(tokenUtxos, sendQty) {
    try {
      // TODO: Add input validation.

      const tokenId = tokenUtxos[0].tokenId

      // Calculate the total amount of tokens owned by the wallet.
      let totalTokens = 0
      for (let i = 0; i < tokenUtxos.length; i++)
        totalTokens += tokenUtxos[i].tokenQty

      const change = totalTokens - sendQty

      let script
      let outputs = 1

      // The normal case, when there is token change to return to sender.
      if (change > 0) {
        outputs = 2

        // Convert to integer string.
        const sendStr = Math.floor(sendQty).toString()
        const changeStr = Math.floor(change).toString()

        // Generate the OP_RETURN as a Buffer.
        script = slpMdm.NFT1.Group.send(tokenId, [
          new slpMdm.BN(sendStr),
          new slpMdm.BN(changeStr)
        ])
        //

        // Corner case, when there is no token change to send back.
      } else {
        // Convert to integer string.
        const sendStr = Math.floor(sendQty).toString()

        // Generate the OP_RETURN as a Buffer.
        script = slpMdm.NFT1.Group.send(tokenId, [new slpMdm.BN(sendStr)])
      }

      return { script, outputs }
    } catch (err) {
      console.log(`Error in generateNFTGroupSendOpReturn()`)
      throw err
    }
  }
}

module.exports = TokenType1
