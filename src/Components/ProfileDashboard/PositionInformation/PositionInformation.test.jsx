import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import PositionInformation from './PositionInformation';

describe('PositionInformationComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<PositionInformation />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when editor is shown', () => {
    const wrapper = shallow(<PositionInformation />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
