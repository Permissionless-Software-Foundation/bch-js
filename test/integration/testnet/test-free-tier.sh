#!/bin/bash

export RESTURL=https://free-test.fullstack.cash/v4/
export NETWORK=testnet
export IS_USING_FREE_TIER=true

cd test/integration/testnet/
mocha --timeout 30000 blockchain.js control.js electrumx.js rawtransaction.js slp.js util.js
#mocha --timeout 30000 blockchain.js
