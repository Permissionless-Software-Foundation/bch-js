/*
  TODO
  - Add blockhash functionality back into getTxOutProof
*/

const axios = require('axios')

let _this

class Blockchain {
  constructor (config) {
    this.restURL = config.restURL
    this.apiToken = config.apiToken
    this.authToken = config.authToken

    if (this.authToken) {
      // Add Basic Authentication token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: this.authToken
        }
      }
    } else {
      // Add JWT token to the authorization header.
      this.axiosOptions = {
        headers: {
          authorization: `Token ${this.apiToken}`
        }
      }
    }

    _this = this
  }

  /**
   * @api Blockchain.getBestBlockHash() getBestBlockHash()
   * @apiName getBestBlockHash
   * @apiGroup Blockchain
   * @apiDescription
   * Returns the hash of the best (tip) block in the longest blockchain.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getBestBlockHash = await bchjs.Blockchain.getBestBlockHash();
   * console.log(getBestBlockHash);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   * // 241decef88889efac8e6ce428a8ac696fdde5972eceed97e1fb58d6106af31d5
   */
  async getBestBlockHash () {
    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getBestBlockHash`,
        _this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getBlock() getBlock()
   * @apiName getBlock
   * @apiGroup Blockchain
   * @apiDescription
   * If verbose is false, returns a string that is serialized, hex-encoded data for block 'hash'. If verbose is true, returns an Object with information about block hash.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getBlock = await bchjs.Blockchain.getBlock("00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09");
   * console.log(getBlock);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // { hash: '00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09',
   * // confirmations: 528236,
   * // size: 216,
   * // height: 1000,
   * // version: 1,
   * // versionHex: '00000001',
   * // merkleroot: 'fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33',
   * // tx:
   * //  [ 'fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33' ],
   * // time: 1232346882,
   * // mediantime: 1232344831,
   * // nonce: 2595206198,
   * // bits: '1d00ffff',
   * // difficulty: 1,
   * // chainwork: '000000000000000000000000000000000000000000000000000003e903e903e9',
   * // previousblockhash: '0000000008e647742775a230787d66fdf92c46a48c896bfbc85cdc8acc67e87d',
   * // nextblockhash: '00000000a2887344f8db859e372e7e4bc26b23b9de340f725afbf2edb265b4c6' }
   */
  async getBlock (blockhash, verbose = true) {
    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getBlock/${blockhash}?verbose=${verbose}`,
        _this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getBlockchainInfo() getBlockchainInfo()
   * @apiName getBlockchainInfo
   * @apiGroup Blockchain
   * @apiDescription
   * Returns an object containing various state info regarding blockchain processing.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getBlockchainInfo = await bchjs.Blockchain.getBlockchainInfo();
   * console.log(getBlockchainInfo);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // { chain: 'main',
   * // blocks: 529235,
   * // headers: 529235,
   * // bestblockhash: '00000000000000000108641af52e01a447b1f9d801571f93a0f20a8cbf80c236',
   * // difficulty: 702784497476.8376,
   * // mediantime: 1525727823,
   * // verificationprogress: 0.9999892037620548,
   * // chainwork: '00000000000000000000000000000000000000000099f5e1cf7d4e462a493a51',
   * // pruned: false,
   * // softforks:
   * //  [ { id: 'bip34', version: 2, reject: [Object] },
   * //    { id: 'bip66', version: 3, reject: [Object] },
   * //    { id: 'bip65', version: 4, reject: [Object] } ],
   * // bip9_softforks:
   * //  { csv:
   * //     { status: 'active',
   * //       startTime: 1462060800,
   * //       timeout: 1493596800,
   * //       since: 419328 } } }
   */
  async getBlockchainInfo () {
    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getBlockchainInfo`,
        _this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getBlockCount() getBlockCount()
   * @apiName getBlockCount
   * @apiGroup Blockchain
   * @apiDescription
   * Returns the number of blocks in the longest blockchain.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getBlockCount = await bchjs.Blockchain.getBlockCount();
   * console.log(getBlockCount);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   * // 529235
   */
  async getBlockCount () {
    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getBlockCount`,
        _this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getBlockHash() getBlockHash()
   * @apiName getBlockHash
   * @apiGroup Blockchain
   * @apiDescription
   * Returns hash of block in best-block-chain at height provided.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getBlockHash = await bchjs.Blockchain.getBlockHash([0]);
   * console.log(getBlockHash);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   * // [ '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f' ]
   */
  async getBlockHash (height = 1) {
    if (typeof height !== 'string') height = JSON.stringify(height)

    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getBlockHash/${height}`,
        _this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getBlockHeader() getBlockHeader()
   * @apiName getBlockHeader
   * @apiGroup Blockchain
   * @apiDescription
   * If verbose is false, returns a string that is serialized, hex-encoded data for blockheader 'hash'. If verbose is true, returns an Object with information about blockheader hash.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getBlockHeader = await bchjs.Blockchain.getBlockHeader(["00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"]);
   * console.log(getBlockHeader);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // [{ hash: '00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09',
   * // confirmations: 528236,
   * // height: 1000,
   * // version: 1,
   * // versionHex: '00000001',
   * // merkleroot: 'fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33',
   * // time: 1232346882,
   * // mediantime: 1232344831,
   * // nonce: 2595206198,
   * // bits: '1d00ffff',
   * // difficulty: 1,
   * // chainwork: '000000000000000000000000000000000000000000000000000003e903e903e9',
   * // previousblockhash: '0000000008e647742775a230787d66fdf92c46a48c896bfbc85cdc8acc67e87d',
   * // nextblockhash: '00000000a2887344f8db859e372e7e4bc26b23b9de340f725afbf2edb265b4c6' }]
   */
  async getBlockHeader (hash, verbose = true) {
    try {
      // Handle single hash.
      if (typeof hash === 'string') {
        const response = await axios.get(
          `${this.restURL}blockchain/getBlockHeader/${hash}?verbose=${verbose}`,
          _this.axiosOptions
        )

        return response.data

        // Handle array of hashes.
      } else if (Array.isArray(hash)) {
        // Dev note: must use axios.post for unit test stubbing.
        const response = await axios.post(
          `${this.restURL}blockchain/getBlockHeader`,
          {
            hashes: hash,
            verbose: verbose
          },
          _this.axiosOptions
        )

        return response.data
      }

      throw new Error('Input hash must be a string or array of strings.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getChainTips() getChainTips()
   * @apiName getChainTips
   * @apiGroup Blockchain
   * @apiDescription
   * Return information about all known tips in the block tree, including the main chain as well as orphaned branches.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getChainTips = await bchjs.Blockchain.getChainTips();
   * console.log(getChainTips);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // [ { height: 529235,
   * //   hash: '00000000000000000108641af52e01a447b1f9d801571f93a0f20a8cbf80c236',
   * //   branchlen: 0,
   * //   status: 'active' },
   * // { height: 527442,
   * //   hash: '0000000000000000014cbf7b7aa12e52dd97db4b1ba5f39dccae37773af9272e',
   * //   branchlen: 1,
   * //   status: 'invalid' },
   * // { height: 526861,
   * //   hash: '00000000000000000225b070818bbafd95842ecbd25edf39bff54a7aa5c8fd10',
   * //   branchlen: 1,
   * //   status: 'valid-headers' } ]
   */
  async getChainTips () {
    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getChainTips`,
        _this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getDifficulty() getDifficulty()
   * @apiName getDifficulty
   * @apiGroup Blockchain
   * @apiDescription
   * Returns the proof-of-work difficulty as a multiple of the minimum difficulty.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getDifficulty = await bchjs.Blockchain.getDifficulty();
   * console.log(getDifficulty);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // 702784497476.8376
   */
  async getDifficulty () {
    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getDifficulty`,
        _this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  // getMempoolAncestors
  async getMempoolAncestors (txid, verbose = false) {
    if (typeof txid !== 'string') txid = JSON.stringify(txid)

    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getMempoolAncestors/${txid}?verbose=${verbose}`,
        _this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getMempoolDescendants (txid, verbose = false) {
    if (typeof txid !== 'string') txid = JSON.stringify(txid)

    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getMempoolDescendants/${txid}?verbose=${verbose}`,
        _this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getMempoolEntry() getMempoolEntry()
   * @apiName getMempoolEntry
   * @apiGroup Blockchain
   * @apiDescription
   * Returns mempool data for given transaction.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getMempoolEntry = await bchjs.Blockchain.getMempoolEntry("fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33");
   * console.log(getMempoolEntry);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // {
   * //   "size": 372,
   * //   "fee": 0.00000374,
   * //   "modifiedfee": 0.00000374,
   * //   "time": 1547738850,
   * //   "height": 565716,
   * //   "startingpriority": 26524545.3974359,
   * //   "currentpriority": 26524545.3974359,
   * //   "descendantcount": 1,
   * //   "descendantsize": 372,
   * //   "descendantfees": 374,
   * //   "ancestorcount": 1,
   * //   "ancestorsize": 372,
   * //   "ancestorfees": 374,
   * //   "depends": []
   * // }
   *
   * (async () => {
   * try {
   * let getMempoolEntry = await bchjs.Blockchain.getMempoolEntry([
   *   "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33",
   *   "defea04c38ee00cf73ad402984714ed22dc0dd99b2ae5cb50d791d94343ba79b"
   *   ]);
   * console.log(getMempoolEntry);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // [
   * //   {
   * //     "size": 372,
   * //     "fee": 0.00000374,
   * //     "modifiedfee": 0.00000374,
   * //     "time": 1547738850,
   * //     "height": 565716,
   * //     "startingpriority": 26524545.3974359,
   * //     "currentpriority": 26524545.3974359,
   * //     "descendantcount": 1,
   * //     "descendantsize": 372,
   * //     "descendantfees": 374,
   * //     "ancestorcount": 1,
   * //     "ancestorsize": 372,
   * //     "ancestorfees": 374,
   * //     "depends": []
   * //   },
   * //   {
   * //     "size": 372,
   * //     "fee": 0.00000374,
   * //     "modifiedfee": 0.00000374,
   * //     "time": 1547738850,
   * //     "height": 565716,
   * //     "startingpriority": 26524545.3974359,
   * //     "currentpriority": 26524545.3974359,
   * //     "descendantcount": 1,
   * //     "descendantsize": 372,
   * //     "descendantfees": 374,
   * //     "ancestorcount": 1,
   * //     "ancestorsize": 372,
   * //     "ancestorfees": 374,
   * //     "depends": []
   * //   }
   * // ]
   */
  async getMempoolEntry (txid) {
    // if (typeof txid !== "string") txid = JSON.stringify(txid)

    try {
      if (typeof txid === 'string') {
        const response = await axios.get(
          `${this.restURL}blockchain/getMempoolEntry/${txid}`,
          _this.axiosOptions
        )

        return response.data
      } else if (Array.isArray(txid)) {
        // Dev note: must use axios.post for unit test stubbing.
        const response = await axios.post(
          `${this.restURL}blockchain/getMempoolEntry`,
          {
            txids: txid
          },
          _this.axiosOptions
        )

        return response.data
      }

      throw new Error('Input must be a string or array of strings.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getMempoolInfo() getMempoolInfo()
   * @apiName getMempoolInfo
   * @apiGroup Blockchain
   * @apiDescription
   * Returns details on the active state of the TX memory pool.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getMempoolInfo = await bchjs.Blockchain.getMempoolInfo();
   * console.log(getMempoolInfo);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // { size: 257,
   * // bytes: 98257,
   * // usage: 365840,
   * // maxmempool: 300000000,
   * // mempoolminfee: 0 }
   */
  async getMempoolInfo () {
    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getMempoolInfo`,
        _this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getRawMempool() getRawMempool()
   * @apiName getRawMempool
   * @apiGroup Blockchain
   * @apiDescription
   * Returns all transaction ids in memory pool as a json array of string transaction ids.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getRawMempool = await bchjs.Blockchain.getRawMempool(true);
   * console.log(getRawMempool);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // [  {'2ae541af20db6f2b50410f418af56e349d08877d685f6cf54df54658e892db7a':
   * //  { size: 237,
   * //    fee: 0.00000238,
   * //    modifiedfee: 0.00000238,
   * //    time: 1525732015,
   * //    height: 529235,
   * //    startingpriority: 0,
   * //    currentpriority: 0,
   * //    descendantcount: 10,
   * //    descendantsize: 2376,
   * //    descendantfees: 2380,
   * //    ancestorcount: 3,
   * //    ancestorsize: 712,
   * //    ancestorfees: 714,
   * //    depends:
   * //     [ 'e25682caafc7000645d59f4c11d8d594b2943979b9d8fafb9f946e2b35c21b7e' ] },]
   */
  async getRawMempool (verbose = false) {
    try {
      const response = await axios.get(
        `${this.restURL}blockchain/getRawMempool?vebose=${verbose}`,
        _this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getTxOut() getTxOut()
   * @apiName getTxOut
   * @apiGroup Blockchain
   * @apiDescription
   * Returns details about an unspent transaction output.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getTxOut = await bchjs.Blockchain.getTxOut("e25682caafc7000645d59f4c11d8d594b2943979b9d8fafb9f946e2b35c21b7e", 1);
   * console.log(getTxOut);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // null
   */
  async getTxOut (txid, n, includeMempool = true) {
    try {
      // Input validation
      if (typeof txid !== 'string' || txid.length !== 64) {
        throw new Error('txid needs to be a proper transaction ID')
      }

      if (isNaN(n)) throw new Error('n must be an integer')

      if (typeof includeMempool !== 'boolean') {
        throw new Error('includeMempool input must be of type boolean')
      }

      // Send the request to the REST API.
      // const response = await axios.get(
      //   `${this.restURL}blockchain/getTxOut/${txid}/${n}?includeMempool=${includeMempool}`,
      //   _this.axiosOptions
      // )
      const response = await axios.post(
        `${this.restURL}blockchain/getTxOut`,
        {
          txid: txid,
          vout: n,
          mempool: includeMempool
        },
        _this.axiosOptions
      )

      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.getTxOutProof() getTxOutProof()
   * @apiName getTxOutProof
   * @apiGroup Blockchain
   * @apiDescription
   * Returns a hex-encoded proof that "txid" was included in a block.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * let getTxOutProof = await bchjs.Blockchain.getTxOutProof("e25682caafc7000645d59f4c11d8d594b2943979b9d8fafb9f946e2b35c21b7e");
   * console.log(getTxOutProof);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // "0000002086a4a3161f9ba2174883ec0b93acceac3b2f37b36ed1f90000000000000000009cb02406d1094ecf3e0b4c0ca7c585125e721147c39daf6b48c90b512741e13a12333e5cb38705180f441d8c7100000008fee9b60f1edb57e5712839186277ed39e0a004a32be9096ee47472efde8eae62f789f9d7a9f59d0ea7093dea1e0c65ff0b953f1d8cf3d47f92e732ca0295f603c272d5f4a63509f7a887f2549d78af7444aa0ecbb4f66d9cbe13bc6a89f59e05a199df8325d490818ffefe6b6321d32d7496a68580459836c0183f89082fc1b491cc91b23ecdcaa4c347bf599a62904d61f1c15b400ebbd5c90149010c139d9c1e31b774b796977393a238080ab477e1d240d0c4f155d36f519668f49bae6bd8cd5b8e40522edf76faa09cca6188d83ff13af6967cc6a569d1a5e9aeb1fdb7f531ddd2d0cbb81879741d5f38166ac1932136264366a4065cc96a42e41f96294f02df01"
   *
   * (async () => {
   * try {
   * let getTxOutProof = await bchjs.Blockchain.getTxOutProof([
   *   "e25682caafc7000645d59f4c11d8d594b2943979b9d8fafb9f946e2b35c21b7e",
   *   "d16662463fd98eb96c8f6898d58a4461ac3d0120f4d0aea601d72b37759f261c"
   * ]);
   * console.log(getTxOutProof);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // [
   * //   "010000007de867cc8adc5cc8fb6b898ca4462cf9fd667d7830a275277447e60800000000338f121232e169d3100edd82004dc2a1f0e1f030c6c488fa61eafa930b0528fe021f7449ffff001d36b4af9a0100000001338f121232e169d3100edd82004dc2a1f0e1f030c6c488fa61eafa930b0528fe0101",
   * //   "010000007de867cc8adc5cc8fb6b898ca4462cf9fd667d7830a275277447e60800000000338f121232e169d3100edd82004dc2a1f0e1f030c6c488fa61eafa930b0528fe021f7449ffff001d36b4af9a0100000001338f121232e169d3100edd82004dc2a1f0e1f030c6c488fa61eafa930b0528fe0101"
   * // ]
   */
  async getTxOutProof (txids) {
    try {
      // Single txid.
      if (typeof txids === 'string') {
        const path = `${this.restURL}blockchain/getTxOutProof/${txids}`
        // if (blockhash) path = `${path}?blockhash=${blockhash}`

        const response = await axios.get(path, _this.axiosOptions)
        return response.data

        // Array of txids.
      } else if (Array.isArray(txids)) {
        // Dev note: must use axios.post for unit test stubbing.
        const response = await axios.post(
          `${this.restURL}blockchain/getTxOutProof`,
          {
            txids: txids
          },
          _this.axiosOptions
        )

        return response.data
      }

      throw new Error('Input must be a string or array of strings.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async preciousBlock (blockhash) {
    try {
      const response = await axios.get(
        `${this.restURL}blockchain/preciousBlock/${blockhash}`,
        _this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async pruneBlockchain (height) {
    try {
      const response = await axios.post(
        `${this.restURL}blockchain/pruneBlockchain/${height}`,
        _this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async verifyChain (checklevel = 3, nblocks = 6) {
    try {
      const response = await axios.get(
        `${this.restURL}blockchain/verifyChain?checklevel=${checklevel}&nblocks=${nblocks}`,
        _this.axiosOptions
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Blockchain.verifyTxOutProof() verifyTxOutProof()
   * @apiName verifyTxOutProof
   * @apiGroup Blockchain
   * @apiDescription
   * Verifies that a proof points to a transaction in a block, returning the transaction it commits to and throwing an RPC error if the block is not in our best chain.
   *
   * @apiExample Example usage:
   * (async () => {
   * try {
   * const proof = "0000002086a4a3161f9ba2174883ec0b93acceac3b2f37b36ed1f90000000000000000009cb02406d1094ecf3e0b4c0ca7c585125e721147c39daf6b48c90b512741e13a12333e5cb38705180f441d8c7100000008fee9b60f1edb57e5712839186277ed39e0a004a32be9096ee47472efde8eae62f789f9d7a9f59d0ea7093dea1e0c65ff0b953f1d8cf3d47f92e732ca0295f603c272d5f4a63509f7a887f2549d78af7444aa0ecbb4f66d9cbe13bc6a89f59e05a199df8325d490818ffefe6b6321d32d7496a68580459836c0183f89082fc1b491cc91b23ecdcaa4c347bf599a62904d61f1c15b400ebbd5c90149010c139d9c1e31b774b796977393a238080ab477e1d240d0c4f155d36f519668f49bae6bd8cd5b8e40522edf76faa09cca6188d83ff13af6967cc6a569d1a5e9aeb1fdb7f531ddd2d0cbb81879741d5f38166ac1932136264366a4065cc96a42e41f96294f02df01"
   * let verifyTxOutProof = await bchjs.Blockchain.verifyTxOutProof(proof);
   * console.log(verifyTxOutProof);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // [
   * //   "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7"
   * // ]
   *
   * (async () => {
   * try {
   * const proof = "0000002086a4a3161f9ba2174883ec0b93acceac3b2f37b36ed1f90000000000000000009cb02406d1094ecf3e0b4c0ca7c585125e721147c39daf6b48c90b512741e13a12333e5cb38705180f441d8c7100000008fee9b60f1edb57e5712839186277ed39e0a004a32be9096ee47472efde8eae62f789f9d7a9f59d0ea7093dea1e0c65ff0b953f1d8cf3d47f92e732ca0295f603c272d5f4a63509f7a887f2549d78af7444aa0ecbb4f66d9cbe13bc6a89f59e05a199df8325d490818ffefe6b6321d32d7496a68580459836c0183f89082fc1b491cc91b23ecdcaa4c347bf599a62904d61f1c15b400ebbd5c90149010c139d9c1e31b774b796977393a238080ab477e1d240d0c4f155d36f519668f49bae6bd8cd5b8e40522edf76faa09cca6188d83ff13af6967cc6a569d1a5e9aeb1fdb7f531ddd2d0cbb81879741d5f38166ac1932136264366a4065cc96a42e41f96294f02df01"
   * let verifyTxOutProof = await bchjs.Blockchain.verifyTxOutProof([proof, proof]);
   * console.log(verifyTxOutProof);
   * } catch(error) {
   * console.error(error)
   * }
   * })()
   *
   * // [
   * //   "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7",
   * //   "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7"
   * // ]
   */
  async verifyTxOutProof (proof) {
    try {
      // Single block
      if (typeof proof === 'string') {
        const response = await axios.get(
          `${this.restURL}blockchain/verifyTxOutProof/${proof}`,
          _this.axiosOptions
        )
        return response.data

        // Array of hashes.
      } else if (Array.isArray(proof)) {
        // Dev note: must use axios.post for unit test stubbing.
        const response = await axios.post(
          `${this.restURL}blockchain/verifyTxOutProof`,
          {
            proofs: proof
          },
          _this.axiosOptions
        )

        return response.data
      }

      throw new Error('Input must be a string or array of strings.')
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = Blockchain
