#!/bin/bash

export RESTURL=https://bchn-free-main.fullstack.cash/v3/
#export RESTURL=http://localhost:3000/v3/
export IS_USING_FREE_TIER=true

cd test/integration/bchn/
mocha --timeout 30000 blockchain.js control.js electrumx.js ninsight.js openbazaar.js price.js rawtransaction.js slp.js util.js
