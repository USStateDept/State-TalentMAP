const express = require('express');
const TalentMapMiddleware = require('../src/server');

const app = TalentMapMiddleware(express());
const server = app.listen(TalentMapMiddleware.getEnv('PORT'));

// export the the app and server separately
module.exports = {
  app,
  server
};
