import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import HandshakeOfferedAlert from './HandshakeOfferedAlert';

describe('HandshakeOfferedAlertComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <HandshakeOfferedAlert id={1} userName="test" acceptBid={() => {}} declineBid={() => {}} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can accept a bid', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <HandshakeOfferedAlert id={1} userName="test" acceptBid={spy} declineBid={() => {}} />,
    );
    const button = wrapper.find('button').at(0);
    button.simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('can decline a bid', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <HandshakeOfferedAlert id={1} userName="test" acceptBid={() => {}} declineBid={spy} />,
    );
    const button = wrapper.find('button').at(1);
    button.simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <HandshakeOfferedAlert id={1} userName="test" acceptBid={() => {}} declineBid={() => {}} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
