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

  it('responds to GET /talentmap/', (done) => {
    request(server).get('/talentmap/').expect(200, done);
  });

  it('responds to GET wildcard routes', (done) => {
    request(server).get('/file-does-not-exits.html').expect(404, done);
  });

  it('responds to GET /talentmap/metadata', (done) => {
    request(server).get('/talentmap/metadata').expect(200, done);
  });

  it('redirects on GET /talentmap/login', (done) => {
    request(server).get('/talentmap/login').expect(302, done);
  });

  it('redirects on GET /talentmap/logout', (done) => {
    request(server).get('/talentmap/logout').expect(302, done);
  });

  it('responds to POST /talentmap/', (done) => {
    request(server).post('/talentmap/').expect(307, done);
  });

  // OBC
  it('redirects on GET /talentmap/obc/country/42', (done) => {
    request(server).get('/talentmap/obc/country/42').expect(302, done);
  });

  it('redirects on GET /talentmap/obc/post/data/42', (done) => {
    request(server).get('/talentmap/obc/post/42').expect(302, done);
  });

  it('redirects on GET /talentmap/obc/post/42', (done) => {
    request(server).get('/talentmap/obc/post/42').expect(302, done);
  });

  it('redirects on /talentmap/about/more', (done) => {
    request(server).get('/talentmap/about/more').expect(302, done);
  });
});
