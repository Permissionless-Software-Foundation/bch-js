const assert = require("chai").assert
// const axios = require("axios")
const sinon = require("sinon")

const BCHJS = require("../../src/bch-js")
const bchjs = new BCHJS()

// const mockData = require("./fixtures/electrumx-mock")

describe(`#IPFS`, () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  describe("#initUppy", () => {
    it("should initialize uppy", () => {
      bchjs.IPFS.initUppy()

      // console.log(`bchjs.IPFS.uppy: `, bchjs.IPFS.uppy)
    })
  })

  describe("#upload", () => {
    it("should throw an error if file does not exist", async () => {
      try {
        const path = "/non-existant-file"

        await bchjs.IPFS.upload(path)

        assert.equal(true, false, "Unexpected result")
      } catch (err) {
        console.log(`err.message: ${err.message}`)
      }
    })

    it("should do something", async () => {
      const path = `/home/trout/work/personal/bch-js/test/unit/ipfs.js`

      await bchjs.IPFS.upload(path)
    })
  })
})
