import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidTrackerCardBottom from './BidTrackerCardBottom';
import { bidderUserObject } from '../../../__mocks__/userObject';

describe('BidTrackerCardBottomComponent', () => {
  const reviewer = {
    username: 'woodwardw',
    initials: 'WW',
    first_name: 'Wendy',
    last_name: 'Woodward',
    email: 'woodwardw@state.gov',
    phone_number: '555-555-5555',
    is_cdo: false,
  };
  it('is defined', () => {
    const wrapper = shallow(
      <BidTrackerCardBottom bureau="bureau" reviewer={reviewer} userProfile={bidderUserObject} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidTrackerCardBottom bureau="bureau" reviewer={reviewer} userProfile={bidderUserObject} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
