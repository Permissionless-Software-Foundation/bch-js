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
@new external newElectrumxModule: libConfiguration => extModules = "Electrumx"
@new external newControlModule: libConfiguration => extModules = "Control"
@new external newMiningModule: libConfiguration => extModules = "Mining"
@new external newRawTransactionsModule: libConfiguration => extModules = "RawTransactions"
@new external newAddressModule: libConfiguration => extModules = "Address"
@new external newBitcoinCashModule: libConfiguration => extModules = "BitcoinCash"
@new external newBlockchainModule: libConfiguration => extModules = "Blockchain"
@new external newCryptoModule: unit => extModules = "Crypto"
@new external newECPairModule: unit => extModules = "ECPair"
@new external newEncryptionModule: libConfiguration => extModules = "Encryption"
@new external newGeneratingModule: libConfiguration => extModules = "Generating"
@new external newHDNodeModule: libConfiguration => extModules = "HDNode"
@new external newMnemonicModule: libConfiguration => extModules = "Mnemonic"
@new external newPriceModule: libConfiguration => extModules = "Price"
@new external newScriptModule: libConfiguration => extModules = "Script"
@new external newTransactionBuilderModule: libConfiguration => extModules = "TransactionBuilder"
@new external newUtilModule: libConfiguration => extModules = "Util"
@new external newSchnorrModule: libConfiguration => extModules = "Schnorr"
@new external newSLPModule: libConfiguration => extModules = "SLP"
@new external newUtxoModule: libConfiguration => extModules = "Utxo"
@new external newTransactionModule: libConfiguration => extModules = "Transaction"
@new external newDSProofModule: libConfiguration => extModules = "DSProof"
@new external newECashModule: libConfiguration => extModules = "Ecash"
@new external newPsfSlpIndexerModule: libConfiguration => extModules = "PsfSlpIndexer"

let bitcoincash = require("./bitcoincash")
let crypto = require("./crypto")
let until = require("./util")
let blockchain = require("./blockchain")
let control = require("./control")
let generating = require("./generating")
let mining = require("./mining")
let rawTransactions = require("./raw-transactions")
let mnemonic = require("./mnemonic")
let address = require("./address")
let hdNode = require("./hdnode")
let transactionBuilder = require("./transaction-builder")
let ecPair = require("./ecpair")
let script = require("./script")
let price = require("./price")
let schnorr = require("./schnorr")
let slp = require("./slp/slp")
let encryption = require("./encryption")
let utxo = require("./utxo")
let transaction = require("./transaction")
let dsProof = require("./dsproof")
let eCash = require("./ecash")
let electrumx = require("./electrumx")
let psfSlpIndexer = require("./psf-slp-indexer")

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
module BCHJS = {
  let constructor = config => {
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
    let control = newControlModule(libConfig)
    let mining = newMiningModule(libConfig)
    let rawTransactions = newRawTransactionsModule(libConfig)
    let address = newAddressModule(libConfig)
    let blockchain = newBlockchainModule(libConfig)
    let crypto = newCryptoModule()
    let ecPair = newECPairModule()
    let encryption = newEncryptionModule(libConfig)
    let generating = newGeneratingModule(libConfig)
    let hdNode = newHDNodeModule(libConfig)
    let mnemonic = newMnemonicModule(libConfig)
    let price = newPriceModule(libConfig)
    let script = newScriptModule(libConfig)
    let util = newUtilModule(libConfig)
    let schnorr = newSchnorrModule(libConfig)
    let slp = newSLPModule(libConfig)
    let utxo = newUtxoModule(libConfig)
    let transaction = newTransactionModule(libConfig)
    let dsProof = newDSProofModule(libConfig)
    let ecash = newECashModule(libConfig)
    let psfSlpIndexer = newPsfSlpIndexerModule(libConfig)
    Js.log2("Crypto module is: ", crypto)
  }
}
