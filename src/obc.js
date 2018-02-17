const express = require('express');

const port = 4000;

const app = express();

app.get('/country/:id', (request, response) => {
  response.sendStatus(200);
  response.send(`OBC Country ${request.params.id}`);
});

app.get('/post/:id', (request, response) => {
  response.sendStatus(200);
  response.send(`OBC Country ${request.params.id}`);
});

app.get('*', (request, response) => {
  response.sendStatus(404);
  response.send(`Bad request ${request.url}`);
});

const server = app.listen(port);

// export the the app and server separately
module.exports = { app, server };
