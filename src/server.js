const express = require('express');
const path = require('path');

// define the API root url
const API_ROOT = process.env.API_ROOT || 'http://localhost:8000';

// define the prefix for the application
const PUBLIC_URL = process.env.PUBLIC_URL || '/talentmap/';

// define the OBC root url
// example: https://www.obcurl.gov
const OBC_URL = process.env.OBC_URL;

// application port
const port = process.env.PORT || 3000;

const app = express();

// middleware for static assets
app.use(PUBLIC_URL, express.static(path.join(__dirname, '../build')));

// saml2 metadata
app.get(`${PUBLIC_URL}metadata/`, (request, response) => {
  response.redirect(`${API_ROOT}/saml2/metadata`);
});

// OBC redirect - posts
app.get(`${PUBLIC_URL}obc/post/:id`, (request, response) => {
  // set the id passed in the route and pass it to the redirect
  const id = request.params.id;
  response.redirect(`${OBC_URL}/post/detail/${id}`);
});

// OBC redirect - countries
app.get(`${PUBLIC_URL}obc/country/:id`, (request, response) => {
  // set the id passed in the route and pass it to the redirect
  const id = request.params.id;
  response.redirect(`${OBC_URL}/country/detail/${id}`);
});

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(port);
