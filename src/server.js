const express = require('express');
const path = require('path');

// define the API root url
const API_ROOT = process.env.API_ROOT || 'http://localhost:8000';

// define the url consuming the API, provide local dev value as default
const API_URL = process.env.API_URL || `${API_ROOT}/api/v1`;

// define the prefix for the application
const PUBLIC_URL = process.env.PUBLIC_URL || '/talentmap/';

// application port
const port = process.env.PORT || 3000;

const app = express();

// middleware for static assets
app.use(PUBLIC_URL, express.static(path.join(__dirname, '../build')));

// saml2 metadata
app.get(`${PUBLIC_URL}metadata`, (request, response) => {
  response.redirect(`${API_ROOT}/saml2/metadata`);
});

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(port);
