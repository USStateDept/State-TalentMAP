import { shallow } from 'enzyme';
import React from 'react';
import ShareButton from './ShareButton';

describe('ShareButton', () => {
  const shareButton = null;
  let wrapper = null;
  let alertText = null;

  beforeEach(() => {
    alertText = 'This is not a state.gov email. Send with caution.';
    wrapper = shallow(<ShareButton identifier={5} />);
  });

  it('is defined', () => {
    expect(shareButton).toBeDefined();
  });

  it('can enter a state.gov email', () => {
    const email = 'test@state.gov';
    wrapper.find('#share-input').simulate('change', { target: { value: email } });
    expect(wrapper.instance().state.recipient).toBe(email);
  });

  it('can enter a non-state.gov email', () => {
    const email = 'test@foobar.com';
    wrapper.find('#share-input').simulate('change', { target: { value: email } });
    expect(wrapper.instance().state.recipient).toBe(email);
  });

  it('can alert the user of sharing with a non-state.gov email', () => {
    const stateEmail = 'test@state.gov';
    wrapper.find('#share-input').simulate('change', { target: { value: stateEmail } });
    expect(wrapper.contains(alertText)).toBe(false);
    const otherEmail = 'test@foobar.com';
    wrapper.find('#share-input').simulate('change', { target: { value: otherEmail } });
    expect(wrapper.contains(alertText)).toBe(true);
  });

  it('can take different props', () => {
    wrapper = shallow(<ShareButton identifier={5} isSending />);
    expect(wrapper).toBeDefined();
    wrapper = shallow(<ShareButton identifier={5} hasErrored />);
    expect(wrapper).toBeDefined();
    wrapper = shallow(<ShareButton response isSending identifier={5} />);
    wrapper.instance().state.timeout = true;
    expect(wrapper).toBeDefined();
  });

  it('can call the createTimeout function', (done) => {
    wrapper = shallow(<ShareButton response identifier={5} />);
    const f = (ms) => {
      wrapper.instance().createTimeout(ms);
      expect(wrapper.instance().state.timeout).toBe(true);
      setTimeout(() => {
        expect(wrapper.instance().state.timeout).toBe(false);
        done();
      }, (ms + 50));
    };
    f(50);
  });

  it('can submit an external share', () => {
    expect(wrapper.instance().state.timeout).toBe(false);
    const email = 'test@state.gov';
    wrapper.find('#share-input').simulate('change', { target: { value: email } });
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(wrapper.instance().state.timeout).toBe(true);
  });

  it('can submit an internal share', () => {
    expect(wrapper.instance().state.timeout).toBe(false);
    const email = 'test@state.gov';
    wrapper.find('#share-input').simulate('change', { target: { value: email } });
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(wrapper.instance().state.timeout).toBe(true);
  });
});
