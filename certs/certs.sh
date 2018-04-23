CERT_PATH="$(cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd)"
CONFIG=$CERT_PATH/talentmap-dev.cnf
KEY=$CERT_PATH/talentmap-dev.key
CSR=$CERT_PATH/talentmap-dev.csr
CERT=$CERT_PATH/talentmap-dev.crt

openssl genrsa -out $KEY 2048
openssl req -new -config $CONFIG -key $KEY -out $CSR
openssl x509 -req -sha256 -days 365 -in $CSR -signkey $KEY -out $CERT
