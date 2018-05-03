module.exports = {
  // Our responsive breakpoint variables
  screenSmMinNum: 600,
  get 'screen-sm-min'() { return `${this.screenSmMinNum}px`; },

  get screenXsMaxNum() { return this.screenSmMinNum - 1; },
  get 'screen-xs-max'() { return `${this.screenXsMaxNum}px`; },

  screenMdMinNum: 951,
  get 'screen-md-min'() { return `${this.screenMdMinNum}px`; },

  get screenSmMaxNum() { return this.screenMdMinNum - 1; },
  get 'screen-sm-max'() { return `${this.screenSmMaxNum}px`; },

  screenLgMinNum: 1200,
  get 'screen-lg-min'() { return `${this.screenLgMinNum}px`; },

  get screenMdMaxNum() { return this.screenLgMinNum - 1; },
  get 'screen-md-max'() { return `${this.screenMdMaxNum}px`; },

  // Set our asset path. This is similar to getAssetPath in utilities, but
  // we wrap the environment variable in quotes so it can be used in .scss files.
  get 'asset-path'() { return process.env.PUBLIC_URL ? `"${process.env.PUBLIC_URL}"` : '"/"'; },
};
