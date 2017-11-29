import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CurrentUserBidInformation from './CurrentUserBidInformation';

describe('CurrentUserBidInformationComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<CurrentUserBidInformation />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<CurrentUserBidInformation />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
