#!/bin/bash

export RESTURL=https://free-main.fullstack.cash/v3/
#export RESTURL=http://localhost:3000/v3/

cd test/integration/
mocha --timeout 30000 blockchain.js control.js electrumx.js ninsight.js openbazaar.js price.js rawtransaction.js slp.js util.js
