const assert = require('assert')
const assert2 = require('chai').assert
const axios = require('axios')
const BCHJS = require('../../src/bch-js')
const bchjs = new BCHJS()
const sinon = require('sinon')

const mockData = require('./fixtures/blockchain-mock')

describe('#Blockchain', () => {
  describe('#getBestBlockHash', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())

    it('should get best block hash', done => {
      const resolved = new Promise(resolve =>
        resolve({
          data:
            '0000000000000000005f1f550d3d8b142b684277016ebd00fa29c668606ae52d'
        })
      )
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.Blockchain.getBestBlockHash()
        .then(result => {
          const hash =
            '0000000000000000005f1f550d3d8b142b684277016ebd00fa29c668606ae52d'
          assert.strictEqual(hash, result)
        })
        .then(done, done)
    })
  })

  describe('#getBlock', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())
    const data = {
      hash: '00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09',
      confirmations: 526807,
      size: 216,
      height: 1000,
      version: 1,
      versionHex: '00000001',
      merkleroot:
        'fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33',
      tx: ['fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33'],
      time: 1232346882,
      mediantime: 1232344831,
      nonce: 2595206198,
      bits: '1d00ffff',
      difficulty: 1,
      chainwork:
        '000000000000000000000000000000000000000000000000000003e903e903e9',
      previousblockhash:
        '0000000008e647742775a230787d66fdf92c46a48c896bfbc85cdc8acc67e87d',
      nextblockhash:
        '00000000a2887344f8db859e372e7e4bc26b23b9de340f725afbf2edb265b4c6'
    }

    it('should get block by hash', done => {
      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.Blockchain.getBlock(
        '00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09'
      )
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe('#getBlockchainInfo', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())
    const data = {
      chain: 'main',
      blocks: 527810,
      headers: 527810,
      bestblockhash:
        '000000000000000001d127592d091d4c45062504663c9acab27a1b16c028e3c0',
      difficulty: 576023394804.6666,
      mediantime: 1524878499,
      verificationprogress: 0.9999990106793685,
      chainwork:
        '00000000000000000000000000000000000000000096da5b040913fa09249b4e',
      pruned: false,
      softforks: [
        { id: 'bip34', version: 2, reject: [Object] },
        { id: 'bip66', version: 3, reject: [Object] },
        { id: 'bip65', version: 4, reject: [Object] }
      ],
      bip9_softforks: {
        csv: {
          status: 'active',
          startTime: 1462060800,
          timeout: 1493596800,
          since: 419328
        }
      }
    }

    it('should get blockchain info', done => {
      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.Blockchain.getBlockchainInfo()
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe('#getBlockCount', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())
    const data = 527810

    it('should get block count', done => {
      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.Blockchain.getBlockCount()
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe('#getBlockHash', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())
    const data =
      '000000000000000001d127592d091d4c45062504663c9acab27a1b16c028e3c0'

    it('should get block hash by height', done => {
      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.Blockchain.getBlockHash(527810)
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe('#getBlockHeader', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())
    const data = {
      hash: '000000000000000001d127592d091d4c45062504663c9acab27a1b16c028e3c0',
      confirmations: 1,
      height: 527810,
      version: 536870912,
      versionHex: '20000000',
      merkleroot:
        '9298432bbebe4638456aa19cb7ef91639da87668a285d88d0ecd6080424d223b',
      time: 1524881438,
      mediantime: 1524878499,
      nonce: 3326843941,
      bits: '1801e8a5',
      difficulty: 576023394804.6666,
      chainwork:
        '00000000000000000000000000000000000000000096da5b040913fa09249b4e',
      previousblockhash:
        '000000000000000000b33251708bc7a7b4540e61880d8c376e8e2db6a19a4789'
    }

    it('should get block header by hash', done => {
      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.Blockchain.getBlockHeader(
        '000000000000000001d127592d091d4c45062504663c9acab27a1b16c028e3c0',
        true
      )
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe('#getDifficulty', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())
    const data = '577528469277.1339'

    it('should get difficulty', done => {
      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.Blockchain.getDifficulty()
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe('#getMempoolAncestors', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())
    const data = 'Transaction not in mempool'

    it('should get mempool ancestors', done => {
      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.Blockchain.getMempoolAncestors(
        'daf58932cb91619304dd4cbd03c7202e89ad7d6cbd6e2209e5f64ce3b6ed7c88',
        true
      )
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe('#getMempoolDescendants', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())
    const data = {
      result: 'Transaction not in mempool'
    }

    it('should get mempool descendants', done => {
      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.Blockchain.getMempoolDescendants(
        'daf58932cb91619304dd4cbd03c7202e89ad7d6cbd6e2209e5f64ce3b6ed7c88',
        true
      )
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe('#getMempoolEntry', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())
    const data = {
      result: 'Transaction not in mempool'
    }

    it('should get mempool entry', done => {
      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.Blockchain.getMempoolEntry(
        'daf58932cb91619304dd4cbd03c7202e89ad7d6cbd6e2209e5f64ce3b6ed7c88'
      )
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe('#getMempoolInfo', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())
    const data = {
      result: {
        size: 317,
        bytes: 208583,
        usage: 554944,
        maxmempool: 300000000,
        mempoolminfee: 0
      }
    }

    it('should get mempool info', done => {
      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.Blockchain.getMempoolInfo()
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe('#getRawMempool', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())
    const data = {
      result: {
        transactions: [
          {
            txid:
              'ab36d68dd0a618592fe34e4a898e8beeeb4049133547dbb16f9338384084af96',
            size: 191,
            fee: 0.00047703,
            modifiedfee: 0.00047703,
            time: 1524883317,
            height: 527811,
            startingpriority: 5287822727.272727,
            currentpriority: 5287822727.272727,
            descendantcount: 1,
            descendantsize: 191,
            descendantfees: 47703,
            ancestorcount: 1,
            ancestorsize: 191,
            ancestorfees: 47703,
            depends: []
          }
        ]
      }
    }

    it('should get mempool info', done => {
      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.Blockchain.getRawMempool()
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe('#getTxOut', () => {
    // TODO finish this test
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())
    // const data = {
    //   result: {}
    // }

    it('should throw an error for improper txid.', async () => {
      try {
        await bchjs.Blockchain.getTxOut('badtxid')
      } catch (err) {
        assert2.include(
          err.message,
          'txid needs to be a proper transaction ID'
        )
      }
    })

    it('should throw an error if no vout value is provided.', async () => {
      try {
        await bchjs.Blockchain.getTxOut(
          'daf58932cb91619304dd4cbd03c7202e89ad7d6cbd6e2209e5f64ce3b6ed7c88'
        )
      } catch (err) {
        assert2.include(err.message, 'n must be an integer')
      }
    })

    it('should throw an error if include_mempool is not a boolean', async () => {
      try {
        await bchjs.Blockchain.getTxOut(
          'daf58932cb91619304dd4cbd03c7202e89ad7d6cbd6e2209e5f64ce3b6ed7c88',
          0,
          'bad value'
        )
      } catch (err) {
        assert2.include(
          err.message,
          'includeMempool input must be of type boolean'
        )
      }
    })

    it('should get information on an unspent tx', async () => {
      sandbox.stub(axios, 'post').resolves({ data: mockData.txOutUnspent })

      const result = await bchjs.Blockchain.getTxOut(
        '62a3ea958a463a372bc0caf2c374a7f60be9c624be63a0db8db78f05809df6d8',
        0,
        true
      )
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert2.hasAllKeys(result, [
        'bestblock',
        'confirmations',
        'value',
        'scriptPubKey',
        'coinbase'
      ])
    })

    it('should get information on a spent tx', async () => {
      sandbox.stub(axios, 'post').resolves({ data: null })

      const result = await bchjs.Blockchain.getTxOut(
        '87380e52d151856b23173d6d8a3db01b984c6b50f77ea045a5a1cf4f54497871',
        0,
        true
      )
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert2.equal(result, null)
    })
  })

  describe('#preciousBlock', () => {
    // TODO finish this test
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())
    const data = {
      result: {}
    }

    it('should get TODO', done => {
      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.Blockchain.preciousBlock()
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe('#pruneBlockchain', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())
    const data = 'Cannot prune blocks because node is not in prune mode.'

    it('should prune blockchain', done => {
      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'post').returns(resolved)

      bchjs.Blockchain.pruneBlockchain(507)
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe('#verifyChain', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())
    const data = true

    it('should verify blockchain', done => {
      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.Blockchain.verifyChain(3, 6)
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe('#verifyTxOutProof', () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.createSandbox()))
    afterEach(() => sandbox.restore())
    const data = "proof must be hexadecimal string (not '')"

    it('should verify utxo proof', done => {
      const resolved = new Promise(resolve => resolve({ data: data }))
      sandbox.stub(axios, 'get').returns(resolved)

      bchjs.Blockchain.verifyTxOutProof('3')
        .then(result => {
          assert.deepStrictEqual(data, result)
        })
        .then(done, done)
    })
  })
})
