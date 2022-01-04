const request = require('supertest');
const proxyServer = require('./obc').server;

describe('proxy server routes', () => {
  let server;
  beforeEach(() => {
    server = proxyServer;
  });
  afterEach(() => {
    // close the server after each test so that jest exits
    server.close();
  });
  it('responds to /country/detail', (done) => {
    request(server).get('/country/detail/42').expect(200, done);
  });
  it('responds to /post/detail/data', (done) => {
    request(server).get('/post/detail/data/42').expect(200, done);
  });
  it('responds to /post/detail', (done) => {
    request(server).get('/post/detail/42').expect(200, done);
  });
  it('responds to wildcard routes', (done) => {
    request(server).get('/bureau/42').expect(404, done);
  });
});
