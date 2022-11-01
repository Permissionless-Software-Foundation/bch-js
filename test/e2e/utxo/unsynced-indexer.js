/*
  This test is used to interrogate the behavior of bch-js when a psf-slp-indexer
  panicks and starts indexing from SLP genesis. In this corner-case, bch-js
  should detect the indexer is out of sync, and protect any token UTXOs by
  moving any UTXO under 600 sats into the null array.

  TO RUN THIS TEST:
  - Reset a local instance of psf-slp-indexer to sync from genesis.
  - Start a local copy of bch-api
*/

const BCHJS = require('../../../src/bch-js.js')
const bchjs = new BCHJS({
  restURL: 'http://localhost:3000/v5/'
})

async function startTest () {
  try {
    const addr = 'bitcoincash:qzkvas58zag9tjry693mflkjze2m20ps7vx7uw7z9d'

    const result = await bchjs.Utxo.get(addr)
    console.log(`result: ${JSON.stringify(result, null, 2)}`)
  } catch (err) {
    console.error('Error in startTest(): ', err)
  }
}
startTest()
