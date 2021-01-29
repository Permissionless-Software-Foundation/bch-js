/*
  Mocking data for the RawTransactions unit tests.
*/

const mockTx = {
  txid: '05f7d4a4e25f53d63a360434eb54f221abf159112b7fffc91da1072a079cded3',
  vin: [
    {
      txid: '8a6b3b70569270f0bdbf68fd12a410aef8f7bf044bc88ab02386a1572024b2bd',
      vout: 0,
      scriptSig: {
        asm:
          '3044022035c42f5b10d412445c5ecc5feea42c7f885c433669306c699da0f687216c61d5022018c81cd0ea68101cf3cbe0af67165fca1ce3d667be69d0c9329f0679bbee6ba0[ALL|FORKID] 030152eb20beaa692daaa1a27596dcc98cc06ccbc6eec23d6182a08c7bdaa29ea9',
        hex:
          '473044022035c42f5b10d412445c5ecc5feea42c7f885c433669306c699da0f687216c61d5022018c81cd0ea68101cf3cbe0af67165fca1ce3d667be69d0c9329f0679bbee6ba04121030152eb20beaa692daaa1a27596dcc98cc06ccbc6eec23d6182a08c7bdaa29ea9'
      },
      sequence: 4294967295
    }
  ]
}

const mockParentTx1 = {
  vout: [
    {
      value: 0.04199959,
      n: 0,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 d5258a73b5c8f94c939d7fe96f78ce97906083be OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a914d5258a73b5c8f94c939d7fe96f78ce97906083be88ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qr2jtznnkhy0jnynn4l7jmmce6teqcyrhc8herhlgt']
      }
    },
    {
      value: 1.66296161,
      n: 1,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 5e95c308c25c74c64c5ffe44a60a4d9b35743e90 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a9145e95c308c25c74c64c5ffe44a60a4d9b35743e9088ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qp0ftscgcfw8f3jvtllyffs2fkdn2ap7jqreakn4ye']
      }
    }
  ]
}

const mockGetInputAddrsOutput = [
  {
    vin: 0,
    address: 'bitcoincash:qr2jtznnkhy0jnynn4l7jmmce6teqcyrhc8herhlgt'
  }
]

module.exports = {
  mockTx,
  mockParentTx1,
  mockGetInputAddrsOutput
}
