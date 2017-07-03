# Deploying the web app

## Install dependencies

```
sudo yum update
sudo yum install httpd mod_ssl
sudo yum install openssl -y
sudo yum install git -y
```

## Install nvm

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 6.11.0
node -e "console.log('Running Node.js ' + process.version)"
```

## Clone repo

```
git clone https://github.com/18F/State-TalentMAP.git
```

## Build web app

```
cd State-TalentMAP/
npm install
npm rebuild node-sass
npm run build
```

### Copy files

```
sudo cp -r build/* /var/www/html/ -v
```

### Restart apache

```
sudo apachectl restart
```
