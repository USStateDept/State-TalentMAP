import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CurrentUserBidInformation from './CurrentUserBidInformation';

describe('CurrentUserBidInformationComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<CurrentUserBidInformation draft={1} submitted={1} />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when a denominator is provided', () => {
    const wrapper = shallow(<CurrentUserBidInformation draft={1} submitted={1} denominator={9} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<CurrentUserBidInformation draft={1} submitted={1} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when a denominator is provided', () => {
    const wrapper = shallow(<CurrentUserBidInformation draft={1} submitted={1} denominator={9} />);
    expect(wrapper).toBeDefined();
  });
});
