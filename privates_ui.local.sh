#  ==== Private variables ====
# Application port
PORT=3000

# The public prefix for the web application
PUBLIC_URL='/talentmap/'

# The full path location of build artifacts, ie js and css
STATIC_PATH='/app/build/'

# Protocol, hostname and port of API
API_ROOT='http://api:8000/'
API_URL='http://localhost:8000/api/v1'

# Protocol, hostname and port of OBC,
OBC_URL=''

# External link to the About page
ABOUT_PAGE='https://github.com/18F/State-TalentMAP'

# SAML configuration
ENTITY_ID='https://app_env_tm.hostname/env_/talentmap/'
ASSERT_ENDPOINT='https://app_env_tm.hostname/env_/talentmap/'

# server certificate
CERT_FILE=''
KEY_FILE=''

# identity provider config
SSO_CERT_FILE=''
SSO_METADATA_URL=''
SSO_LOGIN_URL=''
SSO_LOGOUT_URL=''