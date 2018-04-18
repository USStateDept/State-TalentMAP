openssl genrsa -out talentmap-dev.key 2048

openssl req -new -config talentmap-dev.cnf -key talentmap-dev.key -out talentmap-dev.csr

openssl x509 -req -sha256 -days 365 -in talentmap-dev.csr -signkey talentmap-dev.key -out talentmap-dev.crt