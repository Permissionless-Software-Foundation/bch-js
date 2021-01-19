/*
  This is the primary library file for bch-js. This file combines all the other
  libraries in order to create the BCHJS class.

  The primary server used has switched to fullstack.cash. Go there to sign up
  for an account that gives you increased rate limits.
*/

// bch-api mainnet.
const DEFAULT_REST_API = 'https://api.fullstack.cash/v4/'
// const DEFAULT_REST_API = "http://localhost:3000/v4/"

// local deps
const BitcoinCash = require('./bitcoincash')
const Crypto = require('./crypto')
const Util = require('./util')
const Blockchain = require('./blockchain')
const Control = require('./control')
const Generating = require('./generating')
const Mining = require('./mining')
const RawTransactions = require('./raw-transactions')
const Mnemonic = require('./mnemonic')
const Address = require('./address')
const HDNode = require('./hdnode')
const TransactionBuilder = require('./transaction-builder')
const ECPair = require('./ecpair')
const Script = require('./script')
const Price = require('./price')
const Socket = require('./socket')
const Schnorr = require('./schnorr')
const SLP = require('./slp/slp')
const IPFS = require('./ipfs')
const Encryption = require('./encryption')

// Indexers
const Ninsight = require('./ninsight')
const Electrumx = require('./electrumx')

class BCHJS {
  constructor (config) {
    // Try to retrieve the REST API URL from different sources.
    if (config && config.restURL && config.restURL !== '') {
      this.restURL = config.restURL
    } else if (process.env.RESTURL && process.env.RESTURL !== '') {
      this.restURL = process.env.RESTURL
    } else this.restURL = DEFAULT_REST_API

    // Retrieve the apiToken
    this.apiToken = '' // default value.
    if (config && config.apiToken && config.apiToken !== '') {
      this.apiToken = config.apiToken
    } else if (process.env.BCHJSTOKEN && process.env.BCHJSTOKEN !== '') {
      this.apiToken = process.env.BCHJSTOKEN
    }

    // Retrieve the Basic Authentication password.
    this.authPass = '' // default value.
    if (config && config.authPass && config.authPass !== '') {
      this.authPass = config.authPass
    } else if (process.env.BCHJSAUTHPASS && process.env.BCHJSAUTHPASS !== '') {
      this.authPass = process.env.BCHJSAUTHPASS
    }

    // Generate a Basic Authentication token from an auth password
    this.authToken = ''
    if (this.authPass) {
      // console.log(`bch-js initialized with authPass: ${this.authPass}`)
      // Generate the header for Basic Authentication.
      const combined = `fullstackcash:${this.authPass}`
      const base64Credential = Buffer.from(combined).toString('base64')
      this.authToken = `Basic ${base64Credential}`
    }

    const libConfig = {
      restURL: this.restURL,
      apiToken: this.apiToken,
      authToken: this.authToken
    }

    // console.log(`apiToken: ${this.apiToken}`)

    // Bitcoin.com Ninsight indexer
    this.Ninsight = new Ninsight(config)

    // ElectrumX indexer
    this.Electrumx = new Electrumx(libConfig)

    // Populate Full Node
    this.Control = new Control(libConfig)
    this.Mining = new Mining(libConfig)
    this.RawTransactions = new RawTransactions(libConfig)

    // Populate utility functions
    this.Address = new Address(libConfig)
    this.BitcoinCash = new BitcoinCash(this.Address)
    this.Blockchain = new Blockchain(libConfig)
    this.Crypto = Crypto
    this.ECPair = ECPair
    this.ECPair.setAddress(this.Address)
    this.encryption = new Encryption(libConfig)
    this.Generating = new Generating(libConfig)
    this.HDNode = new HDNode(this.Address)
    this.Mnemonic = new Mnemonic(this.Address)
    this.Price = new Price(libConfig)
    this.Script = new Script()
    this.TransactionBuilder = TransactionBuilder
    this.TransactionBuilder.setAddress(this.Address)
    this.Util = new Util(libConfig)
    this.Socket = Socket
    this.Schnorr = new Schnorr(libConfig)

    this.SLP = new SLP(libConfig)
    this.SLP.HDNode = this.HDNode

    this.IPFS = new IPFS()
  }
}

module.exports = BCHJS
