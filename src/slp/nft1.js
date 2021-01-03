/*
  This library wraps the slp-mdm library to generate the OP_RETURN for NFT1 tokens.

  NFT Group tokens (Parents) are generated and minted. They are like amorphous
  NFTs; like stem cells that haven't specialized yet.

  NFT 'Children' are the 'real' NFTs. They are created by burning an NFT Group
  (Parent) token.
*/

const Address = require('./address')

// const BigNumber = require('bignumber.js')
const slpMdm = require('slp-mdm')

// const addy = new Address()
let addy
const TransactionBuilder = require('../transaction-builder')

class TokenType1 {
  constructor (config) {
    this.restURL = config.restURL

    addy = new Address(config)

    // Instantiate the transaction builder.
    TransactionBuilder.setAddress(addy)
  }

  /**
   * @api SLP.NFT1.newNFTGroupOpReturn() newNFTGroupOpReturn()
   * @apiName newNFTGroupOpReturn
   * @apiGroup SLP NFT1
   * @apiDescription Generate the OP_RETURN value needed to create an SLP
   * NFT Group token.
   * It's assumed all elements in the tokenUtxos array belong to the same token.
   *
   * Returns a Buffer representing a transaction output, ready to be added to
   * the Transaction Builder.
   *
   * @apiExample Example usage:
   *
   *   const configObj = {
   *     name: "SLP Test Token",
   *     ticker: "SLPTEST",
   *     documentUrl: "https://FullStack.cash",
   *     initialQty: 1
   *   }
   *
   *   const result = await bchjs.SLP.NFT1.newNFTGroupOpReturn(
   *     configObj
   *   )
   *
   *  ...
   *  // Add OP_RETURN as first output.
   *  transactionBuilder.addOutput(slpData, 0);
   *
   *  // See additional code here:
   *  // https://github.com/Permissionless-Software-Foundation/bch-js-examples/tree/master/applications/slp/nft
   *
   */
  newNFTGroupOpReturn (configObj) {
    try {
      // TODO: Add input validation.

      // Prevent error if user fails to add the document hash.
      if (!configObj.documentHash) configObj.documentHash = ''

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
      console.log('Error in generateNFTParentOpReturn()')
      throw err
    }
  }

  // Mint additional NFT Group 'Parent' tokens.
  /**
   * @api SLP.NFT1.mintNFTGroupOpReturn() mintNFTGroupOpReturn()
   * @apiName mintNFTGroupOpReturn
   * @apiGroup SLP NFT1
   * @apiDescription Generate the OP_RETURN value needed to create an SLP Mint
   * transaction for an NFT Group token.
   * It's assumed all elements in the tokenUtxos array belong to the same token.
   *
   * Returns a Buffer representing a transaction output, ready to be added to
   * the Transaction Builder.
   *
   * @apiExample Example usage:
   *
   *  const addr = "bitcoincash:qq6xz6wwcy78uh79vgjvfyahj4arq269w5an8pcjak"
   *  const utxos = await bchjs.Blockbook.utxos(addr)
   *
   *  // Identify the SLP token UTXOs.
   *  let tokenUtxos = await bchjs.SLP.Utils.tokenUtxoDetails(utxos);
   *
   *  // Filter out the minting baton.
   *  tokenUtxos = tokenUtxos.filter((utxo, index) => {
   *    if (
   *      utxo && // UTXO is associated with a token.
   *      utxo.tokenId === TOKENID && // UTXO matches the token ID.
   *      utxo.utxoType === "minting-baton" && // UTXO is not a minting baton.
   *      utxo.tokenType === 129 // UTXO is for NFT Group
   *    )
   *    return true;
   *  });
   *
   *  // Generate the SLP OP_RETURN
   *  const slpData = bchjs.SLP.NFT1.mintNFTGroupOpReturn(
   *    tokenUtxos,
   *    1 // Mint 1 new token.
   *  );
   *
   *  ...
   *  // Add OP_RETURN as first output.
   *  transactionBuilder.addOutput(slpData, 0);
   *
   *  // See additional code here:
   *  // https://github.com/Permissionless-Software-Foundation/bch-js-examples/tree/master/applications/slp/nft
   */
  mintNFTGroupOpReturn (tokenUtxos, mintQty, destroyBaton = false) {
    // try {
    // Throw error if input is not an array.
    if (!Array.isArray(tokenUtxos)) {
      throw new Error('tokenUtxos must be an array.')
    }

    // Loop through the tokenUtxos array and find the minting baton.
    let mintBatonUtxo
    for (let i = 0; i < tokenUtxos.length; i++) {
      if (tokenUtxos[i].utxoType === 'minting-baton') {
        mintBatonUtxo = tokenUtxos[i]
      }
    }

    // Throw an error if the minting baton could not be found.
    if (!mintBatonUtxo) {
      throw new Error('Minting baton could not be found in tokenUtxos array.')
    }

    const tokenId = mintBatonUtxo.tokenId

    if (!tokenId) {
      throw new Error('tokenId property not found in mint-baton UTXO.')
    }

    // Signal that the baton should be passed or detroyed.
    let batonVout = 2
    if (destroyBaton) batonVout = null

    const script = slpMdm.NFT1.Group.mint(
      tokenId,
      batonVout,
      new slpMdm.BN(mintQty)
    )

    return script
    // } catch (err) {
    //   // console.log(`Error in generateMintOpReturn()`)
    //   throw err
    // }
  }

  /**
   * @api SLP.NFT1.generateNFTChildGenesisOpReturn() generateNFTChildGenesisOpReturn()
   * @apiName generateNFTChildGenesisOpReturn
   * @apiGroup SLP NFT1
   * @apiDescription Generate the OP_RETURN value needed to create an SLP
   * NFT Child token.
   * It's assumed all elements in the tokenUtxos array belong to the same token.
   *
   * Returns a Buffer representing a transaction output, ready to be added to
   * the Transaction Builder.
   *
   * @apiExample Example usage:
   *
   *   const configObj = {
   *     name: "NFT Child",
   *     ticker: "NFTC",
   *     documentUrl: "https://FullStack.cash",
   *   }
   *
   *   const result = await bchjs.SLP.NFT1.generateNFTChildGenesisOpReturn(
   *     configObj
   *   )
   *
   *  ...
   *  // Add OP_RETURN as first output.
   *  transactionBuilder.addOutput(slpData, 0);
   *
   *  // See additional code here:
   *  // https://github.com/Permissionless-Software-Foundation/bch-js-examples/tree/master/applications/slp/nft
   *
   */
  generateNFTChildGenesisOpReturn (configObj) {
    try {
      // TODO: Add input validation.

      // Prevent error if user fails to add the document hash.
      if (!configObj.documentHash) configObj.documentHash = ''

      // If mint baton is not specified, then replace it with null.
      if (!configObj.mintBatonVout) configObj.mintBatonVout = null

      const script = slpMdm.NFT1.Child.genesis(
        configObj.ticker,
        configObj.name,
        configObj.documentUrl,
        configObj.documentHash,
        0,
        configObj.mintBatonVout,
        new slpMdm.BN('1')
      )

      return script
    } catch (err) {
      console.log('Error in generateNFTChildGenesisOpReturn()')
      throw err
    }
  }

  /**
   * @api SLP.NFT1.generateNFTChildSendOpReturn() generateNFTChildSendOpReturn()
   * @apiName generateNFTChildSendOpReturn
   * @apiGroup SLP NFT1
   * @apiDescription Generate the OP_RETURN value needed to send an SLP NFT
   * Child token to another address.
   * It's assumed all elements in the tokenUtxos array belong to the same token.
   *
   * Returns a Buffer representing a transaction output, ready to be added to
   * the Transaction Builder.
   *
   * @apiExample Example usage:
   *
   *  const addr = "bitcoincash:qq6xz6wwcy78uh79vgjvfyahj4arq269w5an8pcjak"
   *  const utxos = await bchjs.Blockbook.utxos(addr)
   *
   *  // Identify the SLP token UTXOs.
   *  let tokenUtxos = await bchjs.SLP.Utils.tokenUtxoDetails(utxos);
   *
   *  // Filter out the token UTXOs that match the user-provided token ID.
   *  tokenUtxos = tokenUtxos.filter((utxo, index) => {
   *    if (
   *      utxo && // UTXO is associated with a token.
   *      utxo.tokenId === TOKENID && // UTXO matches the token ID.
   *      utxo.tokenType === "token" && // UTXO is not a minting baton.
   *      utxo.tokenType === 65 // UTXO is for an NFT Child
   *    )
   *    return true;
   *  });
   *
   *  // Generate the SEND OP_RETURN
   *  const slpData = bchjs.SLP.NFT1.generateNFTChildSendOpReturn(
   *    tokenUtxos,
   *    TOKENQTY
   *  );
   *
   *  ...
   *  // Add OP_RETURN as first output.
   *  transactionBuilder.addOutput(slpData, 0);
   *
   *  // See additional code here:
   *  // https://github.com/Permissionless-Software-Foundation/bch-js-examples/tree/master/applications/slp/nft
   */
  generateNFTChildSendOpReturn (tokenUtxos, sendQty) {
    try {
      // TODO: Add input validation.

      const tokenId = tokenUtxos[0].tokenId

      // Calculate the total amount of tokens owned by the wallet.
      let totalTokens = 0
      for (let i = 0; i < tokenUtxos.length; i++) {
        totalTokens += tokenUtxos[i].tokenQty
      }

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
      console.log('Error in generateNFTChildSendOpReturn()')
      throw err
    }
  }

  /**
   * @api SLP.NFT1.generateNFTGroupSendOpReturn() generateNFTGroupSendOpReturn()
   * @apiName generateNFTGroupSendOpReturn
   * @apiGroup SLP NFT1
   * @apiDescription Generate the OP_RETURN value needed to send an SLP NFT
   * Group token to another address.
   * It's assumed all elements in the tokenUtxos array belong to the same token.
   *
   * Returns a Buffer representing a transaction output, ready to be added to
   * the Transaction Builder.
   *
   * @apiExample Example usage:
   *
   *  const addr = "bitcoincash:qq6xz6wwcy78uh79vgjvfyahj4arq269w5an8pcjak"
   *  const utxos = await bchjs.Blockbook.utxos(addr)
   *
   *  // Identify the SLP token UTXOs.
   *  let tokenUtxos = await bchjs.SLP.Utils.tokenUtxoDetails(utxos);
   *
   *  // Filter out the token UTXOs that match the user-provided token ID.
   *  tokenUtxos = tokenUtxos.filter((utxo, index) => {
   *    if (
   *      utxo && // UTXO is associated with a token.
   *      utxo.tokenId === TOKENID && // UTXO matches the token ID.
   *      utxo.tokenType === "token" && // UTXO is not a minting baton.
   *      utxo.tokenType === 129 // UTXO is for an NFT Group
   *    )
   *    return true;
   *  });
   *
   *  // Generate the SEND OP_RETURN
   *  const slpData = bchjs.SLP.NFT1.generateNFTGroupSendOpReturn(
   *    tokenUtxos,
   *    TOKENQTY
   *  );
   *
   *  ...
   *  // Add OP_RETURN as first output.
   *  transactionBuilder.addOutput(slpData, 0);
   *
   *  // See additional code here:
   *  // https://github.com/Permissionless-Software-Foundation/bch-js-examples/tree/master/applications/slp/nft
   */
  generateNFTGroupSendOpReturn (tokenUtxos, sendQty) {
    try {
      // TODO: Add input validation.

      const tokenId = tokenUtxos[0].tokenId

      // Calculate the total amount of tokens owned by the wallet.
      let totalTokens = 0
      for (let i = 0; i < tokenUtxos.length; i++) {
        totalTokens += tokenUtxos[i].tokenQty
      }

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
      console.log('Error in generateNFTGroupSendOpReturn()')
      throw err
    }
  }
}

module.exports = TokenType1
