import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidList from './BidList';

describe('BidListComponent', () => {
  const bidList = { results: [] };
  it('is defined', () => {
    const wrapper = shallow(
      <BidList
        bidList={bidList}
        toggleBidPosition={() => {}}
        bidListHasErrored={false}
        bidListIsLoading={false}
        bidListToggleHasErrored={false}
        bidListToggleIsLoading={false}
        bidListToggleSuccess={false}
        submitBid={() => {}}
        submitBidHasErrored={false}
        submitBidIsLoading={false}
        submitBidSuccess={false}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <BidList
        bidList={bidList}
        toggleBidPosition={() => {}}
        bidListHasErrored={false}
        bidListIsLoading={false}
        bidListToggleHasErrored={false}
        bidListToggleIsLoading={false}
        bidListToggleSuccess={false}
        submitBid={() => {}}
        submitBidHasErrored={false}
        submitBidIsLoading={false}
        submitBidSuccess={false}
      />,
    );
    expect(wrapper.instance().props.bidList)
      .toBe(bidList);
  });

  it('shows error message deleting a bid', () => {
    const wrapper = shallow(
      <BidList
        bidList={bidList}
        toggleBidPosition={() => {}}
        bidListHasErrored={false}
        bidListIsLoading={false}
        bidListToggleHasErrored="Removed"
        bidListToggleIsLoading={false}
        bidListToggleSuccess={false}
        submitBid={() => {}}
        submitBidHasErrored={false}
        submitBidIsLoading={false}
        submitBidSuccess={false}
      />,
    );
    expect(wrapper.find('Removed')).toBeDefined();
  });

  it('shows success message deleting a bid', () => {
    const wrapper = shallow(
      <BidList
        bidList={bidList}
        toggleBidPosition={() => {}}
        bidListHasErrored={false}
        bidListIsLoading={false}
        bidListToggleHasErrored={false}
        bidListToggleIsLoading={false}
        bidListToggleSuccess="Added"
        submitBid={() => {}}
        submitBidHasErrored={false}
        submitBidIsLoading={false}
        submitBidSuccess={false}
      />,
    );
    expect(wrapper.find('Added')).toBeDefined();
  });

  it('shows error message submitting a bid', () => {
    const wrapper = shallow(
      <BidList
        bidList={bidList}
        toggleBidPosition={() => {}}
        bidListHasErrored={false}
        bidListIsLoading={false}
        bidListToggleHasErrored={false}
        bidListToggleIsLoading={false}
        bidListToggleSuccess={false}
        submitBid={() => {}}
        submitBidHasErrored="Error"
        submitBidIsLoading={false}
        submitBidSuccess={false}
      />,
    );
    expect(wrapper.find('Error')).toBeDefined();
  });

  it('shows success message submitting a bid', () => {
    const wrapper = shallow(
      <BidList
        bidList={bidList}
        toggleBidPosition={() => {}}
        bidListHasErrored={false}
        bidListIsLoading={false}
        bidListToggleHasErrored={false}
        bidListToggleIsLoading={false}
        bidListToggleSuccess={false}
        submitBid={() => {}}
        submitBidHasErrored={false}
        submitBidIsLoading={false}
        submitBidSuccess="Submitted"
      />,
    );
    expect(wrapper.find('Submitted')).toBeDefined();
  });

  it('renders elements when bid list is loading', () => {
    const wrapper = shallow(
      <BidList
        bidList={bidList}
        toggleBidPosition={() => {}}
        bidListHasErrored={false}
        bidListIsLoading
        bidListToggleHasErrored={false}
        bidListToggleIsLoading={false}
        bidListToggleSuccess={false}
        submitBid={() => {}}
        submitBidHasErrored={false}
        submitBidIsLoading={false}
        submitBidSuccess={false}
      />,
    );
    expect(wrapper.find('.results-loading')).toBeDefined();
    expect(wrapper.find('type="homepage-position-results"')).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidList
        bidList={bidList}
        toggleBidPosition={() => {}}
        bidListHasErrored={false}
        bidListIsLoading={false}
        bidListToggleHasErrored={false}
        bidListToggleIsLoading={false}
        bidListToggleSuccess={false}
        submitBid={() => {}}
        submitBidHasErrored={false}
        submitBidIsLoading={false}
        submitBidSuccess={false}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
