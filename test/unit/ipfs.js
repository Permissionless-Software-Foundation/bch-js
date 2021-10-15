/*
  Unit tests for the IPFS Class.
*/

const assert = require('chai').assert
const sinon = require('sinon')
const BCHJS = require('../../src/bch-js')
let bchjs

const mockData = require('./fixtures/ipfs-mock')

describe('#IPFS', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    bchjs = new BCHJS()
  })

  afterEach(() => sandbox.restore())

  describe('#initUppy', () => {
    it('should initialize uppy', () => {
      bchjs.IPFS.initUppy()
    })
  })

  describe('#createFileModelServer', () => {
    it('should throw an error if file does not exist', async () => {
      try {
        const path = '/non-existant-file'

        await bchjs.IPFS.createFileModelServer(path)

        assert.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(`err.message: ${err.message}`)
        assert.include(err.message, 'Could not find this file')
      }
    })

    it('should create a new file model', async () => {
      const path = `${__dirname.toString()}/ipfs.js`

      sandbox
        .stub(bchjs.IPFS.axios, 'post')
        .resolves({ data: mockData.mockNewFileModel })

      const result = await bchjs.IPFS.createFileModelServer(path)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'success')
      assert.equal(result.success, true)

      assert.property(result, 'hostingCostBCH')
      assert.property(result, 'hostingCostUSD')
      assert.property(result, 'file')

      assert.property(result.file, 'payloadLink')
      assert.property(result.file, 'hasBeenPaid')
      assert.property(result.file, '_id')
      assert.property(result.file, 'schemaVersion')
      assert.property(result.file, 'size')
      assert.property(result.file, 'fileName')
      assert.property(result.file, 'fileExtension')
      assert.property(result.file, 'createdTimestamp')
      assert.property(result.file, 'hostingCost')
      assert.property(result.file, 'walletIndex')
      assert.property(result.file, 'bchAddr')
    })
  })

  describe('#uploadFileServer', () => {
    it('should throw an error if file does not exist', async () => {
      try {
        const path = '/non-existant-file'

        await bchjs.IPFS.uploadFileServer(path)

        assert.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(`err.message: ${err.message}`)
        assert.include(err.message, 'Could not find this file')
      }
    })

    it('should throw an error if modelId is not included', async () => {
      try {
        const path = `${__dirname.toString()}/ipfs.js`

        await bchjs.IPFS.uploadFileServer(path)

        assert.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(`err.message: ${err.message}`)
        assert.include(err.message, 'Must include a file model ID')
      }
    })

    it('Should throw error if the file was not uploaded', async () => {
      try {
        const mock = {
          successful: [],
          failed: [
            {
              id: 'file id'
            }
          ]
        }
        sandbox.stub(bchjs.IPFS.uppy, 'upload').resolves(mock)

        const path = `${__dirname.toString()}/ipfs.js`
        await bchjs.IPFS.uploadFileServer(path, '5ec562319bfacc745e8d8a52')

        assert.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(err)
        assert.include(err.message, 'The file could not be uploaded')
      }
    })

    it('should return file object if the file is uploaded', async () => {
      try {
        sandbox.stub(bchjs.IPFS.uppy, 'upload').resolves(mockData.uploadData)

        const path = `${__dirname.toString()}/ipfs.js`
        const result = await bchjs.IPFS.uploadFileServer(
          path,
          '5ec562319bfacc745e8d8a52'
        )
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)

        assert.property(result, 'schemaVersion')
        assert.property(result, 'size')
        assert.property(result, 'fileId')
        assert.property(result, 'fileName')
        assert.property(result, 'fileExtension')
      } catch (err) {
        // console.log(err)
        assert.equal(true, false, 'Unexpected result')
      }
    })
  })

  describe('#getStatus', () => {
    it('should throw an error if modelId is not included', async () => {
      try {
        await bchjs.IPFS.getStatus()

        assert.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(`err.message: ${err.message}`)
        assert.include(err.message, 'Must include a file model ID')
      }
    })

    it('should get data on an unpaid file', async () => {
      const modelId = '5ec7392c2acfe57aa62e945a'

      sandbox
        .stub(bchjs.IPFS.axios, 'get')
        .resolves({ data: mockData.unpaidFileData })

      const result = await bchjs.IPFS.getStatus(modelId)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'hasBeenPaid')
      assert.property(result, 'satCost')
      assert.property(result, 'bchAddr')
      assert.property(result, 'ipfsHash')
      assert.property(result, 'fileId')
      assert.property(result, 'fileName')
    })

    it('should get data on an unpaid file', async () => {
      const modelId = '5ec7392c2acfe57aa62e945a'

      sandbox
        .stub(bchjs.IPFS.axios, 'get')
        .resolves({ data: mockData.paidFileData })

      const result = await bchjs.IPFS.getStatus(modelId)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'hasBeenPaid')
      assert.property(result, 'satCost')
      assert.property(result, 'bchAddr')
      assert.property(result, 'ipfsHash')
      assert.property(result, 'fileId')
      assert.property(result, 'fileName')
    })
  })

  describe('#createFileModelWeb', () => {
    it('should throw an error if file is undefined', async () => {
      try {
        let file

        await bchjs.IPFS.createFileModelWeb(file)

        assert.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(`err.message: ${err.message}`)
        assert.include(err.message, 'File is required')
      }
    })
    it('should throw an error if file is empty', async () => {
      try {
        const file = {}

        await bchjs.IPFS.createFileModelWeb(file)

        assert.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(`err.message: ${err.message}`)
        assert.include(
          err.message,
          'File should have the property \'name\' of string type'
        )
      }
    })
    it("should throw an error if 'name' property is not included", async () => {
      try {
        const file = {
          size: 5000
        }

        await bchjs.IPFS.createFileModelWeb(file)

        assert.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(`err.message: ${err.message}`)
        assert.include(
          err.message,
          'File should have the property \'name\' of string type'
        )
      }
    })

    it("should throw an error if 'size' property is not included", async () => {
      try {
        const file = {
          name: 'ipfs.js'
        }

        await bchjs.IPFS.createFileModelWeb(file)

        assert.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(`err.message: ${err.message}`)
        assert.include(
          err.message,
          'File should have the property \'size\' of number type'
        )
      }
    })

    it('should create a new file model', async () => {
      const file = {
        name: 'ipfs.js',
        size: 5000,
        type: 'text/plain'
      }
      sandbox
        .stub(bchjs.IPFS.axios, 'post')
        .resolves({ data: mockData.mockNewFileModel })

      const result = await bchjs.IPFS.createFileModelWeb(file)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, 'success')
      assert.equal(result.success, true)

      assert.property(result, 'hostingCostBCH')
      assert.property(result, 'hostingCostUSD')
      assert.property(result, 'file')

      assert.property(result.file, 'payloadLink')
      assert.property(result.file, 'hasBeenPaid')
      assert.property(result.file, '_id')
      assert.property(result.file, 'schemaVersion')
      assert.property(result.file, 'size')
      assert.property(result.file, 'fileName')
      assert.property(result.file, 'fileExtension')
      assert.property(result.file, 'createdTimestamp')
      assert.property(result.file, 'hostingCost')
      assert.property(result.file, 'walletIndex')
      assert.property(result.file, 'bchAddr')
    })
  })

  describe('#uploadFileWeb', () => {
    it('should throw an error if file is undefined', async () => {
      try {
        let file

        await bchjs.IPFS.uploadFileWeb(file)

        assert.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(`err.message: ${err.message}`)
        assert.include(err.message, 'File is required')
      }
    })
    it('should throw an error if file is empty', async () => {
      try {
        const file = {}

        await bchjs.IPFS.uploadFileWeb(file)

        assert.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(`err.message: ${err.message}`)
        assert.include(
          err.message,
          'File should have the property \'name\' of string type'
        )
      }
    })
    it("should throw an error if 'name' property is not included", async () => {
      try {
        const file = {
          size: 5000,
          type: 'text/plain'
        }

        await bchjs.IPFS.uploadFileWeb(file)

        assert.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(`err.message: ${err.message}`)
        assert.include(
          err.message,
          'File should have the property \'name\' of string type'
        )
      }
    })
    it("should throw an error if 'size' property is not included", async () => {
      try {
        const file = {
          name: 'ipfs.js',
          type: 'text/plain'
        }

        await bchjs.IPFS.uploadFileWeb(file)

        assert.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(`err.message: ${err.message}`)
        assert.include(
          err.message,
          'File should have the property \'size\' of number type'
        )
      }
    })
    it("should throw an error if 'type' property is not included", async () => {
      try {
        const file = {
          name: 'ipfs.js',
          size: 5000
        }

        await bchjs.IPFS.uploadFileWeb(file)

        assert.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(`err.message: ${err.message}`)
        assert.include(
          err.message,
          'File should have the property \'type\' of string type'
        )
      }
    })
    it('should throw an error if modelId is not included', async () => {
      try {
        const file = {
          name: 'ipfs.js',
          size: 5000,
          type: 'text/plain'
        }
        await bchjs.IPFS.uploadFileWeb(file)

        assert.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(`err.message: ${err.message}`)
        assert.include(err.message, 'Must include a file model ID')
      }
    })

    it('Should throw error if the file was not uploaded', async () => {
      try {
        const mock = {
          successful: [],
          failed: [
            {
              id: 'file id'
            }
          ]
        }
        sandbox.stub(bchjs.IPFS.uppy, 'upload').resolves(mock)

        const file = {
          name: 'ipfs.js',
          size: 5000,
          type: 'text/plain'
        }
        await bchjs.IPFS.uploadFileWeb(file, '5ec562319bfacc745e8d8a52')

        assert.equal(true, false, 'Unexpected result')
      } catch (err) {
        // console.log(err)
        assert.include(err.message, 'The file could not be uploaded')
      }
    })

    it('should return file object if the file is uploaded', async () => {
      try {
        sandbox.stub(bchjs.IPFS.uppy, 'upload').resolves(mockData.uploadData)

        const file = {
          name: 'ipfs.js',
          size: 5000,
          type: 'text/plain'
        }
        const result = await bchjs.IPFS.uploadFileWeb(
          file,
          '5ec562319bfacc745e8d8a52'
        )
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)

        assert.property(result, 'schemaVersion')
        assert.property(result, 'size')
        assert.property(result, 'fileId')
        assert.property(result, 'fileName')
        assert.property(result, 'fileExtension')
      } catch (err) {
        // console.log(err)
        assert.equal(true, false, 'Unexpected result')
      }
    })
  })
})
