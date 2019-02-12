#! /bin/bash

# "Automation" of the front end app deployment.
# * Gets code from the `dev` branch
# * generates certs
# * sets up environment vars
# * install dependencies
# * builds artifact
# * copies static build dir to apache dir
# * restarts apache and pm2

curr_date=`date "+%Y-%m-%d_%H-%M-%S"`

# backup current version if it exists
[ -d State-TalentMAP-dev ] && mv State-TalentMAP-dev State-TalentMAP-dev-$curr_date

# get code
wget -O dev.zip https://github.com/MetaPhase-Consulting/State-TalentMAP/archive/dev.zip

unzip -o dev.zip
rm dev.zip
cd State-TalentMAP-dev

# generate certs
./certs/certs.sh

# copy env setup script
cp EXAMPLE_setup_environment.sh setup_environment.sh
# setup env
source setup_environment.sh

# override following env vars
export API_ROOT=https://dev.talentmap.api.metaphasedev.com/
export API_URL=https://dev.talentmap.api.metaphasedev.com/api/v1
# needs to match what is in the apache conf
export STATIC_PATH=/var/www/html/
# certs generated from the certs.sh script
export CERT_FILE=/home/ec2-user/State-TalentMAP-dev/certs/talentmap-dev.crt
export KEY_FILE=/home/ec2-user/State-TalentMAP-dev/certs/talentmap-dev.key
# use mock saml
export USE_MOCK_SAML=1
# SSO login/out routes
export SSO_LOGIN_URL=https://dev.talentmap.metaphasedev.com/talentmap/login.html
export SSO_LOGOUT_URL=https://dev.talentmap.metaphasedev.com/talentmap/login.html

export ENTITY_ID=https://dev.talentmap.metaphasedev.com/talentmap/

# change to dev BEFORE install
export NODE_ENV=dev

# install dependencies
yarn install

# set back to production BEFORE build
export NODE_ENV=production

# build artifact
yarn build

# backup the html dir if present
[ -d /var/www/html ] && sudo mv /var/www/html /var/www/html-$curr_date
# move build to html
sudo cp -R build /var/www/html
# restart apache
sudo apachectl restart

# restart the pm2 process
pm2 restart all
