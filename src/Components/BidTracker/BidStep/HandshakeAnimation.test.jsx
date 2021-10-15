import * as React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import HandshakeAnimation from './HandshakeAnimation';

describe('HandshakeAnimationComponent', () => {
  const props = {
    isBidTracker: true,
    isRibbon: false,
    isBidder: false,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <HandshakeAnimation {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <HandshakeAnimation {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('proper render for BidTracker prop', () => {
    const wrapper = shallow(
      <HandshakeAnimation {...props} />,
    );
    expect(wrapper.children().find('.hs-animation-bidtracker').exists()).toBe(true);

    expect(wrapper.children().find('.animate-left').exists()).toBe(false);
    expect(wrapper.children().find('.animate-right').exists()).toBe(false);
    expect(wrapper.children().find('.temp-transparent').exists()).toBe(false);
    wrapper.simulate('mouseover');
    expect(wrapper.children().find('.animate-left').exists()).toBe(true);
    expect(wrapper.children().find('.animate-right').exists()).toBe(true);
    expect(wrapper.children().find('.temp-transparent').exists()).toBe(true);
  });

  it('proper render for isRibbon prop', () => {
    const wrapper = shallow(
      <HandshakeAnimation isRibbon />,
    );
    expect(wrapper.children().find('.hs-animation-ribbon').exists()).toBe(true);

    expect(wrapper.children().find('.animate-left').exists()).toBe(false);
    expect(wrapper.children().find('.animate-left-initial').exists()).toBe(false);
    expect(wrapper.children().find('.animate-left-secondary').exists()).toBe(false);
    expect(wrapper.children().find('.animate-right').exists()).toBe(false);
    expect(wrapper.children().find('.animate-right-initial').exists()).toBe(false);
    expect(wrapper.children().find('.animate-right-secondary').exists()).toBe(false);
    expect(wrapper.children().find('.animate-hs-ribbon').exists()).toBe(false);
    expect(wrapper.children().find('.temp-transparent-ribbon').exists()).toBe(false);
    wrapper.simulate('mouseover');
    expect(wrapper.children().find('.animate-left').exists()).toBe(true);
    expect(wrapper.children().find('.animate-left-initial').exists()).toBe(true);
    expect(wrapper.children().find('.animate-left-secondary').exists()).toBe(true);
    expect(wrapper.children().find('.animate-right').exists()).toBe(true);
    expect(wrapper.children().find('.animate-right-initial').exists()).toBe(true);
    expect(wrapper.children().find('.animate-right-secondary').exists()).toBe(true);
    expect(wrapper.children().find('.animate-hs-ribbon').exists()).toBe(true);
    expect(wrapper.children().find('.temp-transparent-ribbon').exists()).toBe(true);
  });

  it('proper render for isBidder prop', () => {
    const wrapper = shallow(
      <HandshakeAnimation isBidder />,
    );
    expect(wrapper.children().find('.hs-animation-bidder').exists()).toBe(true);

    expect(wrapper.children().find('.animate-left').exists()).toBe(false);
    expect(wrapper.children().find('.animate-left-initial').exists()).toBe(false);
    expect(wrapper.children().find('.animate-left-secondary').exists()).toBe(false);
    expect(wrapper.children().find('.animate-right').exists()).toBe(false);
    expect(wrapper.children().find('.animate-right-initial').exists()).toBe(false);
    expect(wrapper.children().find('.animate-right-secondary').exists()).toBe(false);
    expect(wrapper.children().find('.animate-hs-bidder').exists()).toBe(false);
    wrapper.simulate('mouseover');
    expect(wrapper.children().find('.animate-left').exists()).toBe(true);
    expect(wrapper.children().find('.animate-left-initial').exists()).toBe(true);
    expect(wrapper.children().find('.animate-left-secondary').exists()).toBe(true);
    expect(wrapper.children().find('.animate-right').exists()).toBe(true);
    expect(wrapper.children().find('.animate-right-initial').exists()).toBe(true);
    expect(wrapper.children().find('.animate-right-secondary').exists()).toBe(true);
    expect(wrapper.children().find('.animate-hs-bidder').exists()).toBe(true);
  });
});
