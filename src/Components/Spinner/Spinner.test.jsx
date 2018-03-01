import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('is defined', () => {
    const spinner = shallow(<Spinner />);
    expect(spinner).toBeDefined();
  });

  it('can accept the type prop', () => {
    const type = 'results';
    const spinner = shallow(<Spinner type={type} />);
    expect(toJSON(spinner)).toMatchSnapshot();
    expect(spinner.find(`.tm-spinner-${type}`)).toBeDefined();
  });
});
