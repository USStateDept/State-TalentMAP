import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import BidListResultsCard from './BidListResultsCard';

describe('BidListResultsCardComponent', () => {
  const bid = { id: 1, position: { id: 2, position: { position_number: '05A', title: 'AO' } } };
  it('is defined', () => {
    const wrapper = shallow(
      <BidListResultsCard
        bid={bid}
        toggleBidPosition={() => {}}
        submitBid={() => {}}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <BidListResultsCard
        bid={bid}
        toggleBidPosition={() => {}}
        submitBid={() => {}}
      />,
    );
    expect(wrapper.instance().props.bid.id).toBe(bid.id);
  });

  it('can call functions on button click', () => {
    const spy = sinon.spy();
    const submitSpy = sinon.spy();
    const wrapper = shallow(
      <BidListResultsCard
        bid={bid}
        toggleBidPosition={spy}
        submitBid={submitSpy}
      />,
    );
    // submitting is the first button
    wrapper.find('button').at(0).simulate('click');
    sinon.assert.calledOnce(submitSpy);
    // deleting is the second button
    wrapper.find('button').at(1).simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidListResultsCard
        bid={bid}
        toggleBidPosition={() => {}}
        submitBid={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
