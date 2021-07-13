# Deploying the web app

The instructions below are for installing the web application on a CentOS or RedHat Linux server.

## Install dependencies

Install core server dependencies

```bash
sudo yum update
sudo yum install httpd mod_proxy mod_ssl -y
sudo yum install openssl -y
sudo yum install git -y
```

## Install node

Install Node via [NodeSource](https://nodejs.org/en/download/package-manager/#enterprise-linux-and-fedora)

```bash
curl --silent --location https://rpm.nodesource.com/setup_6.x | sudo bash -
sudo yum -y install nodejs
node -e "console.log('Running Node.js ' + process.version)"
```

## Install yarn

Yarn is the primary package manager for the web app. Instructions copied from [here](https://yarnpkg.com/lang/en/docs/install/#linux-tab)

```bash
sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
sudo yum install yarn
```

## Add Apache VirtualHost entry

Add a `VirtualHost` entry in `/etc/httpd/conf/httpd.conf`. The web application uses `mod_proxy` to proxy requests to a Node application.  The `Location` should match the `PUBLIC_URL` environment variable.

```http
<VirtualHost *:80>
 ServerName localhost
 DocumentRoot /var/www/html
 ProxyRequests Off

 <Proxy *>
  Order deny,allow
  Allow from all
 </Proxy>

 <Location /talentmap/>
  ProxyPass http://localhost:3000/talentmap/
  ProxyPassReverse http://localhost:3000/talentmap/
 </Location>
</VirtualHost>
```

It is recommended to add the following to `/etc/httpd/conf/httpd.conf` to enable the compression of files served by Apache

```http
<IfModule mod_deflate.c>
    SetOutputFilter DEFLATE
</IfModule>
```

## Clone repository

Use `git` to clone the web app repository

```bash
git clone https://github.com/18F/State-TalentMAP.git
cd State-TalentMAP/
```

## Source environment variables

Environment variables are documented [here](EXAMPLE_setup_environment.sh)

```bash
source setup_environment.sh
```

## Build web app

Build the application

```bash
yarn install
yarn run build
```

## Copy files

Copy files from the build directory to the root Apache directory

```bash
sudo cp -r build/* /var/www/html/ -v
```

## Start Node server

There is a simple Node + Express application that serves the front end and needs to run as a background process.  NOTE - you may need to run `which nohup` to get the correct path.

```bash
/usr/bin/nohup node server.js &
```

## Restart Apache

```bash
sudo apachectl restart
```
