/*
  This is the primary library file for bch-js. This file combines all the other
  libraries in order to create the BCHJS class.

  The primary server used has switched to fullstack.cash. Go there to sign up
  for an account that gives you increased rate limits.
*/

// bch-api mainnet.
// const DEFAULT_REST_API = "http://localhost:3000/v5/"

// local deps
import BitcoinCash from './bitcoincash.js'
import Crypto from './crypto.js'
import Util from './util.js'
import Blockchain from './blockchain.js'
import Control from './control.js'
import Generating from './generating.js'
import Mining from './mining.js'
import RawTransactions from './raw-transactions.js'
import Mnemonic from './mnemonic.js'
import Address from './address.js'
import HDNode from './hdnode.js'
import TransactionBuilder from './transaction-builder.js'
import ECPair from './ecpair.js'
import Script from './script.js'
import Price from './price.js'
import Schnorr from './schnorr.js'
import SLP from './slp/slp.js'
import Encryption from './encryption.js'
import Utxo from './utxo.js'
import Transaction from './transaction.js'
import DSProof from './dsproof.js'
import Ecash from './ecash.js'

// Indexers
import Electrumx from './electrumx.js'
import PsfSlpIndexer from './psf-slp-indexer.js'
const DEFAULT_REST_API = 'https://api.fullstack.cash/v5/'

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
    this.Schnorr = new Schnorr(libConfig)

    this.SLP = new SLP(libConfig)
    this.SLP.HDNode = this.HDNode

    this.Utxo = new Utxo(libConfig)
    this.Transaction = new Transaction(libConfig)

    this.DSProof = new DSProof(libConfig)
    this.eCash = new Ecash()

    this.PsfSlpIndexer = new PsfSlpIndexer(libConfig)
  }
}

export default BCHJS
