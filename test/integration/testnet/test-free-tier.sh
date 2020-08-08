#!/bin/bash

export RESTURL=https://free-test.fullstack.cash/v3/
export NETWORK=testnet
#export RESTURL=http://localhost:3000/v3/

cd test/integration/testnet/
mocha --timeout 30000 blockchain.js control.js electrumx.js openbazaar.js rawtransaction.js slp.js util.js
#mocha --timeout 30000 blockchain.js
