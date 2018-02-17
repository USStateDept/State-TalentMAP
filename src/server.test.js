const request = require('supertest');
const proxyServer = require('./server').server;

describe('proxy server routes', () => {
  let server;
  beforeEach(() => {
    server = proxyServer;
  });
  afterEach(() => {
    // close the server after each test so that jest exits
    server.close();
  });
  it('responds to /', (done) => {
    request(server).get('/').expect(200, done);
  });
  it('responds to wildcard routes', (done) => {
    request(server).get('/static/css/file.css').expect(200, done);
  });
  // this route depends on default environment variables
  it('redirects on /talentmap/metadata', (done) => {
    request(server).get('/talentmap/metadata').expect(302, done);
  });
});
