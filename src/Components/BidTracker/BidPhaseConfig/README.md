This folder contains config files for the Bid Tracker that represent different levels of integration the TalentMAP application is at.

`Complete.js` is the config to be used when TalentMAP becomes the system of record for bidding, and contains
features not currently supported by FSBid.

`Limited.js` is the config to be used when TalentMAP relies on FSBid for bidding. This is config skips
some of the additional states that, while are supported by the TalentMAP, are not captured by FSBid.

When TalentMAP is ready to become the system of record for bidding, references to this config can be changed from `Limited.js` to
`Complete.js`. This can be done in in the feature flag config file (`/public/config/config.json`) by changing the value of `"complete_bidding"` to `true`.
