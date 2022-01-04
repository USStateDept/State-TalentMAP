const request = require('supertest');
const httpMocks = require('node-mocks-http');
const proxyServer = require('./server').server;
const removeCacheControl = require('./server').removeCacheControl;

describe('proxy server routes', () => {
  let server;
  let req;
  let res;

  beforeEach(() => {
    req = httpMocks.createRequest({
      method: 'GET',
      url: '/mock/endpoint/',
      params: {
        id: 42,
      },
    });

    res = httpMocks.createResponse();

    res.set({
      test: '1',
      'Surrogate-Control': true,
      Pragma: true,
      Expires: true,
    });

    process.env.USE_MOCK_SAML = '1';
    server = proxyServer;
  });

  afterEach(() => {
    process.env.USE_MOCK_SAML = false;
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

  // a route from routes.js
  it('responds to GET /talentmap/compare', (done) => {
    request(server).get('/talentmap/compare').expect(200, done);
  });

  it('redirects on /talentmap/about/more', (done) => {
    request(server).get('/talentmap/about/more').expect(302, done);
  });

  // middleware
  it('should set and remove cache headers correctly', (done) => {
    const callback = () => {
      const headers = res._headers; // eslint-disable-line no-underscore-dangle
      expect(headers.test).toBe('1'); // manually added, should not be removed
      expect(headers['cache-control']).toBe('public'); // added by middleware
      expect(headers['Surrogate-Control']).toBeUndefined(); // removed by middleware
      expect(headers.Pragma).toBeUndefined(); // removed by middleware
      expect(headers.Expires).toBeUndefined(); // removed by middleware
      done();
    };
    removeCacheControl(req, res, callback);
  });
});
