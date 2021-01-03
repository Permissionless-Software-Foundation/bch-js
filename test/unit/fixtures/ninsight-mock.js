/*
  Mocking data for unit tests for the Ninsight library.
*/

const utxo = {
  utxos: [
    {
      txid: '2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7',
      vout: 0,
      amount: 0.00001,
      satoshis: 1000,
      height: 602405,
      confirmations: 36459
    }
  ],
  legacyAddress: '15NCRBJsHaJy8As5bX1oh2YauRejnZ1MKF',
  cashAddress: 'bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9',
  slpAddress: 'simpleledger:qqh793x9au6ehvh7r2zflzguanlme760wuwzunhjfm',
  scriptPubKey: '76a9142fe2c4c5ef359bb2fe1a849f891cecffbcfb4f7788ac',
  asm:
    'OP_DUP OP_HASH160 2fe2c4c5ef359bb2fe1a849f891cecffbcfb4f77 OP_EQUALVERIFY OP_CHECKSIG'
}

const unconfirmed = {
  utxos: [
    {
      txid: '3904ffe6f8fba4ceda5e887130f60fcb18bdc7dcee10392a57f89475c5c108f1',
      vout: 0,
      amount: 0.03608203,
      satoshis: 3608203,
      confirmations: 0,
      ts: 1559670801
    }
  ],
  legacyAddress: '1AyWs8U4HUnTLmxxFiGoJbsXauRsvBrcKW',
  cashAddress: 'bitcoincash:qpkkjkhe29mqhqmu3evtq3dsnruuzl3rku6usknlh5',
  slpAddress: 'simpleledger:qpkkjkhe29mqhqmu3evtq3dsnruuzl3rkuk8mdxlf2',
  scriptPubKey: '76a9146d695af951760b837c8e58b045b098f9c17e23b788ac'
}

const utxoPost = [utxo, utxo]
const unconfirmedPost = [unconfirmed, unconfirmed]

const transactions = {
  pagesTotal: 1,
  txs: [
    {
      txid: 'ec7bc8349386e3e1939bbdc4f8092fdbdd6a380734e68486b558cd594c451d5b',
      version: 2,
      locktime: 0,
      vin: [
        {
          txid:
            '4f1fc57c33659628938db740449bf92fb75799e1d5750a4aeef80eb52d6df1e0',
          vout: 0,
          sequence: 4294967295,
          n: 0,
          scriptSig: {
            hex:
              '483045022100a3662a19ae384a1ceddea57765e425e61b04823e976d574da3911ac6b55d7f9b02200e571d985bce987675a2d58587a346fa40c39f4df13dc88548a92c52d5b24422412103f953f7630acc15bd3f5078c698f3af777286ae955b57e4857c158f75d87adb5f',
            asm:
              '3045022100a3662a19ae384a1ceddea57765e425e61b04823e976d574da3911ac6b55d7f9b02200e571d985bce987675a2d58587a346fa40c39f4df13dc88548a92c52d5b24422[ALL|FORKID] 03f953f7630acc15bd3f5078c698f3af777286ae955b57e4857c158f75d87adb5f'
          },
          addr: '17HPz8RQ4XM6mjre6aspvqyj1j648CZidM',
          valueSat: 1111,
          value: 0.00001111,
          doubleSpentTxID: null
        },
        {
          txid:
            '126d62c299e7e14c66fe0b485d13082c23641f003690462046bc24ad2d1180c1',
          vout: 0,
          sequence: 4294967295,
          n: 1,
          scriptSig: {
            hex:
              '47304402203e3f923207111ff9bbd2fb5ab1a49a9145ad809ee0cad0e0ddaed64bfe38dc16022012ee288fb413bd500c63f8bb95e46b6b57d34762decd46b7188478a1c398eeda412103f953f7630acc15bd3f5078c698f3af777286ae955b57e4857c158f75d87adb5f',
            asm:
              '304402203e3f923207111ff9bbd2fb5ab1a49a9145ad809ee0cad0e0ddaed64bfe38dc16022012ee288fb413bd500c63f8bb95e46b6b57d34762decd46b7188478a1c398eeda[ALL|FORKID] 03f953f7630acc15bd3f5078c698f3af777286ae955b57e4857c158f75d87adb5f'
          },
          addr: '17HPz8RQ4XM6mjre6aspvqyj1j648CZidM',
          valueSat: 1000,
          value: 0.00001,
          doubleSpentTxID: null
        }
      ],
      vout: [
        {
          value: '0.00001736',
          n: 0,
          scriptPubKey: {
            hex: '76a914d96ac75ca8df9729d278da50ccd7355c5785444e88ac',
            asm:
              'OP_DUP OP_HASH160 d96ac75ca8df9729d278da50ccd7355c5785444e OP_EQUALVERIFY OP_CHECKSIG',
            addresses: ['1LpbYkEM5cryfhs58tH8c93p4SGzit7UrP'],
            type: 'pubkeyhash'
          },
          spentTxId: null,
          spentIndex: null,
          spentHeight: null
        }
      ],
      blockheight: -1,
      confirmations: 0,
      time: 1559673337,
      valueOut: 0.00001736,
      size: 339,
      valueIn: 0.00002111,
      fees: 0.00000375
    }
  ],
  legacyAddress: '1LpbYkEM5cryfhs58tH8c93p4SGzit7UrP',
  cashAddress: 'bitcoincash:qrvk436u4r0ew2wj0rd9pnxhx4w90p2yfc29ta0d2n',
  currentPage: 0
}

const transactionsPost = [transactions, transactions]

const details = {
  txid: 'fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33',
  version: 1,
  locktime: 0,
  vin: [
    {
      coinbase: '04ffff001d02fd04',
      sequence: 4294967295,
      n: 0
    }
  ],
  vout: [
    {
      value: '50.00000000',
      n: 0,
      scriptPubKey: {
        hex:
          '4104f5eeb2b10c944c6b9fbcfff94c35bdeecd93df977882babc7f3a2cf7f5c81d3b09a68db7f0e04f21de5d4230e75e6dbe7ad16eefe0d4325a62067dc6f369446aac',
        asm:
          '04f5eeb2b10c944c6b9fbcfff94c35bdeecd93df977882babc7f3a2cf7f5c81d3b09a68db7f0e04f21de5d4230e75e6dbe7ad16eefe0d4325a62067dc6f369446a OP_CHECKSIG',
        addresses: ['1BW18n7MfpU35q4MTBSk8pse3XzQF8XvzT'],
        type: 'pubkeyhash',
        cashAddrs: ['bitcoincash:qpej6mkrwca4tvy2snq4crhrf88v4ljspysx0ueetk']
      },
      spentTxId: null,
      spentIndex: null,
      spentHeight: null
    }
  ],
  blockhash:
    '00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09',
  blockheight: 1000,
  confirmations: 585610,
  time: 1232346882,
  blocktime: 1232346882,
  isCoinBase: true,
  valueOut: 50,
  size: 135
}

const detailsPost = [details, details]

module.exports = {
  utxo,
  utxoPost,
  unconfirmed,
  unconfirmedPost,
  transactions,
  transactionsPost,
  details,
  detailsPost
}
