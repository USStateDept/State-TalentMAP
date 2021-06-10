import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import { DRAFT, SUBMITTED } from '../../Constants/BidStatuses';
import BidListResultsCard from './BidListResultsCard';

describe('BidListResultsCardComponent', () => {
  const bid = {
    id: 1,
    status: SUBMITTED.property,
    post: 'Paris',
    position_info: {
      id: 2,
      position: {
        id: 2,
        position_number: '05A',
        title: 'AO',
        bid_statistics: [{
          id: 4,
          bidcycle: 'Demo BidCycle 2018-01-10 15:52:20.583434',
          user: 'Jenny Townpost',
          draft: 3,
          submitted: 4,
          handshake_offered: 3,
          handshake_accepted: 0,
          handshake_declined: 0,
          in_panel: 0,
          approved: 0,
          declined: 0,
          closed: 0,
        }],
      },
    },
  };
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
        bid={{ ...bid, post: null, update_date: '01/02/2000', create_date: '01/01/2000' }}
        toggleBidPosition={() => {}}
        submitBid={() => {}}
      />,
    );
    expect(wrapper.instance().props.bid.id).toBe(bid.id);
  });

  it('can call functions', () => {
    const toggleBidSpy = sinon.spy();
    const submitBidSpy = sinon.spy();
    const bidOtherStatus = Object.assign({}, bid, { status: DRAFT.property });
    const wrapper = shallow(
      <BidListResultsCard
        bid={bidOtherStatus}
        toggleBidPosition={toggleBidSpy}
        submitBid={submitBidSpy}
      />,
    );
    wrapper.instance().submitBid();
    sinon.assert.calledOnce(submitBidSpy);
    // deleting is the second button
    wrapper.instance().removeBidPosition();
    sinon.assert.calledOnce(toggleBidSpy);
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
