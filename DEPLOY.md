# Deploying the web app

The instruction below are for installing the web application on a CentOS or RedHat Linux server

## Install dependencies

Install core server dependencies

```
sudo yum update
sudo yum install httpd mod_ssl -y
sudo yum install openssl -y
sudo yum install git -y
```

## Install nvm

Install Node version 6.11.0

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 6.11.0
node -e "console.log('Running Node.js ' + process.version)"
```

## Clone repo

Use git to clone the web app repo

```
git clone https://github.com/18F/State-TalentMAP.git
```

## Build web app

Build application 

```
cd State-TalentMAP/
npm install
npm rebuild node-sass
npm run build
```

### Copy files

Copy files for the build directory to the root Apache directory

```
sudo cp -r build/* /var/www/html/ -v
```

### Restart apache

```
sudo apachectl restart
```
