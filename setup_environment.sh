export PUBLIC_URL=/talentmap/
export STATIC_PATH=../build/
export API_ROOT=https://localhost:8000
export SSO_LOGIN_URL=https://adfs.talentmap.metaphasedev.com/adfs/ls/
export SSO_LOGOUT_URL=https://adfs.talentmap.metaphasedev.com/adfs/ls/
export SSO_LOGIN_URL_ALT=$PUBLIC_URL'login.html'
export SSO_LOGOUT_URL_ALT=$PUBLIC_URL'login.html'
export ENTITY_ID=https://localhost:3000/talentmap/
export ASSERT_ENDPOINT=https://localhost:3000/talentmap/
export USE_MOCK_SAML=false
export HTTPS_PORT=443


export SAML_LOGIN_URL=$API_ROOT/saml2/acs/
export SAML_LOGOUT_URL=$API_ROOT/saml2/logout/
