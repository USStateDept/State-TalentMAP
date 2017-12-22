import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidTrackerCardTitle from './BidTrackerCardTitle';

describe('BidTrackerCardTitleComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <BidTrackerCardTitle title="Title" id="a123" />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidTrackerCardTitle title="Title" id="a123" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
