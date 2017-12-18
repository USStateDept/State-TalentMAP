import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidTrackerCardList from './BidTrackerCardList';
import bidListObject from '../../../__mocks__/bidListObject';

describe('BidTrackerCardListComponent', () => {
  const bids = bidListObject.results;

  it('is defined', () => {
    const wrapper = shallow(
      <BidTrackerCardList bids={bids} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidTrackerCardList bids={bids} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
