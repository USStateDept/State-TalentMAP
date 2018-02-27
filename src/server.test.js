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

  it('responds to /talentmap/', (done) => {
    request(server).get('/talentmap/').expect(200, done);
  });

  it('responds to /login', (done) => {
    request(server).get('/talentmap/login').expect(302, done);
  });

  it('responds to /logout', (done) => {
    request(server).get('/talentmap/logout').expect(302, done);
  });

  it('responds to /obc/country', (done) => {
    request(server).get('/talentmap/obc/country/42').expect(302, done);
  });

  it('responds to /obc/post', (done) => {
    request(server).get('/talentmap/obc/post/42').expect(302, done);
  });

  it('responds to wildcard routes', (done) => {
    request(server).get('/file-does-not-exits.html').expect(404, done);
  });

  // this route depends on default environment variables
  it('redirects on /talentmap/metadata', (done) => {
    request(server).get('/talentmap/metadata').expect(302, done);
  });
});
