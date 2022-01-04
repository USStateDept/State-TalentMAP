import { omit, pick } from 'lodash';
import SetType from './SetType';

describe('PropTypes', () => {
  const props = {
    a: new Set(),
    b: 1,
    c: () => {},
    d: {},
    e: [],
    f: null,
    g: undefined,
    h: 'h',
    i: <div />,
    j: 0,
  };

  const shouldReturnNull = ['a', 'f', 'g'];

  Object.keys(pick(props, shouldReturnNull)).map(k => (
    it(`should return null for Set, null, and undefined (key = ${k}: ${JSON.stringify(props[k])})`, () => {
      const output = SetType(props, k, 'component');
      expect(output).toBeNull();
    })
  ));

  Object.keys(omit(props, shouldReturnNull)).map(k => (
    it(`should return an error if type !== Set (key = ${k}: ${JSON.stringify(props[k])})`, () => {
      const output = SetType(props, k, 'component');
      expect(output.toString()).toEqual((expect.stringMatching(/^(Error)/)));
    })
  ));

  it('return an error if the prop is required and a null value is provided', () => {
    const output = SetType.isRequired(props, 'f', 'component');
    expect(output.toString()).toEqual((expect.stringMatching(/^(Error)/)));
  });

  it('return a null if the prop is required and a valid value is provided', () => {
    const output = SetType.isRequired(props, 'a', 'component');
    expect(output).toBeNull();
  });
});
