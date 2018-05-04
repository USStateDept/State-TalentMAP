const proxy = {
  '/api/v1/accounts/token/': {
    target: (process.env.NODE_ENV === 'development') ?
      'https://localhost:8000' :
      'https://api.dev.talentmap.us/api/v1/accounts/token/',
  }
};

module.exports = proxy;
