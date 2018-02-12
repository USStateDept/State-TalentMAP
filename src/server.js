const express = require('express');
const path = require('path');

// define the url consuming the API, provide local dev value as default
const API_URL = process.env.API_URL || 'http://localhost:8000/api/v1';

const PUBLIC_URL = process.env.PUBLIC_URL || '/talentmap/';

const port = process.env.PORT || 3000;
const app = express();

app.use(PUBLIC_URL, express.static(path.join(__dirname, '../build')));

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(port);
