import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import HoverDescription from './HoverDescription';

describe('HoverDescriptionComponent', () => {
  const timeout = 500;
  const props = {
    getOffsetPx: () => '5px',
    text: 'Capsule description',
    id: 1,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <HoverDescription
        {...props}
      />);
    expect(wrapper).toBeDefined();
  });

  it('sets state on toggleVisibility()', (done) => {
    const wrapper = shallow(
      <HoverDescription
        {...props}
      />);
    const instance = wrapper.instance();
    instance.toggleVisibility(true);
    setTimeout(() => {
      expect(instance.state.expanded).toBe(true);
      done();
    }, timeout);
  });

  it('sets state on toggle()', (done) => {
    const wrapper = shallow(
      <HoverDescription
        {...props}
      />);
    const instance = wrapper.instance();
    instance.toggle();
    setTimeout(() => {
      expect(instance.state.expanded).toBe(true);
      done();
    }, timeout);
  });

  it('sets state to true on expand()', (done) => {
    const wrapper = shallow(
      <HoverDescription
        {...props}
      />);
    const instance = wrapper.instance();
    instance.expand();
    setTimeout(() => {
      expect(instance.state.expanded).toBe(true);
      done();
    }, timeout);
  });

  it('sets state to close on close()', (done) => {
    const wrapper = shallow(
      <HoverDescription
        {...props}
      />);
    const instance = wrapper.instance();
    instance.close();
    setTimeout(() => {
      expect(instance.state.expanded).toBe(false);
      done();
    }, timeout);
  });

  it('sets state on toggle()', (done) => {
    const wrapper = shallow(
      <HoverDescription
        {...props}
      />);
    const instance = wrapper.instance();
    instance.toggle();
    setTimeout(() => {
      expect(instance.state.expanded).toBe(true);
      done();
    }, timeout);
  });

  it('sets state on toggleCardHovered()', (done) => {
    const wrapper = shallow(
      <HoverDescription
        {...props}
      />);
    const instance = wrapper.instance();
    instance.toggleCardHovered(true);
    setTimeout(() => {
      expect(instance.state.cardHovered).toBe(true);
      done();
    }, timeout);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <HoverDescription
        {...props}
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when expanded === true', () => {
    const wrapper = shallow(
      <HoverDescription
        {...props}
      />);
    wrapper.instance().setState({ expanded: true });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
