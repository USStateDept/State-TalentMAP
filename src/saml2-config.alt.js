const saml2 = require('saml2-js');
const fs = require('fs');
const path = require('path');

// load constants from env vars
const ENTITY_ID = process.env.ENTITY_ID || 'http://localhost:3000/talentmap/';
const ASSERT_ENDPOINT = process.env.ASSERT_ENDPOINT || 'http://localhost:3000/talentmap/';
const ENTITY_ID_PUBLIC = process.env.ENTITY_ID_PUBLIC || 'http://localhost:3000/talentmap/';
const ASSERT_ENDPOINT_PUBLIC = process.env.ASSERT_ENDPOINT_PUBLIC || 'http://localhost:3000/talentmap/';

// load certs
const certFile = process.env.CERT_FILE || path.join(__dirname, '../certs', 'talentmap-dev.crt');
const keyFile = process.env.KEY_FILE || path.join(__dirname, '../certs', 'talentmap-dev.key');

// identity provide config
const SSO_LOGIN_URL = process.env.SSO_LOGIN_URL || 'http://localhost:5000/login';
const SSO_LOGOUT_URL = process.env.SSO_LOGOUT_URL || 'http://localhost:5000/logout';

// SSO-provided cert
const SSO_CERT_FILE = process.env.SSO_CERT_FILE || '/etc/pki/tls/certs/STSENTNewTokenCert.cer';

// Create service provider with options
const serviceProvider = new saml2.ServiceProvider({
  entity_id: ENTITY_ID,
  private_key: fs.readFileSync(keyFile),
  certificate: fs.readFileSync(certFile),
  assert_endpoint: ASSERT_ENDPOINT,
  force_authn: false,
});

const serviceProviderPublic = new saml2.ServiceProvider({
  entity_id: ENTITY_ID_PUBLIC,
  private_key: fs.readFileSync(keyFile),
  certificate: fs.readFileSync(certFile),
  assert_endpoint: ASSERT_ENDPOINT_PUBLIC,
  force_authn: false,
});

const identityProvider = new saml2.IdentityProvider({
  sso_login_url: SSO_LOGIN_URL,
  sso_logout_url: SSO_LOGOUT_URL,
  certificates: [fs.readFileSync(SSO_CERT_FILE)],
});

// Call metadata to get XML metatadata used in configuration.
const metadata = serviceProvider.create_metadata();
const metadataPublic = serviceProviderPublic.create_metadata();

const login = (handler) => {
  serviceProvider.create_login_request_url(identityProvider, {}, handler);
};

const loginPublic = (handler) => {
  serviceProviderPublic.create_login_request_url(identityProvider, {}, handler);
};

const acs = (options, handler) => {
  serviceProvider.post_assert(identityProvider, options, handler);
};

const logout = (handler) => {
  serviceProvider.create_logout_request_url(identityProvider, null, handler);
};

module.exports = { metadata, login, logout, acs, metadataPublic, loginPublic };
