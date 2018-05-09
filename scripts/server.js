const chalk = require('chalk');
const express = require('express');
const TalentMAPMiddleware = require('../src/server');

const app = TalentMAPMiddleware(express());
const port = TalentMAPMiddleware.getEnv('PORT');

const server = app.listen(port);

if(process.env.NODE_ENV !== 'test') {
  const name =  chalk`{bold.hsl(208,90,64) Talent}{hsl(234,82,30) MAP}`

  let message = [
    `${chalk.green('Server started successfully!')}`,
    `You can now view ${name} in the browser`,
    `  ${chalk.bold('Local:')}            http://localhost:${port}/\n`,
  ];

  message = message.join('\n\n');

  console.log(message);
}

// export the the app and server separately
module.exports = {
  app,
  server
};
