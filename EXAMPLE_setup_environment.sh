#!/bin/bash

# The public prefix for the web application
# Default - /talentmap/
export PUBLIC_URL=/talentmap/

# The full path location of build artifacts, ie js and css
# Default - /build/ directory under source root
export STATIC_PATH=/var/www/html/talentmap/

# Protocol, hostname and port of API
# Default - local dev, http://localhost:8000/
export API_ROOT=http://localhost:8000/

# Protocol, hostname and port of OBC, 
# which provides post and country details
# Default - local test value http://localhost:4000/
export OBC_URL=http://localhost:4000/

# External link to the About page
export ABOUT_PAGE=https://github.com/18F/State-TalentMAP