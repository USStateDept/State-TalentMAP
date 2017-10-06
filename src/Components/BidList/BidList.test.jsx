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
      />,
    );
    expect(wrapper.instance().props.bidList)
      .toBe(bidList);
  });

  it('can show error message deleting a bid', () => {
    const wrapper = shallow(
      <BidList
        bidList={bidList}
        toggleBidPosition={() => {}}
        bidListHasErrored={false}
        bidListIsLoading={false}
        bidListToggleHasErrored="Removed"
        bidListToggleIsLoading={false}
        bidListToggleSuccess={false}
      />,
    );
    expect(wrapper.find('Removed')).toBeDefined();
  });

  it('can show success message deleting a bid', () => {
    const wrapper = shallow(
      <BidList
        bidList={bidList}
        toggleBidPosition={() => {}}
        bidListHasErrored={false}
        bidListIsLoading={false}
        bidListToggleHasErrored={false}
        bidListToggleIsLoading={false}
        bidListToggleSuccess="Added"
      />,
    );
    expect(wrapper.find('Added')).toBeDefined();
  });

  it('can render elements when bid list is loading', () => {
    const wrapper = shallow(
      <BidList
        bidList={bidList}
        toggleBidPosition={() => {}}
        bidListHasErrored={false}
        bidListIsLoading
        bidListToggleHasErrored={false}
        bidListToggleIsLoading={false}
        bidListToggleSuccess={false}
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
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
