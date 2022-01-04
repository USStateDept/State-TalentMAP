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

  screenXlgMinNum: 1600,
  get 'screen-xlg-min'() { return `${this.screenXlgMinNum}px`; },

  get screenLgMaxNum() { return this.screenXlgMinNum - 1; },
  get 'screen-lg-max'() { return `${this.screenLgMaxNum}px`; },

  // Colors
  tertiaryCoolBlueLightest: '#DCE4EF',
  get 'var-tertiary-cool-blue-lightest'() { return this.tertiaryCoolBlueLightest; },

  tertiaryCoolBlueLighter: '#8BA6CA',
  get 'var-tertiary-cool-blue-lighter'() { return this.tertiaryCoolBlueLighter; },

  tertiaryCoolBlueLight: '#4773AA',
  get 'var-tertiary-cool-blue-light'() { return this.tertiaryCoolBlueLight; },

  tertiaryGoldLightest: '#FFF1D2',
  get 'var-tertiary-gold-lightest'() { return this.tertiaryGoldLightest; },

  tertiaryGoldLighter: '#FAD980',
  get 'var-tertiary-gold-lighter'() { return this.tertiaryGoldLighter; },

  colorBlueChill: '#117C8D',

  // Set our asset path. This is similar to getAssetPath in utilities, but
  // we wrap the environment variable in quotes so it can be used in .scss files.
  get 'asset-path'() { return process.env.PUBLIC_URL ? `"${process.env.PUBLIC_URL}"` : '"/"'; },
};
