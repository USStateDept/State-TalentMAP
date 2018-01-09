// should match responsive breakpoints in _variables.scss
const breakpoints = {
  screenSmMin: 600,
  get screenXsMax() { return this.screenSmMin - 1; },
  screenMdMin: 951,
  get screenSmMax() { return this.screenMdMin - 1; },
  screenLgMin: 1200,
  get screenMdMax() { return this.screenLgMin - 1; },
};

export default breakpoints;
