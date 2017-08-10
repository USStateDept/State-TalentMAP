import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import GovBanner from './GovBanner';

describe('GovBanner', () => {
  it('is defined', () => {
    const wrapper = shallow(<GovBanner />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<GovBanner />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
