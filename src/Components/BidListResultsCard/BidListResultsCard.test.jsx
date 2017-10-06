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
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <BidListResultsCard
        bid={bid}
        toggleBidPosition={() => {}}
      />,
    );
    expect(wrapper.instance().props.bid.id).toBe(bid.id);
  });

  it('can call functions on button click', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <BidListResultsCard
        bid={bid}
        toggleBidPosition={spy}
      />,
    );
    wrapper.find('button').at(0).simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidListResultsCard
        bid={bid}
        toggleBidPosition={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
