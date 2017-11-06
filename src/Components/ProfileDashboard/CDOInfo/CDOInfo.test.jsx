import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CDOInfo from './CDOInfo';

describe('CDOInfoComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<CDOInfo />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when editor is shown', () => {
    const wrapper = shallow(<CDOInfo />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
