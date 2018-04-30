import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import LoadingWrapper from './LoadingWrapper';

describe('LoadingWrapper', () => {
  it('is defined', () => {
    const wrapper = shallow(<LoadingWrapper />);
    expect(wrapper).toBeDefined();
  });

  it('is renders LoadingError when error prop exists', () => {
    const wrapper = shallow(<LoadingWrapper error={{}} />);
    expect(wrapper.find('LoadingError').exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = <LoadingWrapper />;
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
