import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import PositionAdditionalDetails from './PositionAdditionalDetails';

describe('PositionAdditionalDetails', () => {
  it('is defined', () => {
    const wrapper = shallow(<PositionAdditionalDetails content="test" />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<PositionAdditionalDetails content="test" />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
