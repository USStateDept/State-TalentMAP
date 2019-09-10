import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import BidTrackerCardTop from './BidTrackerCardTop';
import bidListObject from '../../../__mocks__/bidListObject';

describe('BidTrackerCardTopComponent', () => {
  const bid = bidListObject.results[0];
  const deleteBid = sinon.spy();

  const props = {
    bid,
    deleteBid,
    toggle: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <BidTrackerCardTop {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined with questionText', () => {
    const questionText = { text: 'text', link: 'link', term: 'term' };
    const wrapper = shallow(
      <BidTrackerCardTop {...props} questionText={questionText} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined with questionText', () => {
    const questionText = { text: 'text', link: 'link', term: 'term' };
    const wrapper = shallow(
      <BidTrackerCardTop {...props} questionText={questionText} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined with an invalid bid status', () => {
    const newBid = { ...props.bid };
    newBid.status = 'fake status';
    const wrapper = shallow(
      <BidTrackerCardTop {...props} bid={newBid} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('shows the remove bid link when canDelete', () => {
    const newBid = { ...props.bid };
    newBid.can_delete = true;
    const wrapper = shallow(
      <BidTrackerCardTop {...props} bid={newBid} />,
    );
    expect(wrapper).toBeDefined();
    expect(wrapper.find('remove-bid-link')).toBeDefined();
  });

  it('calls deleteBid', () => {
    const wrapper = shallow(
      <BidTrackerCardTop {...props} />,
    );
    expect(wrapper).toBeDefined();
    wrapper.instance().onDeleteBid();
    sinon.assert.calledOnce(props.deleteBid);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidTrackerCardTop {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
