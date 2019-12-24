//const BCHJS = require("../bch-js")
//const bchjs = new BCHJS()

const Address = require("./address")
const Script = require("../script")

const BigNumber = require("bignumber.js")
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

      let script
      let outputs = 1

      // The normal case, when there is token change to return to sender.
      if (change > 0) {
        outputs = 2

        let baseQty = new BigNumber(sendQty).times(10 ** decimals)
        baseQty = baseQty.absoluteValue()
        baseQty = Math.floor(baseQty)
        let baseQtyHex = baseQty.toString(16)
        baseQtyHex = baseQtyHex.padStart(16, "0")

        let baseChange = new BigNumber(change).times(10 ** decimals)
        baseChange = baseChange.absoluteValue()
        baseChange = Math.floor(baseChange)
        // console.log(`baseChange: ${baseChange.toString()}`)

        let baseChangeHex = baseChange.toString(16)
        baseChangeHex = baseChangeHex.padStart(16, "0")
        // console.log(`baseChangeHex padded: ${baseChangeHex}`)

        script = [
          this.Script.opcodes.OP_RETURN,
          Buffer.from("534c5000", "hex"),
          //BITBOX.Script.opcodes.OP_1,
          Buffer.from("01", "hex"),
          Buffer.from(`SEND`),
          Buffer.from(tokenId, "hex"),
          Buffer.from(baseQtyHex, "hex"),
          Buffer.from(baseChangeHex, "hex")
        ]
      } else {
        // Corner case, when there is no token change to send back.

        let baseQty = new BigNumber(sendQty).times(10 ** decimals)
        baseQty = baseQty.absoluteValue()
        baseQty = Math.floor(baseQty)
        let baseQtyHex = baseQty.toString(16)
        baseQtyHex = baseQtyHex.padStart(16, "0")

        // console.log(`baseQty: ${baseQty.toString()}`)

        script = [
          this.Script.opcodes.OP_RETURN,
          Buffer.from("534c5000", "hex"),
          //BITBOX.Script.opcodes.OP_1,
          Buffer.from("01", "hex"),
          Buffer.from(`SEND`),
          Buffer.from(tokenId, "hex"),
          Buffer.from(baseQtyHex, "hex")
        ]
      }

      return { script, outputs }
    } catch (err) {
      console.log(`Error in generateSendOpReturn()`)
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
   * }
   *
   * Note: document hash is currently not supported.
   */
  generateGenesisOpReturn(configObj) {
    try {
      // TODO: Add input validation.

      let decimals = configObj.decimals.toString(16)
      decimals = decimals.padStart(2, "0")

      let baseQty = new BigNumber(configObj.initialQty).times(
        10 ** configObj.decimals
      )
      baseQty = baseQty.absoluteValue()
      baseQty = Math.floor(baseQty)
      let baseQtyHex = baseQty.toString(16)
      baseQtyHex = baseQtyHex.padStart(16, "0")

      const script = [
        this.Script.opcodes.OP_RETURN,
        Buffer.from("534c5000", "hex"), // Lokad ID
        Buffer.from("01", "hex"), // Token Type 1
        Buffer.from(`GENESIS`),
        Buffer.from(configObj.ticker),
        Buffer.from(configObj.name),
        Buffer.from(configObj.documentUrl),

        // Create an empty document hash.
        this.Script.opcodes.OP_PUSHDATA1, // Hex 4c
        this.Script.opcodes.OP_0, // Hex 00

        Buffer.from(decimals, "hex"),
        Buffer.from("02", "hex"), // Mint baton vout
        Buffer.from(baseQtyHex, "hex")
      ]

      return script
    } catch (err) {
      console.log(`Error in generateGenesisOpReturn()`)
      throw err
    }
  }
}

module.exports = TokenType1
