import cssShadow from './BoxShadowUtility';

describe('BoxShadowUtility', () => {
  const config = {
    inset: false,
    offsetX: 3,
    offsetY: 2,
    blurRadius: 10,
    spreadRadius: 1,
    color: 'rgba(0,0,0,.15)',
  };
  const stringified = `${config.offsetX}px ${config.offsetY}px ${config.blurRadius}px ${config.spreadRadius}px ${config.color}`;
  it('can stringify an object', () => {
    const output = cssShadow.stringify([config]);
    expect(output).toBe(stringified);
  });

  it('can parse a string', () => {
    const output = cssShadow.parse(`${stringified}`);
    expect(output).toEqual([config]);
  });
});
