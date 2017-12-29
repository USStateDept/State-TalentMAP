import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidTrackerCardBottom from './BidTrackerCardBottom';

describe('BidTrackerCardBottomComponent', () => {
  const reviewer = {
    username: 'woodwardw',
    first_name: 'Wendy',
    last_name: 'Woodward',
    email: 'woodwardw@state.gov',
    phone_number: '555-555-5555',
    is_cdo: false,
  };
  it('is defined', () => {
    const wrapper = shallow(
      <BidTrackerCardBottom bureau="bureau" reviewer={reviewer} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidTrackerCardBottom bureau="bureau" reviewer={reviewer} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
