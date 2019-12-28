require('dotenv').config()
const fs = require('fs');
const https = require('https')
const http = require('http')
require('./database')

const app = require('./app')

let SSL_options = {
    key: fs.readFileSync('/etc/letsencrypt/live/juanmamegia.tk/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/juanmamegia.tk/cert.pem')
}

https.createServer(SSL_options, app).listen(process.env.SSL_AUTH_LITTLE_PORT, () => console.log('Secure Server on PORT: ' + process.env.SSL_AUTH_LITTLE_PORT))
http.createServer(app).listen(process.env.AUTH_LITTLE_PORT, () => console.log('Secure Server on PORT: ' + process.env.AUTH_LITTLE_PORT))



