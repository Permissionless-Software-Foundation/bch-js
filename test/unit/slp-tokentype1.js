/*
  Unit tests for the TokenType1 library.
*/

const assert = require('chai').assert
const sinon = require('sinon')
// const axios = require("axios")

// Default to unit tests unless some other value for TEST is passed.
if (!process.env.TEST) process.env.TEST = 'unit'
// const SERVER = bchjs.restURL

const BCHJS = require('../../src/bch-js')
const bchjs = new BCHJS()

// Mock data used for unit tests
// const mockData = require("./fixtures/slp/mock-utils")

// Default to unit tests unless some other value for TEST is passed.
if (!process.env.TEST) process.env.TEST = 'unit'

describe('#SLP TokenType1', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#generateSendOpReturn', () => {
    it('should generate send OP_RETURN code', () => {
      // Mock UTXO.
      const tokenUtxos = [
        {
          txid:
            'a8eb788b8ddda6faea00e6e2756624b8feb97655363d0400dd66839ea619d36e',
          vout: 2,
          value: '546',
          confirmations: 0,
          satoshis: 546,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7',
          tokenTicker: 'TOK-CH',
          tokenName: 'TokyoCash',
          tokenDocumentUrl: '',
          tokenDocumentHash: '',
          decimals: 8,
          tokenQty: 7
        }
      ]

      const result = bchjs.SLP.TokenType1.generateSendOpReturn(tokenUtxos, 1)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ['script', 'outputs'])
      assert.isNumber(result.outputs)
    })
  })

  describe('#generateSendOpReturn01', () => {
    it('should generate send OP_RETURN code', () => {
      // Mock UTXO.
      const tokenUtxos = [
        {
          address: 'bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu',
          decimals: 9,
          height: 0,
          isValid: true,
          satoshis: 546,
          tokenDocumentHash: '',
          tokenDocumentUrl: 'https://cashtabapp.com/',
          tokenId:
            'bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1',
          tokenName: 'Cash Tab Points',
          tokenQty: 1000000000,
          tokenTicker: 'CTP',
          tokenType: 1,
          transactionType: 'send',
          tx_hash:
            'ff46ab7730194691b89301e7d5d4805c304db83522e8aa4e5fa8b592c8aecf41',
          tx_pos: 1,
          txid:
            'ff46ab7730194691b89301e7d5d4805c304db83522e8aa4e5fa8b592c8aecf41',
          utxoType: 'token',
          value: 546,
          vout: 1
        }
      ]

      const result = bchjs.SLP.TokenType1.generateSendOpReturn(
        tokenUtxos,
        0.000000001
      )
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ['script', 'outputs'])
      assert.isNumber(result.outputs)
    })
  })

  describe('#generateSendOpReturn02', () => {
    it('should generate send OP_RETURN code', () => {
      // Mock UTXO.
      const tokenUtxos = [
        {
          address: 'bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu',
          decimals: 9,
          height: 660974,
          isValid: true,
          satoshis: 546,
          tokenDocumentHash: '',
          tokenDocumentUrl: 'https://cashtabapp.com/',
          tokenId:
            'bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1',
          tokenName: 'Cash Tab Points',
          tokenQty: 1000000000,
          tokenTicker: 'CTP',
          tokenType: 1,
          transactionType: 'send',
          tx_hash:
            '2922728e4febc21523369902615165bc15753f79f7488d3f1a260808ff0e116d',
          tx_pos: 1,
          txid:
            '2922728e4febc21523369902615165bc15753f79f7488d3f1a260808ff0e116d',
          utxoType: 'token',
          value: 546,
          vout: 1
        }
      ]

      const result = bchjs.SLP.TokenType1.generateSendOpReturn(
        tokenUtxos,
        1000000000
      )
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ['script', 'outputs'])
      assert.isNumber(result.outputs)
    })
  })

  describe('#generateSendOpReturn03', () => {
    it('should generate send OP_RETURN code', () => {
      // Mock UTXO.
      const tokenUtxos = [
        {
          address: 'bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu',
          decimals: 9,
          height: 660974,
          isValid: true,
          satoshis: 546,
          tokenDocumentHash: '',
          tokenDocumentUrl: 'https://cashtabapp.com/',
          tokenId:
            'bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1',
          tokenName: 'Cash Tab Points',
          tokenQty: 1000000000,
          tokenTicker: 'CTP',
          tokenType: 1,
          transactionType: 'send',
          tx_hash:
            '2922728e4febc21523369902615165bc15753f79f7488d3f1a260808ff0e116d',
          tx_pos: 1,
          txid:
            '2922728e4febc21523369902615165bc15753f79f7488d3f1a260808ff0e116d',
          utxoType: 'token',
          value: 546,
          vout: 1
        }
      ]

      const result = bchjs.SLP.TokenType1.generateSendOpReturn(
        tokenUtxos,
        0.000000001
      )
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ['script', 'outputs'])
      assert.isNumber(result.outputs)
    })
  })

  // describe('#generateSendOpReturn04', () => {
  //   it('should generate send OP_RETURN code', () => {
  //     // Mock UTXO.
  //     const tokenUtxos = [
  //       {
  //         address: 'bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu',
  //         decimals: 9,
  //         height: 660974,
  //         isValid: true,
  //         satoshis: 546,
  //         tokenDocumentHash: '',
  //         tokenDocumentUrl: 'https://cashtabapp.com/',
  //         tokenId:
  //           'bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1',
  //         tokenName: 'Cash Tab Points',
  //         tokenQty: 1000000000,
  //         tokenTicker: 'CTP',
  //         tokenType: 1,
  //         transactionType: 'send',
  //         tx_hash:
  //           '2922728e4febc21523369902615165bc15753f79f7488d3f1a260808ff0e116d',
  //         tx_pos: 1,
  //         txid:
  //           '2922728e4febc21523369902615165bc15753f79f7488d3f1a260808ff0e116d',
  //         utxoType: 'token',
  //         value: 546,
  //         vout: 1
  //       },
  //       {
  //         address: 'bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu',
  //         decimals: 9,
  //         height: 0,
  //         isValid: true,
  //         satoshis: 546,
  //         tokenDocumentHash: '',
  //         tokenDocumentUrl: 'https://cashtabapp.com/',
  //         tokenId:
  //           'bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1',
  //         tokenName: 'Cash Tab Points',
  //         tokenQty: 1.000000001,
  //         tokenTicker: 'CTP',
  //         tokenType: 1,
  //         transactionType: 'send',
  //         tx_hash:
  //           '2ae85b47d9dc61bd90909048d057234efe9508bcc6a599708d029122ed113515',
  //         tx_pos: 1,
  //         txid:
  //           '2ae85b47d9dc61bd90909048d057234efe9508bcc6a599708d029122ed113515',
  //         utxoType: 'token',
  //         value: 546,
  //         vout: 1
  //       },
  //       {
  //         address: 'bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu',
  //         decimals: 9,
  //         height: 0,
  //         isValid: true,
  //         satoshis: 546,
  //         tokenDocumentHash: '',
  //         tokenDocumentUrl: 'https://cashtabapp.com/',
  //         tokenId:
  //           'bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1',
  //         tokenName: 'Cash Tab Points',
  //         tokenQty: 1,
  //         tokenTicker: 'CTP',
  //         tokenType: 1,
  //         transactionType: 'send',
  //         tx_hash:
  //           '4ebd5acb0f3c4edefb9d15295cc2e14f4dada90a3ff0ee17cf77efc57e2940a1',
  //         tx_pos: 1,
  //         txid:
  //           '4ebd5acb0f3c4edefb9d15295cc2e14f4dada90a3ff0ee17cf77efc57e2940a1',
  //         utxoType: 'token',
  //         value: 546,
  //         vout: 1
  //       },
  //       {
  //         address: 'bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu',
  //         decimals: 9,
  //         height: 0,
  //         isValid: true,
  //         satoshis: 546,
  //         tokenDocumentHash: '',
  //         tokenDocumentUrl: 'https://cashtabapp.com/',
  //         tokenId:
  //           'bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1',
  //         tokenName: 'Cash Tab Points',
  //         tokenQty: 1,
  //         tokenTicker: 'CTP',
  //         tokenType: 1,
  //         transactionType: 'send',
  //         tx_hash:
  //           '5ed96f59ae4fec31ee8fc96304bd610c3658f9df2fde35119aad6f44547420f9',
  //         tx_pos: 1,
  //         txid:
  //           '5ed96f59ae4fec31ee8fc96304bd610c3658f9df2fde35119aad6f44547420f9',
  //         utxoType: 'token',
  //         value: 546,
  //         vout: 1
  //       },
  //       {
  //         address: 'bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu',
  //         decimals: 9,
  //         height: 0,
  //         isValid: true,
  //         satoshis: 546,
  //         tokenDocumentHash: '',
  //         tokenDocumentUrl: 'https://cashtabapp.com/',
  //         tokenId:
  //           'bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1',
  //         tokenName: 'Cash Tab Points',
  //         tokenQty: 1,
  //         tokenTicker: 'CTP',
  //         tokenType: 1,
  //         transactionType: 'send',
  //         tx_hash:
  //           '648465087cc8ba218ccf6b7261256924ef2dc1d20e5c10117a6d555065c01600',
  //         tx_pos: 1,
  //         txid:
  //           '648465087cc8ba218ccf6b7261256924ef2dc1d20e5c10117a6d555065c01600',
  //         utxoType: 'token',
  //         value: 546,
  //         vout: 1
  //       }
  //     ]
  //
  //     const result = bchjs.SLP.TokenType1.generateSendOpReturn(
  //       tokenUtxos,
  //       1000000004.000000001
  //     )
  //     // console.log(`result: ${JSON.stringify(result, null, 2)}`)
  //
  //     assert.hasAllKeys(result, ['script', 'outputs'])
  //     assert.isNumber(result.outputs)
  //   })
  // })

  // describe('#generateSendOpReturn05', () => {
  // it('should generate send OP_RETURN code', () => {
  //   // Mock UTXO.
  //   const tokenUtxos = [
  //     {
  //       address: 'bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu',
  //       decimals: 9,
  //       height: 660974,
  //       isValid: true,
  //       satoshis: 546,
  //       tokenDocumentHash: '',
  //       tokenDocumentUrl: 'https://cashtabapp.com/',
  //       tokenId:
  //         'bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1',
  //       tokenName: 'Cash Tab Points',
  //       tokenQty: 1000000000,
  //       tokenTicker: 'CTP',
  //       tokenType: 1,
  //       transactionType: 'send',
  //       tx_hash:
  //         '2922728e4febc21523369902615165bc15753f79f7488d3f1a260808ff0e116d',
  //       tx_pos: 1,
  //       txid:
  //         '2922728e4febc21523369902615165bc15753f79f7488d3f1a260808ff0e116d',
  //       utxoType: 'token',
  //       value: 546,
  //       vout: 1
  //     },
  //     {
  //       address: 'bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu',
  //       decimals: 9,
  //       height: 0,
  //       isValid: true,
  //       satoshis: 546,
  //       tokenDocumentHash: '',
  //       tokenDocumentUrl: 'https://cashtabapp.com/',
  //       tokenId:
  //         'bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1',
  //       tokenName: 'Cash Tab Points',
  //       tokenQty: 1.000000001,
  //       tokenTicker: 'CTP',
  //       tokenType: 1,
  //       transactionType: 'send',
  //       tx_hash:
  //         '2ae85b47d9dc61bd90909048d057234efe9508bcc6a599708d029122ed113515',
  //       tx_pos: 1,
  //       txid:
  //         '2ae85b47d9dc61bd90909048d057234efe9508bcc6a599708d029122ed113515',
  //       utxoType: 'token',
  //       value: 546,
  //       vout: 1
  //     },
  //     {
  //       address: 'bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu',
  //       decimals: 9,
  //       height: 0,
  //       isValid: true,
  //       satoshis: 546,
  //       tokenDocumentHash: '',
  //       tokenDocumentUrl: 'https://cashtabapp.com/',
  //       tokenId:
  //         'bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1',
  //       tokenName: 'Cash Tab Points',
  //       tokenQty: 1,
  //       tokenTicker: 'CTP',
  //       tokenType: 1,
  //       transactionType: 'send',
  //       tx_hash:
  //         '4ebd5acb0f3c4edefb9d15295cc2e14f4dada90a3ff0ee17cf77efc57e2940a1',
  //       tx_pos: 1,
  //       txid:
  //         '4ebd5acb0f3c4edefb9d15295cc2e14f4dada90a3ff0ee17cf77efc57e2940a1',
  //       utxoType: 'token',
  //       value: 546,
  //       vout: 1
  //     },
  //     {
  //       address: 'bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu',
  //       decimals: 9,
  //       height: 0,
  //       isValid: true,
  //       satoshis: 546,
  //       tokenDocumentHash: '',
  //       tokenDocumentUrl: 'https://cashtabapp.com/',
  //       tokenId:
  //         'bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1',
  //       tokenName: 'Cash Tab Points',
  //       tokenQty: 1,
  //       tokenTicker: 'CTP',
  //       tokenType: 1,
  //       transactionType: 'send',
  //       tx_hash:
  //         '5ed96f59ae4fec31ee8fc96304bd610c3658f9df2fde35119aad6f44547420f9',
  //       tx_pos: 1,
  //       txid:
  //         '5ed96f59ae4fec31ee8fc96304bd610c3658f9df2fde35119aad6f44547420f9',
  //       utxoType: 'token',
  //       value: 546,
  //       vout: 1
  //     },
  //     {
  //       address: 'bitcoincash:qpv9fx6mjdpgltygudnpw3tvmxdyzx7savhphtzswu',
  //       decimals: 9,
  //       height: 0,
  //       isValid: true,
  //       satoshis: 546,
  //       tokenDocumentHash: '',
  //       tokenDocumentUrl: 'https://cashtabapp.com/',
  //       tokenId:
  //         'bef614aac85c0c866f4d39e4d12a96851267d38d1bca5bdd6488bbd42e28b6b1',
  //       tokenName: 'Cash Tab Points',
  //       tokenQty: 1,
  //       tokenTicker: 'CTP',
  //       tokenType: 1,
  //       transactionType: 'send',
  //       tx_hash:
  //         '648465087cc8ba218ccf6b7261256924ef2dc1d20e5c10117a6d555065c01600',
  //       tx_pos: 1,
  //       txid:
  //         '648465087cc8ba218ccf6b7261256924ef2dc1d20e5c10117a6d555065c01600',
  //       utxoType: 'token',
  //       value: 546,
  //       vout: 1
  //     }
  //   ]
  //
  //   const result = bchjs.SLP.TokenType1.generateSendOpReturn(
  //     tokenUtxos,
  //     1000000003.500000001
  //   )
  //   // console.log(`result: ${JSON.stringify(result, null, 2)}`)
  //
  //   assert.hasAllKeys(result, ['script', 'outputs'])
  //   assert.isNumber(result.outputs)
  // })
  // })

  describe('#generateSendOpReturn06', () => {
    it('should generate send OP_RETURN code', () => {
      // Mock UTXO.
      const tokenUtxos = [
        {
          height: 660844,
          tx_hash:
            '00dcc47dcebf3ad95140c271a70172a45a4f5de53ecc17d71471eea57a0c361f',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            '00dcc47dcebf3ad95140c271a70172a45a4f5de53ecc17d71471eea57a0c361f',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 3.0000011,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            '04585cff8a53166afc86f3f0e06d5d2c8b08fb9d39c959ee3e3ff55f550bdabb',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            '04585cff8a53166afc86f3f0e06d5d2c8b08fb9d39c959ee3e3ff55f550bdabb',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 3.000001,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            '25a4af01d1acb12275ced70a50c475dffe6821bc988a232cd0c5c68282673ce6',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            '25a4af01d1acb12275ced70a50c475dffe6821bc988a232cd0c5c68282673ce6',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 3.0000002,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            '2f87a94ad524fc702d47404899badd261346a794898d69cea9dbb56dca0f2bd1',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            '2f87a94ad524fc702d47404899badd261346a794898d69cea9dbb56dca0f2bd1',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 1,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            '31bb9a154181520cbd91ca98605143ad8aaa72a9a90d0649f63bea697d99f4fd',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            '31bb9a154181520cbd91ca98605143ad8aaa72a9a90d0649f63bea697d99f4fd',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 3.0000001,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            '34c77f5f6cac57ce99574fcb09ed542371a002146e1e60135ba4ab23ea7dafeb',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            '34c77f5f6cac57ce99574fcb09ed542371a002146e1e60135ba4ab23ea7dafeb',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 3.0000008,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            '42e04820e080a5499507bdfa02881c3ccf76370833f9a69705ce6bf6f9fcd509',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            '42e04820e080a5499507bdfa02881c3ccf76370833f9a69705ce6bf6f9fcd509',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 3.0000007,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            '4d65bc6900b2454abfd89c782295a559ed559e909c1be81b5e76097fdc06f872',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            '4d65bc6900b2454abfd89c782295a559ed559e909c1be81b5e76097fdc06f872',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 2.05,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            '53c6db88c01c11781dd1ac67eca8177a2260e9005bc49180466eadf71c01f99a',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            '53c6db88c01c11781dd1ac67eca8177a2260e9005bc49180466eadf71c01f99a',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 3.0000004,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            '55531993ed6c5ba7350fdfbfb820bde924e365e52a0e44a33713bd9acbd84379',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            '55531993ed6c5ba7350fdfbfb820bde924e365e52a0e44a33713bd9acbd84379',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 2.0523412,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            '5f109d1215de0d75ee4b4be079e6922a69d0a6f528899ef35fee0c4d64822b8c',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            '5f109d1215de0d75ee4b4be079e6922a69d0a6f528899ef35fee0c4d64822b8c',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 2,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            '66efb27f0a2712554e630db1ac8f7f2ea146820fa02f6f869c9310aa8faa03e4',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            '66efb27f0a2712554e630db1ac8f7f2ea146820fa02f6f869c9310aa8faa03e4',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 3.000001,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            '962fcc8ba3164f3e3ad50c9e9b635d9487a0f7c125ad32421c303332a63ef830',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            '962fcc8ba3164f3e3ad50c9e9b635d9487a0f7c125ad32421c303332a63ef830',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 3.0000005,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            '974dd914cb2de49e7c167cff04ec0182e64861c0ff638223d608e6e51bc11237',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            '974dd914cb2de49e7c167cff04ec0182e64861c0ff638223d608e6e51bc11237',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 3.0000014,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            'ab0fbc0e18278bb9b5ae59660fd8046b0b481a800e011659333035d7c2593128',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            'ab0fbc0e18278bb9b5ae59660fd8046b0b481a800e011659333035d7c2593128',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 2.0523413,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            'ac01f0010bcb5937038d637f9d9131124daab15ffda7458a0c801f38f7f9f3f3',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            'ac01f0010bcb5937038d637f9d9131124daab15ffda7458a0c801f38f7f9f3f3',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 1,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            'ba5049164f13263cdf25453bce53f6b230687bdab2393e0f40c39c313386791c',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            'ba5049164f13263cdf25453bce53f6b230687bdab2393e0f40c39c313386791c',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 3.0000003,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            'd84daa1aa0b8fa265e83dcd506f0f410066eef880ebcd9e8dc70a55ec9fd78f5',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            'd84daa1aa0b8fa265e83dcd506f0f410066eef880ebcd9e8dc70a55ec9fd78f5',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 3.0000012,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            'e67b76c4c411fca92efe1cc0af1bd38c53ee62ce08b4cc81d61209d53d2511c5',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            'e67b76c4c411fca92efe1cc0af1bd38c53ee62ce08b4cc81d61209d53d2511c5',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 3.0000014,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            'f05c192813b5c1565e17b96d8d27481c317ccc25b81ff38fa700c6e91931e211',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            'f05c192813b5c1565e17b96d8d27481c317ccc25b81ff38fa700c6e91931e211',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 3.0000013,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            'f3404e1c4b8fe9d73fae9d11bcd5adf1bcc55852208f0fda8fd4d234320faff9',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            'f3404e1c4b8fe9d73fae9d11bcd5adf1bcc55852208f0fda8fd4d234320faff9',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 3.0000009,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660844,
          tx_hash:
            'fedda41bf7553358b60f0be373f02aa79dec5979c95159bc8c12afdb86b3dec2',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            'fedda41bf7553358b60f0be373f02aa79dec5979c95159bc8c12afdb86b3dec2',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 3.0000006,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660869,
          tx_hash:
            '68fa5a225999c6f28e4a13cd81c9c3d45bae40dd746b9116d859219ad6060851',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            '68fa5a225999c6f28e4a13cd81c9c3d45bae40dd746b9116d859219ad6060851',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 1e-7,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660869,
          tx_hash:
            '8856a0b51ded579c8b880c3b4f7aa2cad491f073439d2cf05d8ea1a64bb0f7b6',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            '8856a0b51ded579c8b880c3b4f7aa2cad491f073439d2cf05d8ea1a64bb0f7b6',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 3e-7,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660869,
          tx_hash:
            'd4bf048e67cdec88c7affd67ca0843ecb8eac53cefce1c4580bed5a699920267',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            'd4bf048e67cdec88c7affd67ca0843ecb8eac53cefce1c4580bed5a699920267',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 4e-7,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660869,
          tx_hash:
            'e2ce53b60e290246dd5e4758c707ffd8a526d651caff49f7f06c841fd9f5870a',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            'e2ce53b60e290246dd5e4758c707ffd8a526d651caff49f7f06c841fd9f5870a',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 2e-7,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        },
        {
          height: 660959,
          tx_hash:
            '7b6ed9a3c13e69d893f217debb3d7313db8d48cf11fc7cdf2256afdafe83f2c2',
          tx_pos: 1,
          value: 546,
          satoshis: 546,
          txid:
            '7b6ed9a3c13e69d893f217debb3d7313db8d48cf11fc7cdf2256afdafe83f2c2',
          vout: 1,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '7443f7c831cdf2b2b04d5f0465ed0bcf348582675b0e4f17906438c232c22f3d',
          tokenTicker: 'WDT',
          tokenName:
            'Test Token With Exceptionally Long Name For CSS And Style Revisions',
          tokenDocumentUrl:
            'https://www.ImpossiblyLongWebsiteDidYouThinkWebDevWouldBeFun.org',
          tokenDocumentHash: '����\\�IS\u001e9�����k+���\u0018���\u001b]�߷2��',
          decimals: 7,
          tokenType: 1,
          tokenQty: 1e-7,
          isValid: true,
          address: 'bitcoincash:qqvcsnz9x9nu7vq35vmrkjc7hkfxhhs9nuv44zm0ed'
        }
      ]

      const result = bchjs.SLP.TokenType1.generateSendOpReturn(
        tokenUtxos,
        58.1546965
      )
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ['script', 'outputs'])
      assert.isNumber(result.outputs)
    })
  })

  describe('#generateSendOpReturn07', () => {
    it('should generate send OP_RETURN code', () => {
      // Mock UTXO.
      const tokenUtxos = [
        {
          tokenId: '38e97c5d7d3585a2cbf3f9580c82ca33985f9cb0845d4dcce220cb709f9538b0',
          decimals: 8,
          tokenQty: 2
        }
      ]

      const result = bchjs.SLP.TokenType1.generateSendOpReturn(tokenUtxos, 1.5)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ['script', 'outputs'])
      assert.isNumber(result.outputs)
    })
  })

  describe('#generateBurnOpReturn', () => {
    it('should generate burn OP_RETURN code', () => {
      // Mock UTXO.
      const tokenUtxos = [
        {
          txid:
            'a8eb788b8ddda6faea00e6e2756624b8feb97655363d0400dd66839ea619d36e',
          vout: 2,
          value: '546',
          confirmations: 0,
          satoshis: 546,
          utxoType: 'token',
          transactionType: 'send',
          tokenId:
            '497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7',
          tokenTicker: 'TOK-CH',
          tokenName: 'TokyoCash',
          tokenDocumentUrl: '',
          tokenDocumentHash: '',
          decimals: 8,
          tokenQty: '7'
        }
      ]

      const result = bchjs.SLP.TokenType1.generateBurnOpReturn(tokenUtxos, 8)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)
      // console.log(`result: `, result)

      assert.equal(Buffer.isBuffer(result), true)
    })
  })

  describe('#generateGenesisOpReturn', () => {
    it('should generate genesis OP_RETURN code', () => {
      const configObj = {
        name: 'SLP Test Token',
        ticker: 'SLPTEST',
        documentUrl: 'https://bchjs.cash',
        documentHash: '',
        decimals: 8,
        initialQty: 10
      }

      const result = bchjs.SLP.TokenType1.generateGenesisOpReturn(configObj)
      // console.log(`result: `, result)

      assert.equal(Buffer.isBuffer(result), true)
    })

    it('should work if user does not specify doc hash', () => {
      const configObj = {
        name: 'SLP Test Token',
        ticker: 'SLPTEST',
        documentUrl: 'https://bchjs.cash',
        decimals: 8,
        initialQty: 10
      }

      const result = bchjs.SLP.TokenType1.generateGenesisOpReturn(configObj)
      // console.log(`result: `, result)

      assert.equal(Buffer.isBuffer(result), true)
    })
  })

  describe('#generateMintOpReturn', () => {
    it('should throw error if tokenUtxos is not an array.', () => {
      try {
        bchjs.SLP.TokenType1.generateMintOpReturn({}, 100)

        assert.equal(true, false, 'Unexpected result.')
      } catch (err) {
        assert.include(
          err.message,
          'tokenUtxos must be an array',
          'Expected error message.'
        )
      }
    })

    it('should throw error if minting baton is not in UTXOs.', () => {
      try {
        const utxos = [
          {
            txid:
              'ccc6d336399e26d98afcd3821b41fb1535cd50f57063ed7593eaed5108659606',
            vout: 1,
            value: '546',
            height: 637618,
            confirmations: 239,
            satoshis: 546,
            utxoType: 'token',
            tokenQty: 100,
            tokenId:
              'ccc6d336399e26d98afcd3821b41fb1535cd50f57063ed7593eaed5108659606',
            tokenTicker: 'SLPTEST',
            tokenName: 'SLP Test Token',
            tokenDocumentUrl: 'https://FullStack.cash',
            tokenDocumentHash: '',
            decimals: 8,
            isValid: true
          }
        ]

        bchjs.SLP.TokenType1.generateMintOpReturn(utxos, 100)

        assert.equal(true, false, 'Unexpected result.')
      } catch (err) {
        assert.include(
          err.message,
          'Minting baton could not be found in tokenUtxos array',
          'Expected error message.'
        )
      }
    })

    it('should throw error if tokenId is not included in minting-baton UTXO.', () => {
      try {
        const utxos = [
          {
            txid:
              '9d35c1803ed3ab8bd23c198b027f7b3b530586494dc265de6391b74a6b090136',
            vout: 2,
            value: '546',
            height: 637625,
            confirmations: 207,
            satoshis: 546,
            utxoType: 'minting-baton',
            tokenTicker: 'SLPTEST',
            tokenName: 'SLP Test Token',
            tokenDocumentUrl: 'https://FullStack.cash',
            tokenDocumentHash: '',
            decimals: 8,
            isValid: true
          }
        ]

        bchjs.SLP.TokenType1.generateMintOpReturn(utxos, 100)

        assert.equal(true, false, 'Unexpected result.')
      } catch (err) {
        assert.include(
          err.message,
          'tokenId property not found in mint-baton UTXO',
          'Expected error message.'
        )
      }
    })

    it('should throw error if decimals is not included in minting-baton UTXO.', () => {
      try {
        const utxos = [
          {
            txid:
              '9d35c1803ed3ab8bd23c198b027f7b3b530586494dc265de6391b74a6b090136',
            vout: 2,
            value: '546',
            height: 637625,
            confirmations: 207,
            satoshis: 546,
            utxoType: 'minting-baton',
            tokenId:
              '9d35c1803ed3ab8bd23c198b027f7b3b530586494dc265de6391b74a6b090136',
            tokenTicker: 'SLPTEST',
            tokenName: 'SLP Test Token',
            tokenDocumentUrl: 'https://FullStack.cash',
            tokenDocumentHash: '',
            isValid: true
          }
        ]

        bchjs.SLP.TokenType1.generateMintOpReturn(utxos, 100)

        assert.equal(true, false, 'Unexpected result.')
      } catch (err) {
        assert.include(
          err.message,
          'decimals property not found in mint-baton UTXO',
          'Expected error message.'
        )
      }
    })

    it('should generate genesis OP_RETURN code', () => {
      const tokenUtxo = [
        {
          txid:
            '9d35c1803ed3ab8bd23c198b027f7b3b530586494dc265de6391b74a6b090136',
          vout: 2,
          value: '546',
          height: 637625,
          confirmations: 207,
          satoshis: 546,
          utxoType: 'minting-baton',
          tokenId:
            '9d35c1803ed3ab8bd23c198b027f7b3b530586494dc265de6391b74a6b090136',
          tokenTicker: 'SLPTEST',
          tokenName: 'SLP Test Token',
          tokenDocumentUrl: 'https://FullStack.cash',
          tokenDocumentHash: '',
          decimals: 8,
          isValid: true
        }
      ]

      const result = bchjs.SLP.TokenType1.generateMintOpReturn(tokenUtxo, 100)
      // console.log(`result: `, result)

      assert.equal(Buffer.isBuffer(result), true)
    })
  })

  describe('#getHexOpReturn', () => {
    it('should return OP_RETURN object ', async () => {
      const tokenUtxos = [
        {
          tokenId:
            '0a321bff9761f28e06a268b14711274bb77617410a16807bd0437ef234a072b1',
          decimals: 0,
          tokenQty: 2
        }
      ]

      const sendQty = 1.5

      sandbox.stub(bchjs.SLP.TokenType1.axios, 'post').resolves({
        data: {
          script:
            '6a04534c500001010453454e44200a321bff9761f28e06a268b14711274bb77617410a16807bd0437ef234a072b1080000000000000001080000000000000000',
          outputs: 2
        }
      })

      const result = await bchjs.SLP.TokenType1.getHexOpReturn(
        tokenUtxos,
        sendQty
      )
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'script')
      assert.isString(result.script)

      assert.property(result, 'outputs')
      assert.isNumber(result.outputs)
    })
  })
})
