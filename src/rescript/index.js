const BchRe = require("./BchRe.bs")

class BCHJS {
    constructor(config){
        let bchjs =  BchRe.BCHJS.make(config)
        // console.log("bchjs object:", bchjs)
        return bchjs
    }
}

module.exports = BCHJS