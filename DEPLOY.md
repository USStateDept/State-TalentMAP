# Deploying the web app

The instruction below are for installing the web application on a CentOS or RedHat Linux server

## Install dependencies

Install core server dependencies

```bash
sudo yum update
sudo yum install httpd mod_ssl -y
sudo yum install openssl -y
sudo yum install git -y
```

## Install nvm

Install Node via [nvm](https://github.com/creationix/nvm)

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install
nvm use
node -e "console.log('Running Node.js ' + process.version)"
```

## Install yarn

Yarn is the primary package manager for the web app.  Instructions copied from [here](https://yarnpkg.com/lang/en/docs/install/#linux-tab)

```bash
sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
sudo yum install yarn
```

## Clone repo

Use git to clone the web app repo

```bash
git clone https://github.com/18F/State-TalentMAP.git
```

## Build web app

Build application

```bash
cd State-TalentMAP/
yarn install
yarn rebuild node-sass
yarn run build
```

### Copy files

Copy files for the build directory to the root Apache directory

```bash
sudo cp -r build/* /var/www/html/ -v
```

### Restart apache

```bash
sudo apachectl restart
```
