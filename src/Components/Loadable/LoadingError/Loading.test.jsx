import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import LoadingError from './LoadingError';

describe('LoadingError', () => {
  it('is defined', () => {
    const wrapper = shallow(<LoadingError>Test</LoadingError>);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = <LoadingError>Test</LoadingError>;
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
