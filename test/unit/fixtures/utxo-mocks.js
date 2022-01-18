const mockUtxoData = {
  success: true,
  utxos: [
    {
      utxos: [
        {
          height: 569108,
          tx_hash:
            '384e1b8197e8de7d38f98317af2cf5f6bcb50007c46943b3498a6fab6e8aeb7c',
          tx_pos: 1,
          value: 546
        },
        {
          height: 674331,
          tx_hash:
            '5e86cd911110e4f5db0cc3e8f459d5e8850b49adf57059a71daee674b2867b31',
          tx_pos: 0,
          value: 1000
        }
      ],
      address: 'bitcoincash:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvg8nfhq4m'
    }
  ]
}

const mockHydratedUtxos = {
  slpUtxos: [
    {
      utxos: [
        {
          height: 569108,
          tx_hash:
            '384e1b8197e8de7d38f98317af2cf5f6bcb50007c46943b3498a6fab6e8aeb7c',
          tx_pos: 1,
          value: 546,
          txid:
            '384e1b8197e8de7d38f98317af2cf5f6bcb50007c46943b3498a6fab6e8aeb7c',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            'a436c8e1b6bee3d701c6044d190f76f774be83c36de8d34a988af4489e86dd37',
          tokenTicker: 'sleven',
          tokenName: 'sleven',
          tokenDocumentUrl: 'sleven',
          tokenDocumentHash: '',
          decimals: 7,
          tokenType: 1,
          tokenQty: '1',
          isValid: true
        },
        {
          height: 674331,
          tx_hash:
            '5e86cd911110e4f5db0cc3e8f459d5e8850b49adf57059a71daee674b2867b31',
          tx_pos: 0,
          value: 1000,
          txid:
            '5e86cd911110e4f5db0cc3e8f459d5e8850b49adf57059a71daee674b2867b31',
          vout: 0,
          isValid: false
        }
      ],
      address: 'bitcoincash:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvg8nfhq4m'
    }
  ]
}

const mockTwoHydratedAddrs = {
  slpUtxos: [
    {
      utxos: [
        {
          height: 569108,
          tx_hash:
            '384e1b8197e8de7d38f98317af2cf5f6bcb50007c46943b3498a6fab6e8aeb7c',
          tx_pos: 1,
          value: 546,
          txid:
            '384e1b8197e8de7d38f98317af2cf5f6bcb50007c46943b3498a6fab6e8aeb7c',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            'a436c8e1b6bee3d701c6044d190f76f774be83c36de8d34a988af4489e86dd37',
          tokenTicker: 'sleven',
          tokenName: 'sleven',
          tokenDocumentUrl: 'sleven',
          tokenDocumentHash: '',
          decimals: 7,
          tokenType: 1,
          tokenQty: '1',
          isValid: true
        },
        {
          height: 674331,
          tx_hash:
            '5e86cd911110e4f5db0cc3e8f459d5e8850b49adf57059a71daee674b2867b31',
          tx_pos: 0,
          value: 1000,
          txid:
            '5e86cd911110e4f5db0cc3e8f459d5e8850b49adf57059a71daee674b2867b31',
          vout: 0,
          isValid: false
        }
      ],
      address: 'bitcoincash:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvg8nfhq4m'
    },
    {
      utxos: [
        {
          height: 602405,
          tx_hash:
            '2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7',
          tx_pos: 0,
          value: 1000,
          txid:
            '2b37bdb3b63dd0bca720437754a36671431a950e684b64c44ea910ea9d5297c7',
          vout: 0,
          isValid: false
        }
      ],
      address: 'bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9'
    }
  ]
}

const mockEveryUtxoType = {
  slpUtxos: [
    {
      utxos: [
        {
          height: 674512,
          tx_hash:
            'acbb0d3ceef55aa3e5fafc19335ae4bf2f8edba3c0567547dfd402391db32230',
          tx_pos: 1,
          value: 546,
          txid:
            'acbb0d3ceef55aa3e5fafc19335ae4bf2f8edba3c0567547dfd402391db32230',
          vout: 1,
          utxoType: 'token',
          tokenQty: '100',
          tokenId:
            'acbb0d3ceef55aa3e5fafc19335ae4bf2f8edba3c0567547dfd402391db32230',
          tokenTicker: 'SLPTEST',
          tokenName: 'SLP Test Token',
          tokenDocumentUrl: 'https://FullStack.cash',
          tokenDocumentHash: '',
          decimals: 8,
          tokenType: 1,
          isValid: true
        },
        {
          height: 674512,
          tx_hash:
            'acbb0d3ceef55aa3e5fafc19335ae4bf2f8edba3c0567547dfd402391db32230',
          tx_pos: 2,
          value: 546,
          txid:
            'acbb0d3ceef55aa3e5fafc19335ae4bf2f8edba3c0567547dfd402391db32230',
          vout: 2,
          utxoType: 'minting-baton',
          tokenId:
            'acbb0d3ceef55aa3e5fafc19335ae4bf2f8edba3c0567547dfd402391db32230',
          tokenTicker: 'SLPTEST',
          tokenName: 'SLP Test Token',
          tokenDocumentUrl: 'https://FullStack.cash',
          tokenDocumentHash: '',
          decimals: 8,
          tokenType: 1,
          isValid: true
        },
        {
          height: 674512,
          tx_hash:
            'eeddccc4d716f04157ea132ac93a48040fea34a6b57f3d8f0cccb7d1a731ab2b',
          tx_pos: 1,
          value: 546,
          txid:
            'eeddccc4d716f04157ea132ac93a48040fea34a6b57f3d8f0cccb7d1a731ab2b',
          vout: 1,
          utxoType: 'token',
          tokenQty: '1',
          tokenId:
            'eeddccc4d716f04157ea132ac93a48040fea34a6b57f3d8f0cccb7d1a731ab2b',
          tokenTicker: 'NFT004',
          tokenName: 'NFT Child',
          tokenDocumentUrl: 'https://FullStack.cash',
          tokenDocumentHash: '',
          decimals: 0,
          tokenType: 65,
          isValid: true
        },
        {
          height: 674513,
          tx_hash:
            '705bcc442e5a2770e560b528f52a47b1dcc9ce9ab6a8de9dfdefa55177f00d04',
          tx_pos: 1,
          value: 546,
          txid:
            '705bcc442e5a2770e560b528f52a47b1dcc9ce9ab6a8de9dfdefa55177f00d04',
          vout: 1,
          utxoType: 'token',
          tokenQty: '10',
          transactionType: 'mint',
          tokenId:
            'a9a2458a0f9f0761d5b8725c256f2e7fa35b9de4dec6f47b46e9f20d92d0e395',
          tokenType: 129,
          tokenTicker: 'NFTGT',
          tokenName: 'NFT Test Group Token',
          tokenDocumentUrl: 'https://FullStack.cash',
          tokenDocumentHash: '',
          decimals: 0,
          mintBatonVout: 2,
          isValid: true
        },
        {
          height: 674513,
          tx_hash:
            '705bcc442e5a2770e560b528f52a47b1dcc9ce9ab6a8de9dfdefa55177f00d04',
          tx_pos: 2,
          value: 546,
          txid:
            '705bcc442e5a2770e560b528f52a47b1dcc9ce9ab6a8de9dfdefa55177f00d04',
          vout: 2,
          utxoType: 'minting-baton',
          transactionType: 'mint',
          tokenId:
            'a9a2458a0f9f0761d5b8725c256f2e7fa35b9de4dec6f47b46e9f20d92d0e395',
          tokenType: 129,
          tokenTicker: 'NFTGT',
          tokenName: 'NFT Test Group Token',
          tokenDocumentUrl: 'https://FullStack.cash',
          tokenDocumentHash: '',
          decimals: 0,
          mintBatonVout: 2,
          isValid: true
        },
        {
          height: 674513,
          tx_hash:
            '705bcc442e5a2770e560b528f52a47b1dcc9ce9ab6a8de9dfdefa55177f00d04',
          tx_pos: 3,
          value: 38134,
          txid:
            '705bcc442e5a2770e560b528f52a47b1dcc9ce9ab6a8de9dfdefa55177f00d04',
          vout: 3,
          isValid: false
        }
      ],
      address: 'bitcoincash:qrm0c67wwqh0w7wjxua2gdt2xggnm90xws00a3lezv'
    }
  ]
}

const electrumxUtxos = {
  success: true,
  utxos: [
    {
      height: 0,
      tx_hash:
        '192f5037bb3822afd92d6b6ab51842a5dcfbe6bff783290057342da1f27ed414',
      tx_pos: 0,
      value: 600
    },
    {
      height: 0,
      tx_hash:
        'f913646f7c180f8de020cb1387951272e8a3f764a0f88e68f7fc1145a0bf02e9',
      tx_pos: 0,
      value: 700
    },
    {
      height: 0,
      tx_hash:
        '7a091716f8137e94f87e7760648cd34a17e32754ef95f7c7bda38a635c9b2b1b',
      tx_pos: 0,
      value: 800
    }
  ]
}

const fulcrumUtxos01 = {
  success: true,
  utxos: [
    {
      height: 674512,
      tx_hash:
        'acbb0d3ceef55aa3e5fafc19335ae4bf2f8edba3c0567547dfd402391db32230',
      tx_pos: 1,
      value: 546
    },
    {
      height: 674512,
      tx_hash:
        'acbb0d3ceef55aa3e5fafc19335ae4bf2f8edba3c0567547dfd402391db32230',
      tx_pos: 2,
      value: 546
    },
    {
      height: 674512,
      tx_hash:
        'eeddccc4d716f04157ea132ac93a48040fea34a6b57f3d8f0cccb7d1a731ab2b',
      tx_pos: 1,
      value: 546
    },
    {
      height: 674513,
      tx_hash:
        '705bcc442e5a2770e560b528f52a47b1dcc9ce9ab6a8de9dfdefa55177f00d04',
      tx_pos: 1,
      value: 546
    },
    {
      height: 674513,
      tx_hash:
        '705bcc442e5a2770e560b528f52a47b1dcc9ce9ab6a8de9dfdefa55177f00d04',
      tx_pos: 2,
      value: 546
    },
    {
      height: 674513,
      tx_hash:
        '705bcc442e5a2770e560b528f52a47b1dcc9ce9ab6a8de9dfdefa55177f00d04',
      tx_pos: 3,
      value: 38134
    }
  ]
}

const psfSlpIndexerUtxos01 = {
  balance: {
    utxos: [
      {
        txid:
          'acbb0d3ceef55aa3e5fafc19335ae4bf2f8edba3c0567547dfd402391db32230',
        vout: 1,
        type: 'token',
        qty: '10000000000',
        tokenId:
          'acbb0d3ceef55aa3e5fafc19335ae4bf2f8edba3c0567547dfd402391db32230',
        address: 'bitcoincash:qrm0c67wwqh0w7wjxua2gdt2xggnm90xws00a3lezv'
      },
      {
        txid:
          'acbb0d3ceef55aa3e5fafc19335ae4bf2f8edba3c0567547dfd402391db32230',
        vout: 2,
        type: 'baton',
        tokenId:
          'acbb0d3ceef55aa3e5fafc19335ae4bf2f8edba3c0567547dfd402391db32230',
        address: 'bitcoincash:qrm0c67wwqh0w7wjxua2gdt2xggnm90xws00a3lezv'
      }
    ],
    txs: [
      {
        txid:
          'acbb0d3ceef55aa3e5fafc19335ae4bf2f8edba3c0567547dfd402391db32230',
        height: 674512
      }
    ],
    balances: [
      {
        tokenId:
          'acbb0d3ceef55aa3e5fafc19335ae4bf2f8edba3c0567547dfd402391db32230',
        qty: '10000000000'
      }
    ]
  }
}

module.exports = {
  mockUtxoData,
  mockHydratedUtxos,
  mockTwoHydratedAddrs,
  mockEveryUtxoType,
  electrumxUtxos,
  fulcrumUtxos01,
  psfSlpIndexerUtxos01
}
