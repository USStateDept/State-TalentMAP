// There's a similar function in utilities, but we need to format the asset path
// differently than when used in javascript files. We need to put an extra set of
// quotes around the asset path, or lack of one, so that it's evaluated as a string
// and not as CSS.
const assetPath = process.env.PUBLIC_URL ? `"${process.env.PUBLIC_URL}"` : '""';

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

  // asset path
  'asset-path': assetPath,
};
