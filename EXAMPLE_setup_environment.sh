#!/bin/bash

# Set environment.
# This should not be set to 'production' when installing dependencies,
# otherwise dev dependencies required by the build process will not install.
export NODE_ENV=production

# Set authentication mode
# Either 'saml' or 'basic'
export LOGIN_MODE=saml

# The public prefix for the web application
# Default - /talentmap/
export PUBLIC_URL=/talentmap/

# The full path location of build artifacts, ie js and css
# Default - /build/ directory under source root
export STATIC_PATH=/var/www/html/talentmap/

# Protocol, hostname and port of API
# Default - local dev, http://localhost:8000/
export API_ROOT=http://localhost:8000/
export API_URL=http://localhost:8000/api/v1

# Port number for the Express web application
# This is important in shared environments
# Default - 3000
export PORT=3000

# Protocol, hostname and port of OBC,
# which provides post and country details
# Default - local test value http://localhost:4000/
export OBC_URL=http://localhost:4000/

# External link to the About page
# Default - local test value https://github.com/18F/State-TalentMAP
export ABOUT_PAGE=https://github.com/18F/State-TalentMAP

# SAML configuration

# external facing endpoints
export ENTITY_ID=http://localhost:3000/talentmap/
export ASSERT_ENDPOINT=http://localhost:3000/talentmap/

# server certificate
export CERT_FILE=/path/to/cert_file.crt
export KEY_FILE=/path/to/key_file.key

# identity provider config
export SSO_LOGIN_URL=http://localhost:5000/login
export SSO_LOGOUT_URL=http://localhost:5000/logout
export SSO_CERT_FILE=/path/to/cert_file.crt
