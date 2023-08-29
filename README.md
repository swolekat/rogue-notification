# rogue-notification
small app to notify stream when rogue energy sale happens

Basic idea:
* poll email address every 1 minute. 
* See if one of the emails is a sale
* if it is send a webhook (which can be used by sammi)

# Setup
* `npm i`
* Get credentials.json ( https://github.com/levz0r/gmail-tester/blob/master/README.md#how-to-get-credentialsjson )
* Make sure sammi has Local API Enabled

# Running
* `npm start`

# SAMMI integration
* add a webhook trigger with the message `rougeSaleWebhook`