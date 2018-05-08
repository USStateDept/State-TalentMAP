# Testing certificates

## Create private key

```.sh
openssl genrsa -out talentmap-dev.key 2048
```

## Create certificate signing request - via config

```.sh
openssl req -new -config talentmap-dev.cnf -key talentmap-dev.key -out talentmap-dev.csr
```

## Create certificate signing request - manually

```.sh
openssl req -new -key talentmap-dev.key -out talentmap-dev.csr
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) []:US
State or Province Name (full name) []:DC
Locality Name (eg, city) []:Washington
Organization Name (eg, company) []:Department of State
Organizational Unit Name (eg, section) []:TalentMAP
Common Name (eg, fully qualified host name) []:talentmap.dev
```

## Create certificate

```.sh
openssl x509 -req -sha256 -days 365 -in talentmap-dev.csr -signkey talentmap-dev.key -out talentmap-dev.crt
Signature ok
subject=/C=US/ST=DC/L=Washington/O=Department of State/OU=TalentMAP/CN=talentmap.dev
Getting Private key
```
