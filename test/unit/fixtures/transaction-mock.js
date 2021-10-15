/*
  Mocking data used in the transaction-unit.js tests.
*/

const nonSlpTxDetails = {
  txid: '2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7',
  hash: '2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7',
  version: 2,
  size: 225,
  locktime: 0,
  vin: [
    {
      txid: '5f09d317e24c5d376f737a2711f3bd1d381abdb41743fff3819b4f76382e1eac',
      vout: 1,
      scriptSig: {
        asm:
          '3044022000dd11c41a472f2e54348db996e60864d489429f12d1e044d49ff600b880c9590220715a926404bb0e2731a3795afb341ec1dad3f84ead7d27cd31fcc59abb14738c[ALL|FORKID] 038476128287ac37c7a3cf7e8625fd5f024db1bc3d8e37395abe7bf42fda78d0d9',
        hex:
          '473044022000dd11c41a472f2e54348db996e60864d489429f12d1e044d49ff600b880c9590220715a926404bb0e2731a3795afb341ec1dad3f84ead7d27cd31fcc59abb14738c4121038476128287ac37c7a3cf7e8625fd5f024db1bc3d8e37395abe7bf42fda78d0d9'
      },
      sequence: 4294967295,
      address: 'bitcoincash:qqxy8hycqe89j7wa79gnggq6z3gaqu2uvqy26xehfe',
      value: 0.00047504
    }
  ],
  vout: [
    {
      value: 0.00001,
      n: 0,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 2fe2c4c5ef359bb2fe1a849f891cecffbcfb4f77 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a9142fe2c4c5ef359bb2fe1a849f891cecffbcfb4f7788ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9']
      }
    },
    {
      value: 0.00046256,
      n: 1,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 2dbf5e1804c39a497b908c876097d63210c84902 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a9142dbf5e1804c39a497b908c876097d63210c8490288ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qqkm7hscqnpe5jtmjzxgwcyh6ceppjzfqg3jdn422e']
      }
    }
  ],
  hex:
    '0200000001ac1e2e38764f9b81f3ff4317b4bd1a381dbdf311277a736f375d4ce217d3095f010000006a473044022000dd11c41a472f2e54348db996e60864d489429f12d1e044d49ff600b880c9590220715a926404bb0e2731a3795afb341ec1dad3f84ead7d27cd31fcc59abb14738c4121038476128287ac37c7a3cf7e8625fd5f024db1bc3d8e37395abe7bf42fda78d0d9ffffffff02e8030000000000001976a9142fe2c4c5ef359bb2fe1a849f891cecffbcfb4f7788acb0b40000000000001976a9142dbf5e1804c39a497b908c876097d63210c8490288ac00000000',
  blockhash: '0000000000000000010903a1fc4274499037c9339be9ec7338ee980331c20ce5',
  confirmations: 77741,
  time: 1569792892,
  blocktime: 1569792892
}

const slpTxDetails = {
  txid: '266844d53e46bbd7dd37134688dffea6e54d944edff27a0add63dd0908839bc1',
  hash: '266844d53e46bbd7dd37134688dffea6e54d944edff27a0add63dd0908839bc1',
  version: 2,
  size: 479,
  locktime: 0,
  vin: [
    {
      txid: 'abc685f1f2a95f51e5e05a350f3fb9c74676e9f78c835b2a019c888ac0a2a736',
      vout: 2,
      scriptSig: {
        asm:
          '3045022100e5f0f6f1212fcbb10eedb7fdc38fca6e86629b4e7e8356a3ad7371a109fc37a602204bfff37d1a34d2e2908b81c23677706fb59ff4ab639fa3299da6c303de74e1f7[ALL|FORKID] 0245b9b3586fab3cfd46db6d116c4588004fe7fe9798216ccb8e55a89bcebc07ac',
        hex:
          '483045022100e5f0f6f1212fcbb10eedb7fdc38fca6e86629b4e7e8356a3ad7371a109fc37a602204bfff37d1a34d2e2908b81c23677706fb59ff4ab639fa3299da6c303de74e1f741210245b9b3586fab3cfd46db6d116c4588004fe7fe9798216ccb8e55a89bcebc07ac'
      },
      sequence: 4294967295,
      address: 'bitcoincash:qzv7t2pzn2d0pklnetdjt65crh6fe8vnhuwvhsk2nn',
      value: 0.00000546
    },
    {
      txid: '58c8576404c01c23a224053307399483d3a070599b3e9eb6d45be9714b8d6856',
      vout: 1,
      scriptSig: {
        asm:
          '30430220784f6d81fa8f54db8a4948259e8c15972a0285f8b1640c433d4e9f606dc38f0c021f14eecc2e8af2efede0867ce459c400dde54186a0e64babdbe89f795db12753[ALL|FORKID] 0209ebe6d9da5043945ed1d81bec0fcace299eba05e5f46b72d6838c790d31c505',
        hex:
          '4630430220784f6d81fa8f54db8a4948259e8c15972a0285f8b1640c433d4e9f606dc38f0c021f14eecc2e8af2efede0867ce459c400dde54186a0e64babdbe89f795db1275341210209ebe6d9da5043945ed1d81bec0fcace299eba05e5f46b72d6838c790d31c505'
      },
      sequence: 4294967295,
      address: 'bitcoincash:qppzuxemgqyxf07nz3kan33gmc83mf3z3yz295c4s7',
      value: 0.68369626
    }
  ],
  vout: [
    {
      value: 0,
      n: 0,
      scriptPubKey: {
        asm:
          'OP_RETURN 5262419 1 1145980243 497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7 0000000005f5e100 00005ad7e49d9100',
        hex:
          '6a04534c500001010453454e4420497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7080000000005f5e1000800005ad7e49d9100',
        type: 'nulldata'
      }
    },
    {
      value: 0.00000546,
      n: 1,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 36be3b7d185a85b6cf6fc61d63c16f2f10e54260 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a91436be3b7d185a85b6cf6fc61d63c16f2f10e5426088ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qqmtuwmarpdgtdk0dlrp6c7pduh3pe2zvqrkys2ex8']
      }
    },
    {
      value: 0.00000546,
      n: 2,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 99e5a8229a9af0dbf3cadb25ea981df49c9d93bf OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a91499e5a8229a9af0dbf3cadb25ea981df49c9d93bf88ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qzv7t2pzn2d0pklnetdjt65crh6fe8vnhuwvhsk2nn']
      }
    },
    {
      value: 0.68368564,
      n: 3,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 422e1b3b400864bfd3146dd9c628de0f1da62289 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a914422e1b3b400864bfd3146dd9c628de0f1da6228988ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qppzuxemgqyxf07nz3kan33gmc83mf3z3yz295c4s7']
      }
    }
  ],
  hex:
    '020000000236a7a2c08a889c012a5b838cf7e97646c7b93f0f355ae0e5515fa9f2f185c6ab020000006b483045022100e5f0f6f1212fcbb10eedb7fdc38fca6e86629b4e7e8356a3ad7371a109fc37a602204bfff37d1a34d2e2908b81c23677706fb59ff4ab639fa3299da6c303de74e1f741210245b9b3586fab3cfd46db6d116c4588004fe7fe9798216ccb8e55a89bcebc07acffffffff56688d4b71e95bd4b69e3e9b5970a0d383943907330524a2231cc0046457c85801000000694630430220784f6d81fa8f54db8a4948259e8c15972a0285f8b1640c433d4e9f606dc38f0c021f14eecc2e8af2efede0867ce459c400dde54186a0e64babdbe89f795db1275341210209ebe6d9da5043945ed1d81bec0fcace299eba05e5f46b72d6838c790d31c505ffffffff040000000000000000406a04534c500001010453454e4420497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7080000000005f5e1000800005ad7e49d910022020000000000001976a91436be3b7d185a85b6cf6fc61d63c16f2f10e5426088ac22020000000000001976a91499e5a8229a9af0dbf3cadb25ea981df49c9d93bf88acb4381304000000001976a914422e1b3b400864bfd3146dd9c628de0f1da6228988ac00000000',
  blockhash: '0000000000000000015284202422a688554b7fc80c54f18122847a99c4f79607',
  confirmations: 76722,
  time: 1570392893,
  blocktime: 1570392893
}

const mockOpReturnData01 = {
  tokenType: 1,
  txType: 'SEND',
  tokenId: '497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7',
  amounts: ['100000000', '99883300000000']
}

const mockOpReturnData02 = {
  tokenType: 1,
  txType: 'GENESIS',
  ticker: 'TOK-CH',
  name: 'TokyoCash',
  tokenId: '497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7',
  documentUri: '',
  documentHash: '',
  decimals: 8,
  mintBatonVout: 0,
  qty: '2100000000000000'
}

const mockOpReturnData03 = {
  tokenType: 1,
  txType: 'SEND',
  tokenId: '497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7',
  amounts: ['1000000000', '99883400000000']
}

const genesisTestInputTx = {
  txid: '874306bda204d3a5dd15e03ea5732cccdca4c33a52df35162cdd64e30ea7f04e',
  hash: '874306bda204d3a5dd15e03ea5732cccdca4c33a52df35162cdd64e30ea7f04e',
  version: 1,
  size: 480,
  locktime: 543408,
  vin: [
    {
      txid: '323a1e35ae0b356316093d20f2d9fbc995d19314b5c0148b78dc8d9c0dab9d35',
      vout: 1,
      scriptSig: {
        asm:
          '30440220268dacee1117975d904dd0d45ef8de42b86030d825a9522bae196a38bbf6b271022001ae1ce2536ab300040e597bcfaa8ef9fb2beaf702d0842f3161aae8e9867f55[ALL|FORKID] 028ff9e32b0dbc82c1d5e0fc945b2537b00420513b10684726f312f1b717c0ae11',
        hex:
          '4730440220268dacee1117975d904dd0d45ef8de42b86030d825a9522bae196a38bbf6b271022001ae1ce2536ab300040e597bcfaa8ef9fb2beaf702d0842f3161aae8e9867f554121028ff9e32b0dbc82c1d5e0fc945b2537b00420513b10684726f312f1b717c0ae11'
      },
      sequence: 4294967294,
      address: 'bitcoincash:qp2jesd06k8ycj4wvkpl9lcwaemtr04f5yphjsa07v',
      value: 0.00000546
    },
    {
      txid: '323a1e35ae0b356316093d20f2d9fbc995d19314b5c0148b78dc8d9c0dab9d35',
      vout: 3,
      scriptSig: {
        asm:
          '3045022100fa241bb2de46f68688451bfcae3f165b724e3ccf13b219e7bf2d8d2df7712ad60220353017d6e581a06efce478adfcd2047cea2f92531e283845f3d0a345ef101519[ALL|FORKID] 02cc48ad10516f97e914b8836ff25448d07ad96ebb4704c6a828339880280831bc',
        hex:
          '483045022100fa241bb2de46f68688451bfcae3f165b724e3ccf13b219e7bf2d8d2df7712ad60220353017d6e581a06efce478adfcd2047cea2f92531e283845f3d0a345ef101519412102cc48ad10516f97e914b8836ff25448d07ad96ebb4704c6a828339880280831bc'
      },
      sequence: 4294967294,
      address: 'bitcoincash:qppj3euc36x5u6twr5cxrrea2rca53vsfu3dxwr86j',
      value: 0.00172192
    }
  ],
  vout: [
    {
      value: 0,
      n: 0,
      scriptPubKey: {
        asm:
          'OP_RETURN 5262419 1 1145980243 323a1e35ae0b356316093d20f2d9fbc995d19314b5c0148b78dc8d9c0dab9d35 00000000004c4b40 00000000004c4b40',
        hex:
          '6a04534c500001010453454e4420323a1e35ae0b356316093d20f2d9fbc995d19314b5c0148b78dc8d9c0dab9d350800000000004c4b400800000000004c4b40',
        type: 'nulldata'
      }
    },
    {
      value: 0.00000546,
      n: 1,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 0a74cf9c0fb3f6dd62c3f5eecd1ed6e1051428e0 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a9140a74cf9c0fb3f6dd62c3f5eecd1ed6e1051428e088ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qq98fnuup7eldhtzc067ang76mss29pguqh7qv9eac']
      }
    },
    {
      value: 0.00000546,
      n: 2,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 d4548261e1be0de7e50b7511597799ec4af2b173 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a914d4548261e1be0de7e50b7511597799ec4af2b17388ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qr29fqnpuxlqmel9pd63zkthn8ky4u43wv0v7pg5mn']
      }
    },
    {
      value: 0.00171165,
      n: 3,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 d4548261e1be0de7e50b7511597799ec4af2b173 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a914d4548261e1be0de7e50b7511597799ec4af2b17388ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qr29fqnpuxlqmel9pd63zkthn8ky4u43wv0v7pg5mn']
      }
    }
  ],
  hex:
    '0100000002359dab0d9c8ddc788b14c0b51493d195c9fbd9f2203d091663350bae351e3a32010000006a4730440220268dacee1117975d904dd0d45ef8de42b86030d825a9522bae196a38bbf6b271022001ae1ce2536ab300040e597bcfaa8ef9fb2beaf702d0842f3161aae8e9867f554121028ff9e32b0dbc82c1d5e0fc945b2537b00420513b10684726f312f1b717c0ae11feffffff359dab0d9c8ddc788b14c0b51493d195c9fbd9f2203d091663350bae351e3a32030000006b483045022100fa241bb2de46f68688451bfcae3f165b724e3ccf13b219e7bf2d8d2df7712ad60220353017d6e581a06efce478adfcd2047cea2f92531e283845f3d0a345ef101519412102cc48ad10516f97e914b8836ff25448d07ad96ebb4704c6a828339880280831bcfeffffff040000000000000000406a04534c500001010453454e4420323a1e35ae0b356316093d20f2d9fbc995d19314b5c0148b78dc8d9c0dab9d350800000000004c4b400800000000004c4b4022020000000000001976a9140a74cf9c0fb3f6dd62c3f5eecd1ed6e1051428e088ac22020000000000001976a914d4548261e1be0de7e50b7511597799ec4af2b17388ac9d9c0200000000001976a914d4548261e1be0de7e50b7511597799ec4af2b17388acb04a0800',
  blockhash: '000000000000000000292a9c6150fce48e2edd8df346948494fe6249e6e7f63b',
  confirmations: 163095,
  time: 1534271330,
  blocktime: 1534271330
}

genesisTestOpReturnData01 = {
  tokenType: 1,
  txType: 'SEND',
  tokenId: '323a1e35ae0b356316093d20f2d9fbc995d19314b5c0148b78dc8d9c0dab9d35',
  amounts: ['5000000', '5000000']
}

genesisTestOpReturnData02 = {
  tokenType: 1,
  txType: 'GENESIS',
  ticker: '',
  name: '',
  tokenId: '323a1e35ae0b356316093d20f2d9fbc995d19314b5c0148b78dc8d9c0dab9d35',
  documentUri: '',
  documentHash: '',
  decimals: 0,
  mintBatonVout: 2,
  qty: '10000000'
}

module.exports = {
  nonSlpTxDetails,
  slpTxDetails,
  mockOpReturnData01,
  mockOpReturnData02,
  mockOpReturnData03,
  genesisTestInputTx,
  genesisTestOpReturnData01,
  genesisTestOpReturnData02
}
