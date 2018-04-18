const express = require('express');

const port = 4000;

const app = express();

app.get('/country/detail/:id', (request, response) => {
  response.status(200);
  response.send(`OBC Country ${request.params.id}`);
});

app.get('/post/detail/data/:id', (request, response) => {
  response.status(200);
  response.send(`OBC Post Data Detail ${request.params.id}`);
});

app.get('/post/detail/:id', (request, response) => {
  response.status(200);
  response.send(`OBC Post ${request.params.id}`);
});

app.get('*', (request, response) => {
  response.status(404);
  response.send(`Bad request ${request.url}`);
});

const server = app.listen(port);

// export the the app and server separately
module.exports = { app, server };
