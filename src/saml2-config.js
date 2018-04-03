const saml2 = require('saml2-js');
const fs = require('fs');

// load constants from env vars
const ENTITY_ID = process.env.ENTITY_ID || 'http://localhost:3000/talentmap/';
const ASSERT_ENDPOINT = process.env.ASSERT_ENDPOINT || 'http://localhost:5000/';

// load certs
const certFile = fs.readFileSync(process.env.CERT_FILE);
const keyFile = fs.readFileSync(process.env.KEY_FILE);

const options = {
  entity_id: ENTITY_ID,
  private_key: keyFile,
  certificate: certFile,
  assert_endpoint: ASSERT_ENDPOINT,
  force_authn: true,
};

// Create service provider with options
const serviceProvider = new saml2.ServiceProvider(options);

// Example use of service provider.
// Call metadata to get XML metatadata used in configuration.
const metadata = serviceProvider.create_metadata();

module.exports = { metadata };
