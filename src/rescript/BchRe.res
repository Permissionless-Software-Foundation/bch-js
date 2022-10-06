let defaultRestApi = "https://api.fullstack.cash/v5/"
type libConfiguration = {
  restURL: string,
  apiToken: string,
  authToken: string,
}
@val @scope(("process", "env")) external envRestURL: option<string> = "RESTURL"
@val @scope(("process", "env")) external envApiToken: string = "BCHJSTOKEN"
@val @scope(("process", "env")) external envAuthPass: string = "BCHJSAUTHPASS"

type extModules =
  | BitcoinCash
  | Crypto
  | Util
  | Blockchain
  | Control
  | Generating
  | Mining
  | RawTransactions
  | Menmonic
  | Address
  | HDNode
  | TransactionBuilder
  | ECPair
  | Script
  | Price
  | Schnorr
  | SLP
  | Encryption
  | Utxo
  | Transaction
  | DSProof
  | Ecash
  | Electrumx
  | PsfSlpIndexer

external require: string => extModules = "require"
@new external newElectrumxModule: libConfiguration => extModules = "electrumx"
@new external newControlModule: libConfiguration => extModules = "control"
@new external newMiningModule: libConfiguration => extModules = "mining"
@new external newRawTransactionsModule: libConfiguration => extModules = "rawTransactions"
// @new external newAddressModule: libConfiguration => extModules = "address"
// @new external newBitcoinCashModule: libConfiguration => extModules = "bitcoinCash"
@new external newBlockchainModule: libConfiguration => extModules = "blockchain"
@new external newCryptoModule: unit => extModules = "crypto"
// @new external newECPairModule: unit => extModules = "ECPair"
@new external newEncryptionModule: libConfiguration => extModules = "encryption"
@new external newGeneratingModule: libConfiguration => extModules = "generating"
// @new external newHDNodeModule: extModules => extModules = "HDNode"
// @new external newMnemonicModule: libConfiguration => extModules = "Mnemonic"
@new external newPriceModule: libConfiguration => extModules = "price"
@new external newScriptModule: libConfiguration => extModules = "script"
// @new external newTransactionBuilderModule: libConfiguration => extModules = "TransactionBuilder"
@new external newUtilModule: libConfiguration => extModules = "util"
@new external newSchnorrModule: libConfiguration => extModules = "schnorr"
@new external newSLPModule: libConfiguration => extModules = "slp"
@new external newUtxoModule: libConfiguration => extModules = "utxo"
@new external newTransactionModule: libConfiguration => extModules = "transaction"
@new external newDSProofModule: libConfiguration => extModules = "dsProof"
@new external newECashModule: libConfiguration => extModules = "eCash"
@new external newPsfSlpIndexerModule: libConfiguration => extModules = "psfSlpIndexer"

let bitcoinCash = require("../bitcoincash")
let crypto = require("../crypto")
let util = require("../util")
let blockchain = require("../blockchain")
let control = require("../control")
let generating = require("../generating")
let mining = require("../mining")
let rawTransactions = require("../raw-transactions")
let mnemonic = require("../mnemonic")
let address = require("../address")
let hdNode = require("../hdnode")
let transactionBuilder = require("../transaction-builder")
let ecPair = require("../ecpair")
let script = require("../script")
let price = require("../price")
let schnorr = require("../schnorr")
let slp = require("../slp/slp")
let encryption = require("../encryption")
let utxo = require("../utxo")
let transaction = require("../transaction")
let dsProof = require("../dsproof")
let eCash = require("../ecash")
let electrumx = require("../electrumx")
let psfSlpIndexer = require("../psf-slp-indexer")

type restURL = string
type apiToken
type authPass
type authToken
type environment = {@as("RESTURL") restURL: restURL}
type process = {env: environment}
type configurationObject = {
  restURL: option<restURL>,
  apiToken: option<apiToken>,
  authPass: option<authPass>,
  authToken: option<authToken>,
}
type configuration = option<configurationObject>

module Address = {
  type t
  @new external newAddressModule: libConfiguration => t = "address"
}
module ECPair = {
  type t
  @send
  external setAddress: (extModules, Address.t) => t = "setAddress"
  @new external newECPairModule: unit => t = "ecPair"
}
module HDNode = {
  type t
  @new external newHDNodeModule: Address.t => t = "hdNode"
}
module Mnemonic = {
  type mnemonic
  @new external newMnemonicModule: Address.t => mnemonic = "mnemonic"
}
module TransactionBuilder = {
  type transactionBuilder
  @new external setAddress: Address.t => transactionBuilder = "transactionBuilder"
}
module BitcoinCash = {
  type bitcoinCash
@new external newBitcoinCashModule: Address.t => bitcoinCash = "bitcoinCash"
}

module BCHJS = {
  type t = {@as("Address") address: Address.t,
            @as("BitcoinCash") bitcoinCash :BitcoinCash.bitcoinCash,
            @as("Script") script: extModules,
            @as("Crypto") crypto: extModules,
            @as("Util") util: extModules,
            @as("Blockchain") blockchain: extModules,
            @as("Control") control: extModules,
            @as("Generating") generating: extModules,
            @as("Mining") mining: extModules,
            @as("RawTransacations") rawTransactions: extModules,
            @as("Mnemonic") mnemonic: Mnemonic.mnemonic,
            @as("HDNode") hdNode: HDNode.t,
            @as("TransactionBuilder") transactionBuilder: TransactionBuilder.transactionBuilder,
            @as("ECPair") ecPair: ECPair.t,
            @as("Price") price: extModules,
            @as("Schnorr") schnorr: extModules,
            @as("SLP") slp:extModules,
            @as("Encryption") encryption: extModules,
            @as("Utxo") utxo: extModules,
            @as("Transaction") transaction: extModules,
            @as("DSProof") dsProof: extModules,
            @as("Ecash") eCash: extModules,
            @as("Electrumx") electrumx: extModules,
            @as("PsfSlpIndexer") psfSlpIndexer: extModules}

  let make = config => {
    let restURL = switch config {
    | Some(url) => url
    | None =>
      switch envRestURL {
      | Some(url) => url
      | None => defaultRestApi
      }
    }
    let apiToken = switch config {
    | Some(token) => token
    | None => envApiToken
    }
    let authPass = switch config {
    | Some(pass) => pass
    | None => envAuthPass
    }
    let combined = `fullstackcash:${authPass}`
    open NodeJs
    let base64Credential =
      Buffer.fromString(combined)->Buffer.toStringWithEncoding(StringEncoding.base64)
    let authToken = `Basic ${base64Credential}`
    let libConfig = {
      restURL,
      apiToken,
      authToken,
    }

    let electrumx = newElectrumxModule(libConfig)
    // Js.log(electrumx)
    let control = newControlModule(libConfig)
    let mining = newMiningModule(libConfig)
    let rawTransactions = newRawTransactionsModule(libConfig)
    let address = Address.newAddressModule(libConfig)
    // Js.log2("Address module is: ", address)
    let blockchain = newBlockchainModule(libConfig)
    // let crypto = newCryptoModule()
    Js.log2("Crypto module is: ", crypto)
    // let ecPair = ECPair.newECPairModule()
    let encryption = newEncryptionModule(libConfig)
    let generating = newGeneratingModule(libConfig)
    //let hdNode = newHDNodeModule(address)
    // let mnemonic = newMnemonicModule(libConfig)
    let price = newPriceModule(libConfig)
    let script = newScriptModule(libConfig)
    // Js.log2("Script module is: ", script)
    let util = newUtilModule(libConfig)
    let schnorr = newSchnorrModule(libConfig)
    let slp = newSLPModule(libConfig)
    let utxo = newUtxoModule(libConfig)
    let transaction = newTransactionModule(libConfig)
    let dsProof = newDSProofModule(libConfig)
    let ecash = newECashModule(libConfig)
    let psfSlpIndexer = newPsfSlpIndexerModule(libConfig)
    // Js.log2("Crypto module is: ", crypto)
    let ecPair = ecPair->ECPair.setAddress(address)
    let hdNode = HDNode.newHDNodeModule(address)
    let mnemonic = Mnemonic.newMnemonicModule(address)
    let transactionBuilder = TransactionBuilder.setAddress(address)
    let bitcoinCash = BitcoinCash.newBitcoinCashModule(address)
    {
      address: address,
      bitcoinCash: bitcoinCash,
      script: script,
      crypto: crypto,
      util: util,
      blockchain: blockchain,
      control: control,
      generating: generating,
      mining: mining,
      rawTransactions: rawTransactions,
      mnemonic: mnemonic,
      hdNode: hdNode,
      transactionBuilder: transactionBuilder,
      ecPair: ecPair,
      price: price,
      schnorr: schnorr,
      slp: slp,
      encryption: encryption,
      utxo: utxo,
      transaction: transaction,
      dsProof: dsProof,
      eCash: eCash,
      electrumx: electrumx,
      psfSlpIndexer: psfSlpIndexer
    }
  }
}
