import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidListResultsList from './BidListResultsList';

describe('BidListResultsListComponent', () => {
  const bidList = { results: [{ id: 1 }] };
  it('is defined', () => {
    const wrapper = shallow(
      <BidListResultsList
        bidList={bidList}
        toggleBidPosition={() => {}}
        submitBid={() => {}}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <BidListResultsList
        bidList={bidList}
        toggleBidPosition={() => {}}
        submitBid={() => {}}
      />,
    );
    expect(wrapper.instance().props.bidList)
      .toBe(bidList);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidListResultsList
        bidList={bidList}
        toggleBidPosition={() => {}}
        submitBid={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
