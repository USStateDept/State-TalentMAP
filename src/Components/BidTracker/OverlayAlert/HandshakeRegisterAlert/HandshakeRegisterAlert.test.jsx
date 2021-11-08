import { shallow } from 'enzyme';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import RegisterHandshakeAlert from './HandshakeRegisterAlert';
import bidListObject from '../../../../__mocks__/bidListObject';

describe('HandshakeRegisterAlert', () => {
  const props = {
    id: 1,
    bid: bidListObject.results[0],
    registerHandshake: () => {},
    unregisterHandshake: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <RegisterHandshakeAlert {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when skill and grade are undefined', () => {
    const wrapper = shallow(
      <RegisterHandshakeAlert
        {...props}
        bid={{ ...props.bid, position: { ...props.bid.position, skill: null, grade: null } }}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can call unregister', () => {
    const registerSpy = sinon.spy();
    const wrapper = shallow(
      <RegisterHandshakeAlert {...props} unregisterHandshake={registerSpy} isUnregister />,
    );
    wrapper.find('.tm-button-submit-bid').simulate('click');
    sinon.assert.calledOnce(registerSpy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <RegisterHandshakeAlert {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
