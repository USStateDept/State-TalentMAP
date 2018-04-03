const saml2 = require('saml2-js');
const fs = require('fs');

// load constants from env vars
const ENTITY_ID = process.env.ENTITY_ID || 'http://localhost:3000/talentmap/';
const ASSERT_ENDPOINT = process.env.ASSERT_ENDPOINT || 'http://localhost:5000/';

// load certs
const certFile = fs.readFileSync(process.env.CERT_FILE);
const keyFile = fs.readFileSync(process.env.KEY_FILE);

// identity provide config
const SSO_LOGIN_URL = process.env.SSO_LOGIN_URL || 'http://localhost:5000/login';
const SSO_LOGOUT_URL = process.env.SSO_LOGOUT_URL || 'http://localhost:5000/login';

// Create service provider with options
const serviceProvider = new saml2.ServiceProvider({
  entity_id: ENTITY_ID,
  private_key: keyFile,
  certificate: certFile,
  assert_endpoint: ASSERT_ENDPOINT,
  force_authn: true,
});

const identityProvider = new saml2.IdentityProvider({
  sso_login_url: SSO_LOGIN_URL,
  sso_logout_url: SSO_LOGOUT_URL,
});

// Example use of service provider.
// Call metadata to get XML metatadata used in configuration.
const metadata = serviceProvider.create_metadata();

const login = (handler) => {
  serviceProvider.create_login_request_url(identityProvider, {}, handler);
};

module.exports = { metadata, login };
