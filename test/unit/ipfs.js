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

      // console.log(`bchjs.IPFS.uppy: `, bchjs.IPFS.uppy)
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
        await bchjs.IPFS.uploadFile(path)

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
        const result = await bchjs.IPFS.uploadFile(path)
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

  describe("#getPaymentInfo", () => {
    it("should return payment information", async () => {
      sandbox
        .stub(bchjs.IPFS.axios, "post")
        .resolves({ data: mockData.paymentInfo })

      const fileObj = {
        schemaVersion: 1,
        size: 2374,
        fileId: "uppy-ipfs/js-1e-application/octet-stream",
        fileName: "ipfs.js",
        fileExtension: "js"
      }

      const result = await bchjs.IPFS.getPaymentInfo(fileObj)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "success")
      assert.property(result, "hostingCostBCH")
      assert.property(result, "hostingCostUSD")
      assert.property(result, "file")
      assert.property(result.file, "payloadLink")
      assert.property(result.file, "hasBeenPaid")
      assert.property(result.file, "_id")
      assert.property(result.file, "schemaVersion")
      assert.property(result.file, "size")
      assert.property(result.file, "fileId")
      assert.property(result.file, "fileName")
      assert.property(result.file, "fileExtension")
      assert.property(result.file, "createdTimestamp")
      assert.property(result.file, "hostingCost")
      assert.property(result.file, "walletIndex")
      assert.property(result.file, "bchAddr")
    })
  })
})
