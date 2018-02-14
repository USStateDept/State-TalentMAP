const express = require('express');
const path = require('path');

// define full path to static build
const STATIC_PATH = process.env.STATIC_PATH || path.join(__dirname, '../build');

// define the API root url
const API_ROOT = process.env.API_ROOT || 'http://localhost:8000';

// define the prefix for the application
const PUBLIC_URL = process.env.PUBLIC_URL || '/talentmap/';

// application port
const port = process.env.PORT || 3000;

const app = express();

// middleware for static assets
app.use(PUBLIC_URL, express.static(STATIC_PATH));

// saml2 metadata
app.get(`${PUBLIC_URL}metadata/`, (request, response) => {
  response.redirect(`${API_ROOT}/saml2/metadata`);
});

app.get('*', (request, response) => {
  response.sendFile(path.resolve(STATIC_PATH, index.html));
});

const server = app.listen(port);

// export the the app and server separately
module.exports = { app, server };
