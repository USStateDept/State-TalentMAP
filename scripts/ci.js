const serve = require('serve');
const paths = require('../config/paths');

const server = serve(paths.appBuild, {
  port: paths.port,
  ignore: ['node_modules']
});
