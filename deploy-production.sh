# Triggers a webhook to update the staging server at staging.fullstack.cash.

#!/bin/bash
#echo $DEPLOY_SECRET

echo "Deploy to production...."

export DATA="{\"ref\":\"$DEPLOY_SECRET\"}"

#echo $DATA

curl -X POST http://fullstack.cash:9000/hooks/bch-js -H "Content-Type: application/json" -d $DATA

echo "...Finished deploying to production."
