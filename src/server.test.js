const request = require('supertest');
const proxyServer = require('../scripts/server').server;

describe('proxy server routes', () => {
  let server;
  const tmp = {};

  beforeAll(() => {
    // Keep a copy of all env variables used before tests
    tmp.PUBLIC_URL = process.env.PUBLIC_URL;
    tmp.LOGIN_MODE = process.env.LOGIN_MODE;
    // Override env variables
    process.env.PUBLIC_URL = '/talentmap/';
    process.env.LOGIN_MODE = 'saml';
  });

  beforeEach(() => {
    server = proxyServer;
  });

  /**
   * Main Routes
   */
  it('responds to GET /talentmap/', (done) => {
    request(server).get('/talentmap/').expect(200, done);
  });

  it('responds to GET wildcard routes', (done) => {
    request(server).get('/file-does-not-exits.html').expect(404, done);
  });

  it('responds to GET /talentmap/metadata', (done) => {
    request(server).get('/talentmap/metadata').expect(200, done);
  });

  it('responds on GET /talentmap/login', (done) => {
    request(server).get('/talentmap/login').expect(200, done);
  });

  it('redirects on GET /talentmap/logout', (done) => {
    request(server).get('/talentmap/logout').expect(302, done);
  });

  it('redirects on POST /talentmap/', (done) => {
    request(server).post('/talentmap/').expect(307, done);
  });

  /**
   * OBC Routes
   */
  it('redirects on GET /talentmap/obc/country/42', (done) => {
    request(server).get('/talentmap/obc/country/42').expect(302, done);
  });

  it('redirects on GET /talentmap/obc/post/data/42', (done) => {
    request(server).get('/talentmap/obc/post/42').expect(302, done);
  });

  it('redirects on GET /talentmap/obc/post/42', (done) => {
    request(server).get('/talentmap/obc/post/42').expect(302, done);
  });

  /**
   * About Routes
   */
  it('redirects on /talentmap/about/more', (done) => {
    request(server).get('/talentmap/about/more').expect(302, done);
  });

  afterEach(() => {
    // close the server after each test so that jest exits
    server.close();
  });

  afterAll(() => {
    // Restore environment variables
    process.env.PUBLIC_URL = tmp.PUBLIC_URL;
    process.env.LOGIN_MODE = tmp.LOGIN_MODE;
  });
});
