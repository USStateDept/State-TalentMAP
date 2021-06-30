import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import HandshakeOfferedAlert from './HandshakeOfferedAlert';
import bidListObject from '../../../../__mocks__/bidListObject';

describe('HandshakeOfferedAlertComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <HandshakeOfferedAlert.WrappedComponent
        id={1}
        bid={bidListObject}
        userName="test"
        acceptBidHandshake={() => {}}
        declineBidHandshake={() => {}}
      />,

    );
    expect(wrapper).toBeDefined();
  });

  it('can accept a bid', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <HandshakeOfferedAlert.WrappedComponent
        id={1}
        bid={bidListObject}
        userName="test"
        acceptBidHandshake={spy}
        declineBidHandshake={() => {}}
      />,
    );
    const button = wrapper.find('button').at(0);
    button.simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('can decline a bid', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <HandshakeOfferedAlert.WrappedComponent
        id={1}
        bid={bidListObject}
        userName="test"
        acceptBidHandshake={() => {}}
        declineBidHandshake={spy}
      />,
    );
    const button = wrapper.find('button').at(1);
    button.simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <HandshakeOfferedAlert.WrappedComponent
        id={1}
        bid={bidListObject}
        userName="test"
        acceptBidHandshake={() => {}}
        declineBidHandshake={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
