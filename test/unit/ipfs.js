/*
  Unit tests for the IPFS Class.
*/

const assert = require("chai").assert
const sinon = require("sinon")

const BCHJS = require("../../src/bch-js")
let bchjs

const mockData = require("./fixtures/ipfs-mock")

describe(`#IPFS`, () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    bchjs = new BCHJS()
  })

  afterEach(() => sandbox.restore())

  describe("#initUppy", () => {
    it("should initialize uppy", () => {
      bchjs.IPFS.initUppy()
    })
  })

  describe("#createFileModel", () => {
    it("should throw an error if file does not exist", async () => {
      try {
        const path = "/non-existant-file"

        await bchjs.IPFS.createFileModel(path)

        assert.equal(true, false, "Unexpected result")
      } catch (err) {
        //console.log(`err.message: ${err.message}`)
        assert.include(err.message, `Could not find this file`)
      }
    })

    it("should create a new file model", async () => {
      const path = `${__dirname}/ipfs.js`

      sandbox
        .stub(bchjs.IPFS.axios, "post")
        .resolves({ data: mockData.mockNewFileModel })

      const result = await bchjs.IPFS.createFileModel(path)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "success")
      assert.equal(result.success, true)

      assert.property(result, "hostingCostBCH")
      assert.property(result, "hostingCostUSD")
      assert.property(result, "file")

      assert.property(result.file, "payloadLink")
      assert.property(result.file, "hasBeenPaid")
      assert.property(result.file, "_id")
      assert.property(result.file, "schemaVersion")
      assert.property(result.file, "size")
      assert.property(result.file, "fileName")
      assert.property(result.file, "fileExtension")
      assert.property(result.file, "createdTimestamp")
      assert.property(result.file, "hostingCost")
      assert.property(result.file, "walletIndex")
      assert.property(result.file, "bchAddr")
    })
  })

  describe("#uploadFile", () => {
    it("should throw an error if file does not exist", async () => {
      try {
        const path = "/non-existant-file"

        await bchjs.IPFS.uploadFile(path)

        assert.equal(true, false, "Unexpected result")
      } catch (err) {
        //console.log(`err.message: ${err.message}`)
        assert.include(err.message, `Could not find this file`)
      }
    })

    it("should throw an error if modelId is not included", async () => {
      try {
        const path = `${__dirname}/ipfs.js`

        await bchjs.IPFS.uploadFile(path)

        assert.equal(true, false, "Unexpected result")
      } catch (err) {
        //console.log(`err.message: ${err.message}`)
        assert.include(err.message, `Must include a file model ID`)
      }
    })

    it("Should throw error if the file was not uploaded", async () => {
      try {
        const mock = {
          successful: [],
          failed: [
            {
              id: "file id"
            }
          ]
        }
        sandbox.stub(bchjs.IPFS.uppy, "upload").resolves(mock)

        const path = `${__dirname}/ipfs.js`
        await bchjs.IPFS.uploadFile(path, "5ec562319bfacc745e8d8a52")

        assert.equal(true, false, "Unexpected result")
      } catch (err) {
        //console.log(err)
        assert.include(err.message, `The file could not be uploaded`)
      }
    })

    it("should return file object if the file is uploaded", async () => {
      try {
        sandbox.stub(bchjs.IPFS.uppy, "upload").resolves(mockData.uploadData)

        const path = `${__dirname}/ipfs.js`
        const result = await bchjs.IPFS.uploadFile(
          path,
          "5ec562319bfacc745e8d8a52"
        )
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)

        assert.property(result, "schemaVersion")
        assert.property(result, "size")
        assert.property(result, "fileId")
        assert.property(result, "fileName")
        assert.property(result, "fileExtension")
      } catch (err) {
        //console.log(err)
        assert.equal(true, false, "Unexpected result")
      }
    })
  })

  describe("#getStatus", () => {
    it("should throw an error if modelId is not included", async () => {
      try {
        await bchjs.IPFS.getStatus()

        assert.equal(true, false, "Unexpected result")
      } catch (err) {
        //console.log(`err.message: ${err.message}`)
        assert.include(err.message, `Must include a file model ID`)
      }
    })

    it("should get data on an unpaid file", async () => {
      const modelId = "5ec7392c2acfe57aa62e945a"

      sandbox
        .stub(bchjs.IPFS.axios, "get")
        .resolves({ data: mockData.unpaidFileData })

      const result = await bchjs.IPFS.getStatus(modelId)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "hasBeenPaid")
      assert.property(result, "satCost")
      assert.property(result, "bchAddr")
      assert.property(result, "ipfsHash")
      assert.property(result, "fileId")
      assert.property(result, "fileName")
    })

    it("should get data on an unpaid file", async () => {
      const modelId = "5ec7392c2acfe57aa62e945a"

      sandbox
        .stub(bchjs.IPFS.axios, "get")
        .resolves({ data: mockData.paidFileData })

      const result = await bchjs.IPFS.getStatus(modelId)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "hasBeenPaid")
      assert.property(result, "satCost")
      assert.property(result, "bchAddr")
      assert.property(result, "ipfsHash")
      assert.property(result, "fileId")
      assert.property(result, "fileName")
    })
  })
})
