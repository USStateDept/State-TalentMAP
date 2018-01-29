import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import LoadingWrapper from './LoadingWrapper';

describe('LoadingWrapper', () => {
  it('is defined', () => {
    const wrapper = shallow(<LoadingWrapper />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = <LoadingWrapper />;
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
