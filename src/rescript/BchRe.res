let default_rest_api = "https://api.fullstack.cash/v5/"

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
  | Scnorr
  | SLP
  | Encryption
  | Utxo
  | Transaction
  | DSProof
  | Ecash

external require: string => extModules = "require"

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
