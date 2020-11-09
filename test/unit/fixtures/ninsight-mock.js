/*
  Mocking data for unit tests for the Ninsight library.
*/

const details = {
      'address': 'mkPvAKZ2rar6qeG3KjBtJHHMSP1wFZH7Er',
      'satoshis': 2782729129,
      'height': 534105,
      'confirmations': 123,
      'timestamp': 1441068774,
      'fees': 35436,
      'outputIndexes': [
        0
      ],
      'inputIndexes': [],
      'tx': {
        'hash': 'bb0ec3b96209fac9529570ea6f83a86af2cceedde4aaf2bfcc4796680d23f1c7',
        'version': 1,
        'inputs': [
          {
            'prevTxId': 'ea5e5bafbf29cdf6f6097ab344128477e67889d4d6203cb43594836daa6cc425',
            'outputIndex': 1,
            'sequenceNumber': 4294967294,
            'script': '483045022100f4d169783bef70e3943d2a617cce55d9fe4e33fc6f9880b8277265e2f619a97002201238648abcdf52960500664e969046d41755f7fc371971ebc78002fc418465a6012103acdcd31d51272403ce0829447e59e2ac9e08ed0bf92011cbf7420addf24534e6',
            'scriptString': '72 0x3045022100f4d169783bef70e3943d2a617cce55d9fe4e33fc6f9880b8277265e2f619a97002201238648abcdf52960500664e969046d41755f7fc371971ebc78002fc418465a601 33 0x03acdcd31d51272403ce0829447e59e2ac9e08ed0bf92011cbf7420addf24534e6',
            'output': {
              'satoshis': 2796764565,
              'script': '76a91488b1fe8aec5ae4358a11447a2f22b2781faedb9b88ac'
            }
          }
        ],
        'outputs': [
          {
            'satoshis': 2782729129,
            'script': '76a9143583efb5e64a4668c6c54bb5fcc30af4417b4f2d88ac'
          },
          {
            'satoshis': 14000000,
            'script': '76a9149713201957f42379e574d7c70d506ee49c2c8ad688ac'
          }
        ],
        'nLockTime': 534089
      }
    }

const utxo = {
  utxos: [
    {
      txid: "2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7",
      vout: 0,
      amount: 0.00001,
      satoshis: 1000,
      height: 602405,
      confirmations: 36459
    }
  ],
  legacyAddress: "15NCRBJsHaJy8As5bX1oh2YauRejnZ1MKF",
  cashAddress: "bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9",
  slpAddress: "simpleledger:qqh793x9au6ehvh7r2zflzguanlme760wuwzunhjfm",
  scriptPubKey: "76a9142fe2c4c5ef359bb2fe1a849f891cecffbcfb4f7788ac",
  asm:
    "OP_DUP OP_HASH160 2fe2c4c5ef359bb2fe1a849f891cecffbcfb4f77 OP_EQUALVERIFY OP_CHECKSIG"
}

const utxoPost = [utxo, utxo]
const detailsPost = [details, details]

module.exports = {
  details,
  detailsPost,
  utxo,
  utxoPost
}
