#!/usr/bin/env bash
: '
Output files will be:

CA_cert.pem → [Certificate Authority] certificate. This certificate must be added to the browser local authority storage to make trust all certificates that created with using this CA.
CA_key.pem → Must be used when creating new [localhost] certificate. May be deleted after certificate creation process (if you do not plan reuse it and CA_cert.pem).
localhost_cert.pem → SSL certificate. Must be installed at WEB server.
localhost_key.pem → Secret key. Must be installed at WEB server.
'

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# Generate a CA private key and Certificate (valid for 5 years)
openssl req -nodes -new -x509 -keyout CA_key.pem -out CA_cert.pem -days 1825 -config "${SCRIPT_DIR}/configs/openssl-ca.cnf"
# Generate web server secret key and CSR
openssl req -sha256 -nodes -newkey rsa:2048 -keyout localhost_key.pem -out localhost.csr -config "${SCRIPT_DIR}/configs/openssl-localhost.cnf"
# Create certificate and sign it by own certificate authority (valid 1 year)
openssl x509 -req -days 398 -in localhost.csr -CA CA_cert.pem -CAkey CA_key.pem -CAcreateserial -out localhost_cert.pem -extensions req_ext -extfile "${SCRIPT_DIR}/configs/openssl-localhost.cnf"

# Cleanup
rm CA_cert.srl localhost.csr

# Check
openssl x509 -noout -text -in localhost_cert.pem | grep 'X509v3 Subject Alternative Name' -A 1
