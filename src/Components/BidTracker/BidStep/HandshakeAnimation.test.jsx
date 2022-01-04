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

  it('proper render for BidTracker prop', (done) => {
    const wrapper = shallow(
      <HandshakeAnimation {...props} />,
    );
    expect(wrapper.children().find('.hs-animation-bidtracker').exists()).toBe(true);
    wrapper.simulate('mouseover');
    expect(wrapper.children().find('.animate-left').exists()).toBe(true);
    expect(wrapper.children().find('.animate-right').exists()).toBe(true);
    expect(wrapper.children().find('.temp-transparent').exists()).toBe(true);
    setTimeout(() => {
      expect(wrapper.children().find('.animate-left').exists()).toBe(false);
      expect(wrapper.children().find('.animate-right').exists()).toBe(false);
      expect(wrapper.children().find('.temp-transparent').exists()).toBe(false);
      done();
    }, 5000);
  });

  it('proper render for isRibbon prop', (done) => {
    const wrapper = shallow(
      <HandshakeAnimation isRibbon />,
    );
    expect(wrapper.children().find('.hs-animation-ribbon').exists()).toBe(true);
    wrapper.simulate('mouseover');
    expect(wrapper.children().find('.animate-left').exists()).toBe(true);
    expect(wrapper.children().find('.animate-left-initial').exists()).toBe(true);
    expect(wrapper.children().find('.animate-left-secondary').exists()).toBe(true);
    expect(wrapper.children().find('.animate-right').exists()).toBe(true);
    expect(wrapper.children().find('.animate-right-initial').exists()).toBe(true);
    expect(wrapper.children().find('.animate-right-secondary').exists()).toBe(true);
    expect(wrapper.children().find('.animate-hs-ribbon').exists()).toBe(true);
    expect(wrapper.children().find('.temp-transparent-ribbon').exists()).toBe(true);
    setTimeout(() => {
      expect(wrapper.children().find('.animate-left').exists()).toBe(false);
      expect(wrapper.children().find('.animate-left-initial').exists()).toBe(false);
      expect(wrapper.children().find('.animate-left-secondary').exists()).toBe(false);
      expect(wrapper.children().find('.animate-right').exists()).toBe(false);
      expect(wrapper.children().find('.animate-right-initial').exists()).toBe(false);
      expect(wrapper.children().find('.animate-right-secondary').exists()).toBe(false);
      expect(wrapper.children().find('.animate-hs-ribbon').exists()).toBe(false);
      expect(wrapper.children().find('.temp-transparent-ribbon').exists()).toBe(false);
      done();
    }, 5000);
  });

  it('proper render for isBidder prop', (done) => {
    const wrapper = shallow(
      <HandshakeAnimation isBidder />,
    );
    expect(wrapper.children().find('.hs-animation-bidder').exists()).toBe(true);
    wrapper.simulate('mouseover');
    expect(wrapper.children().find('.animate-left').exists()).toBe(true);
    expect(wrapper.children().find('.animate-left-initial').exists()).toBe(true);
    expect(wrapper.children().find('.animate-left-secondary').exists()).toBe(true);
    expect(wrapper.children().find('.animate-right').exists()).toBe(true);
    expect(wrapper.children().find('.animate-right-initial').exists()).toBe(true);
    expect(wrapper.children().find('.animate-right-secondary').exists()).toBe(true);
    expect(wrapper.children().find('.animate-hs-bidder').exists()).toBe(true);
    setTimeout(() => {
      expect(wrapper.children().find('.animate-left').exists()).toBe(false);
      expect(wrapper.children().find('.animate-left-initial').exists()).toBe(false);
      expect(wrapper.children().find('.animate-left-secondary').exists()).toBe(false);
      expect(wrapper.children().find('.animate-right').exists()).toBe(false);
      expect(wrapper.children().find('.animate-right-initial').exists()).toBe(false);
      expect(wrapper.children().find('.animate-right-secondary').exists()).toBe(false);
      expect(wrapper.children().find('.animate-hs-bidder').exists()).toBe(false);
      done();
    }, 5000);
  });
});
