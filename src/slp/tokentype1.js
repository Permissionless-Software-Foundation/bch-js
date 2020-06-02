//const BCHJS = require("../bch-js")
//const bchjs = new BCHJS()

const Address = require("./address")
const Script = require("../script")

const BigNumber = require("bignumber.js")
const slpMdm = require("slp-mdm")

// const addy = new Address()
let addy
const TransactionBuilder = require("../transaction-builder")

class TokenType1 {
  constructor(config) {
    this.restURL = config.restURL

    this.Script = new Script()

    addy = new Address(config)

    // Instantiate the transaction builder.
    TransactionBuilder.setAddress(addy)
  }

  /**
   * @api SLP.TokenType1.generateSendOpReturn() generateSendOpReturn() - OP_RETURN code for SLP Send tx
   * @apiName generateSendOpReturn
   * @apiGroup SLP
   * @apiDescription Generate the OP_RETURN value needed to create an SLP Send transaction.
   * It's assumed all elements in the tokenUtxos array belong to the same token.
   * Returns an object with two properties:
   *  - script: an array of Bufers that is ready to fed into bchjs.Script.encode() to be turned into a transaction output.
   *  - outputs: an integer with a value of 1 or 2. If 2, indicates there needs to be an extra output to send token change.
   *
   * @apiExample Example usage:
   *
   * (async () => {
   * try {
   *  const addr = "bitcoincash:qq6xz6wwcy78uh79vgjvfyahj4arq269w5an8pcjak"
   *  const utxos = await bchjs.Blockbook.utxos(addr)
   *
   *  // Identify the SLP token UTXOs.
   *  let tokenUtxos = await bchjs.SLP.Utils.tokenUtxoDetails2(utxos);
   *
   *  // Filter out the token UTXOs that match the user-provided token ID.
   *  tokenUtxos = tokenUtxos.filter((utxo, index) => {
   *    if (
   *      utxo && // UTXO is associated with a token.
   *      utxo.tokenId === TOKENID && // UTXO matches the token ID.
   *      utxo.tokenType === "token" // UTXO is not a minting baton.
   *    )
   *    return true;
   *  });
   *
   *  // Generate the SEND OP_RETURN
   *  const slpSendObj = bchjs.SLP.TokenType1.generateSendOpReturn(
   *    tokenUtxos,
   *    TOKENQTY
   *  );
   *  const slpData = slpSendObj.script;
   *
   *  ...
   *  // Add OP_RETURN as first output.
   *  transactionBuilder.addOutput(slpData, 0);
   *
   *  // See additional code here:
   *  // https://github.com/Permissionless-Software-Foundation/bch-js-examples/blob/master/applications/slp/send-token/send-token.js
   */
  generateSendOpReturn(tokenUtxos, sendQty) {
    try {
      const tokenId = tokenUtxos[0].tokenId
      const decimals = tokenUtxos[0].decimals

      // Calculate the total amount of tokens owned by the wallet.
      let totalTokens = 0
      for (let i = 0; i < tokenUtxos.length; i++)
        totalTokens += tokenUtxos[i].tokenQty

      const change = totalTokens - sendQty
      // console.log(`change: ${change}`)

      let script
      let outputs = 1

      // The normal case, when there is token change to return to sender.
      if (change > 0) {
        outputs = 2

        // Convert the send quantity to the format expected by slp-mdm.
        let baseQty = new BigNumber(sendQty).times(10 ** decimals)
        baseQty = baseQty.absoluteValue()
        baseQty = Math.floor(baseQty)
        baseQty = baseQty.toString()
        // console.log(`baseQty: `, baseQty)

        // Convert the change quantity to the format expected by slp-mdm.
        let baseChange = new BigNumber(change).times(10 ** decimals)
        baseChange = baseChange.absoluteValue()
        baseChange = Math.floor(baseChange)
        baseChange = baseChange.toString()
        // console.log(`baseChange: `, baseChange)

        // Generate the OP_RETURN as a Buffer.
        script = slpMdm.TokenType1.send(tokenId, [
          new slpMdm.BN(baseQty),
          new slpMdm.BN(baseChange)
        ])
        //

        // Corner case, when there is no token change to send back.
      } else {
        let baseQty = new BigNumber(sendQty).times(10 ** decimals)
        baseQty = baseQty.absoluteValue()
        baseQty = Math.floor(baseQty)
        baseQty = baseQty.toString()
        // console.log(`baseQty: `, baseQty)

        // console.log(`baseQty: ${baseQty.toString()}`)

        // Generate the OP_RETURN as a Buffer.
        script = slpMdm.TokenType1.send(tokenId, [new slpMdm.BN(baseQty)])
      }

      return { script, outputs }
    } catch (err) {
      console.log(`Error in generateSendOpReturn()`)
      throw err
    }
  }

  /**
   * @api SLP.TokenType1.generateBurnOpReturn() generateBurnOpReturn() - OP_RETURN code for SLP Send tx
   * @apiName generateBurnOpReturn
   * @apiGroup SLP
   * @apiDescription Generate the OP_RETURN value needed to create an SLP Send transaction that burns tokens.
   * This is a slight variation of generateSendOpReturn(). It generates an SLP
   * SEND transaction designed to burn a select quantity of tokens.
   *
   * It's assumed all elements in the tokenUtxos array belong to the same token.
   * Returns an object with two properties:
   *  - script: an array of Bufers that is ready to fed into bchjs.Script.encode() to be turned into a transaction output.
   *  - outputs: an integer with a value of 1. There is no token change to be sent with this transaction.
   */
  generateBurnOpReturn(tokenUtxos, burnQty) {
    try {
      const tokenId = tokenUtxos[0].tokenId
      const decimals = tokenUtxos[0].decimals

      // Calculate the total amount of tokens owned by the wallet.
      let totalTokens = 0
      for (let i = 0; i < tokenUtxos.length; i++)
        totalTokens += tokenUtxos[i].tokenQty

      const remainder = totalTokens - burnQty

      let baseQty = new BigNumber(remainder).times(10 ** decimals)
      baseQty = baseQty.absoluteValue()
      baseQty = Math.floor(baseQty)
      baseQty = baseQty.toString()

      // console.log(`baseQty: ${baseQty.toString()}`)

      // Generate the OP_RETURN as a Buffer.
      const script = slpMdm.TokenType1.send(tokenId, [new slpMdm.BN(baseQty)])

      return script
    } catch (err) {
      console.log(`Error in generateBurnOpReturn()`)
      throw err
    }
  }

  /**
   * @api SLP.TokenType1.generateGenesisOpReturn() generateGenesisOpReturn() - OP_RETURN code for SLP Genesis tx
   * @apiName generateGenesisOpReturn
   * @apiGroup SLP
   * @apiDescription Generate the OP_RETURN value needed to create a new SLP token class.
   * It's assumed all elements in the tokenUtxos array belong to the same token.
   * Returns an array of Buffers that is ready to be fed into bchjs.Script.encode() to be
   * turned into a transaction output.
   * Expects a config object as input, with the following properties:
   * configObj = {
   *    decimals: (integer) decimal precision of the token. Value of 8 recommended.
   *    initialQty: (integer) initial quantity of tokens to create.
   *    ticker: (string) ticker symbol for the new token class.
   *    name: (string) name of the token.
   *    documentUrl: (string) a website url that you'd like to attach to the token.
   *    documentHash: (string) optional.
   * }
   *
   */
  generateGenesisOpReturn(configObj) {
    try {
      // TODO: Add input validation.

      let baseQty = new BigNumber(configObj.initialQty).times(
        10 ** configObj.decimals
      )
      baseQty = baseQty.absoluteValue()
      baseQty = Math.floor(baseQty)
      baseQty = baseQty.toString()

      // Prevent error if user fails to add the document hash.
      if (!configObj.documentHash) configObj.documentHash = ""

      // If mint baton is not specified, then replace it with null.
      if (!configObj.mintBatonVout) configObj.mintBatonVout = null

      const script = slpMdm.TokenType1.genesis(
        configObj.ticker,
        configObj.name,
        configObj.documentUrl,
        configObj.documentHash,
        configObj.decimals,
        configObj.mintBatonVout,
        new slpMdm.BN(baseQty)
      )

      return script
    } catch (err) {
      console.log(`Error in generateGenesisOpReturn()`)
      throw err
    }
  }

  // Expects tokenUtxos to be an array of UTXOs. Must contain a UTXO with the
  // minting baton.
  // mintQty is the number of new coins to mint.
  // destroyBaton is an option Boolean. If true, will destroy the baton. By
  // default it is false and will pass the baton.
  generateMintOpReturn(tokenUtxos, mintQty, destroyBaton = false) {
    try {
      // TODO: Add input validation.

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
      const decimals = mintBatonUtxo.decimals

      let baseQty = new BigNumber(mintQty).times(10 ** decimals)
      baseQty = baseQty.absoluteValue()
      baseQty = Math.floor(baseQty)
      baseQty = baseQty.toString()

      // Signal that the baton should be passed or detroyed.
      let batonVout = 2
      if (destroyBaton) batonVout = null

      const script = slpMdm.TokenType1.mint(
        tokenId,
        batonVout,
        new slpMdm.BN(baseQty)
      )

      return script
    } catch (err) {
      console.log(`Error in generateMintOpReturn()`)
      throw err
    }
  }
}

module.exports = TokenType1
