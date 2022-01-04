import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import { DRAFT, SUBMITTED } from '../../../Constants/BidStatuses';
import BidActions from './BidActions';

describe('BidActionsComponent', () => {
  it('is defined when status is submitted', () => {
    const wrapper = shallow(
      <BidActions
        status={SUBMITTED.property}
        onRemoveBid={() => {}}
        onSubmitBid={() => {}}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when status is not submitted', () => {
    const wrapper = shallow(
      <BidActions
        status={DRAFT.property}
        onRemoveBid={() => {}}
        onSubmitBid={() => {}}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can call functions on button click', () => {
    const removeBidSpy = sinon.spy();
    const submitBidSpy = sinon.spy();
    const wrapper = shallow(
      <BidActions
        status={DRAFT.property}
        onRemoveBid={removeBidSpy}
        onSubmitBid={submitBidSpy}
      />,
    );
    // submitting is the first button
    wrapper.find('button').at(0).simulate('click');
    sinon.assert.calledOnce(submitBidSpy);
    // deleting is the second button
    wrapper.find('button').at(1).simulate('click');
    sinon.assert.calledOnce(removeBidSpy);
  });

  it('matches snapshot when status is submitted', () => {
    const wrapper = shallow(
      <BidActions
        status={SUBMITTED.property}
        onRemoveBid={() => {}}
        onSubmitBid={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when status is not submitted', () => {
    const wrapper = shallow(
      <BidActions
        status={DRAFT.property}
        onRemoveBid={() => {}}
        onSubmitBid={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
