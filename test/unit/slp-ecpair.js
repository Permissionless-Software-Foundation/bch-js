const fixtures = require("./fixtures/slp/ecpair.json")
const assert = require("assert")

const SLP = require("../../src/slp/slp")
const slp = new SLP({ restURL: "http://fakeurl.com/" })

describe("#SLP ECPair", () => {
  describe("#toSLPAddress", () => {
    it(`should return slp address for ecpair`, async () => {
      fixtures.wif.forEach((wif, index) => {
        const ecpair = slp.ECPair.fromWIF(wif)
        const slpAddr = slp.ECPair.toSLPAddress(ecpair)
        assert.equal(slpAddr, fixtures.address[index])
      })
    })
  })
})
