import { shallow } from 'enzyme';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import DraftAlert from './DraftAlert';
import bidListObject from '../../../../__mocks__/bidListObject';

describe('DraftAlertComponent', () => {
  const props = {
    id: 1,
    bid: bidListObject.results[0],
    submitBid: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <DraftAlert {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when skill and grade are undefined', () => {
    const wrapper = shallow(
      <DraftAlert
        {...props}
        bid={{ ...props.bid, position: { ...props.bid.position, skill: null, grade: null } }}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can submit a bid', () => {
    const submitSpy = sinon.spy();
    const wrapper = shallow(
      <DraftAlert {...props} submitBid={submitSpy} />,
    );
    wrapper.find('.tm-button-submit-bid').simulate('click');
    sinon.assert.calledOnce(submitSpy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <DraftAlert {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

