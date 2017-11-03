'use strict';

const serve = require('serve');
const paths = require('../config/paths');

const server = serve(paths.appBuild, {
  port: 3000,
  ignore: ['node_modules']
});
