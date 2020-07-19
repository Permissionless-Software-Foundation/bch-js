//const BCHJS = require("../bch-js")
//const bchjs = new BCHJS()

const Address = require("./address")
const Script = require("../script")

const BigNumber = require("bignumber.js")
const slpMdm = require("slp-mdm")
const axios = require("axios")

// const addy = new Address()
let addy
const TransactionBuilder = require("../transaction-builder")

let _this // local global

class TokenType1 {
  constructor(config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken

    addy = new Address(config)
    this.Script = new Script()

    this.axios = axios
    // Add JWT token to the authorization header.
    this.axiosOptions = {
      headers: {
        authorization: `Token ${this.apiToken}`
      }
    }

    // Instantiate the transaction builder.
    TransactionBuilder.setAddress(addy)

    _this = this
  }

  /**
   * @api SLP.TokenType1.generateSendOpReturn() generateSendOpReturn()
   * @apiName generateSendOpReturn
   * @apiGroup SLP TokenType1
   * @apiDescription Generate the OP_RETURN value needed to create an SLP Send transaction.
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
   *      utxo.tokenType === "token" // UTXO is not a minting baton.
   *    )
   *    return true;
   *  });
   *
   *  // Generate the SEND OP_RETURN
   *  const slpData = bchjs.SLP.TokenType1.generateSendOpReturn(
   *    tokenUtxos,
   *    TOKENQTY
   *  );
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
   * @api SLP.TokenType1.generateBurnOpReturn() generateBurnOpReturn()
   * @apiName generateBurnOpReturn
   * @apiGroup SLP TokenType1
   * @apiDescription Generate the OP_RETURN value needed to create a SLP Send
   * transaction that burns tokens.
   * This is a slight variation of generateSendOpReturn(). It generates a SLP
   * SEND transaction designed to burn a select quantity of tokens.
   *
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
   *      utxo.tokenType === "token" // UTXO is not a minting baton.
   *    )
   *    return true;
   *  });
   *
   *  // Generate the SEND OP_RETURN
   *  const slpData = bchjs.SLP.TokenType1.generateBurnOpReturn(
   *    tokenUtxos,
   *    10 // Burn 10 tokens
   *  );
   *
   *  ...
   *  // Add OP_RETURN as first output.
   *  transactionBuilder.addOutput(slpData, 0);
   *
   *  // See additional code here:
   *  // https://github.com/Permissionless-Software-Foundation/bch-js-examples/blob/master/applications/slp/burn-tokens/burn-tokens.js
   *
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
   * @api SLP.TokenType1.generateGenesisOpReturn() generateGenesisOpReturn()
   * @apiName generateGenesisOpReturn
   * @apiGroup SLP TokenType1
   * @apiDescription Generate the OP_RETURN value needed to create a new SLP token class.
   *
   * Expects a config object as input, see the example for properties.:
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
   *     documentHash: "",
   *     decimals: 8,
   *     initialQty: 10
   *   }
   *
   *   const result = await bchjs.SLP.TokenType1.generateGenesisOpReturn(
   *     configObj
   *   )
   *
   *  ...
   *  // Add OP_RETURN as first output.
   *  transactionBuilder.addOutput(slpData, 0);
   *
   *  // See additional code here:
   *  // https://github.com/Permissionless-Software-Foundation/bch-js-examples/blob/master/applications/slp/create-token/create-token.js
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
  /**
   * @api SLP.TokenType1.generateMintOpReturn() generateMintOpReturn()
   * @apiName generateMintOpReturn
   * @apiGroup SLP TokenType1
   * @apiDescription Generate the OP_RETURN value needed to create an SLP Mint transaction.
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
   *      utxo.utxoType === "minting-baton" // UTXO is not a minting baton.
   *    )
   *    return true;
   *  });
   *
   *  // Generate the SLP OP_RETURN
   *  const slpData = bchjs.SLP.TokenType1.generateMintOpReturn(
   *    tokenUtxos,
   *    100 // Mint 100 new tokens.
   *  );
   *
   *  ...
   *  // Add OP_RETURN as first output.
   *  transactionBuilder.addOutput(slpData, 0);
   *
   *  // See additional code here:
   *  // https://github.com/Permissionless-Software-Foundation/bch-js-examples/blob/master/applications/slp/mint-token/mint-token.js
   */
  generateMintOpReturn(tokenUtxos, mintQty, destroyBaton = false) {
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
      const decimals = mintBatonUtxo.decimals

      if (!tokenId)
        throw new Error(`tokenId property not found in mint-baton UTXO.`)
      if (!decimals)
        throw new Error(`decimals property not found in mint-baton UTXO.`)

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
      // console.log(`Error in generateMintOpReturn()`)
      throw err
    }
  }

  /**
   * @api SLP.TokenType1.getHexOpReturn() getHexOpReturn()
   * @apiName getHexOpReturn
   * @apiGroup SLP TokenType1
   * @apiDescription Get hex representation of an SLP OP_RETURN
   * This command returns a hex encoded OP_RETURN for SLP Send (Token Type 1)
   * transactions. Rather than computing it directly, it calls bch-api to do
   * the heavy lifting. This is easier and lighter weight for web apps.
   *
   * @apiExample Example usage:
   *
   *  const tokenUtxos = [{
   *   tokenId: "0a321bff9761f28e06a268b14711274bb77617410a16807bd0437ef234a072b1",
   *   decimals: 0,
   *   tokenQty: 2
   *  }]
   *
   *  const sendQty = 1.5
   *
   *  const result = await bchjs.SLP.TokenType1.getHexOpReturn(tokenUtxos, sendQty)
   *
   *  // result:
   *  {
   *    "script": "6a04534c500001010453454e44200a321bff9761f28e06a268b14711274bb77617410a16807bd0437ef234a072b1080000000000000001080000000000000000",
   *    "outputs": 2
   *  }
   */
  async getHexOpReturn(tokenUtxos, sendQty) {
    try {
      // TODO: Add input filtering.

      const data = {
        tokenUtxos,
        sendQty
      }

      const result = await _this.axios.post(
        `${this.restURL}slp/generatesendopreturn`,
        data,
        _this.axiosOptions
      )

      const slpSendObj = result.data

      // const script = _this.Buffer.from(slpSendObj.script)
      //
      // slpSendObj.script = script
      // return slpSendObj

      return slpSendObj
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

module.exports = TokenType1
