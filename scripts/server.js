const express = require('express');
const TalentMAPMiddleware = require('../src/server');

const app = TalentMAPMiddleware(express());
const server = app.listen(TalentMAPMiddleware.getEnv('PORT'));

// export the the app and server separately
module.exports = {
  app,
  server
};
