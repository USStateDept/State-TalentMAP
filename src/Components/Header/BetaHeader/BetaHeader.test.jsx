import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import { testDispatchFunctions } from '../../../testUtilities/testUtilities';
import BetaHeader, { mapDispatchToProps } from './BetaHeader';

describe('BetaHeader', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <BetaHeader.WrappedComponent />,
    );
    expect(wrapper).toBeDefined();
  });

  it('calls patchData on this.patchData()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <BetaHeader.WrappedComponent patchData={spy} />,
    );
    wrapper.instance().patchData();
    sinon.assert.calledOnce(spy);
  });

  it('updates state on this.toggleEditor()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <BetaHeader.WrappedComponent patchData={spy} />,
    );
    expect(wrapper.instance().state.editorVisible).toBe(false);
    wrapper.instance().toggleEditor();
    expect(wrapper.instance().state.editorVisible).toBe(true);
  });

  it('updates state and calls patchData on this.submit()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <BetaHeader.WrappedComponent patchData={spy} />,
    );
    wrapper.instance().setState({ editorVisible: true });
    expect(wrapper.instance().state.editorVisible).toBe(true);
    wrapper.instance().submit();
    expect(wrapper.instance().state.editorVisible).toBe(false);
    sinon.assert.calledOnce(spy);
  });

  it('updates state on this.cancel()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <BetaHeader.WrappedComponent patchData={spy} />,
    );
    wrapper.instance().setState({ editorVisible: true });
    expect(wrapper.instance().state.editorVisible).toBe(true);
    wrapper.instance().cancel();
    expect(wrapper.instance().state.editorVisible).toBe(false);
  });

  it('displays one message when there are no line breaks', () => {
    const wrapper = shallow(
      <BetaHeader.WrappedComponent data="test" />,
    );
    expect(wrapper.find('.header-row').length).toBe(1);
  });

  it('displays one message when there are three line breaks and state.headerDropdownVisible is false', () => {
    const data = 'test\n\n\ntest';
    const wrapper = shallow(
      <BetaHeader.WrappedComponent data={data} />,
    );
    expect(wrapper.find('.header-row').length).toBe(1);
  });

  it('displays two messages when there are three line breaks and state.headerDropdownVisible is true', () => {
    const data = 'test\n\n\ntest';
    const wrapper = shallow(
      <BetaHeader.WrappedComponent data={data} />,
    );
    wrapper.instance().setState({ headerDropdownVisible: true });
    wrapper.update();
    expect(wrapper.find('.header-row').length).toBe(2);
  });

  it('displays five messages when there are three line breaks and state.headerDropdownVisible is true', () => {
    const data = 'test\n\n\n  test  test 2 \n\n\ntest3\n\n\n a test\n\n\ntest  3 4 \n\n'; // add just two line breaks at end, which shouldn't trigger new message
    const wrapper = shallow(
      <BetaHeader.WrappedComponent data={data} />,
    );
    wrapper.instance().setState({ headerDropdownVisible: true });
    wrapper.update();
    expect(wrapper.find('.header-row').length).toBe(5);
  });

  it('displays the correct button text when state.headerDropdownVisible is changed', () => {
    const data = 'test\n\n\ntest';
    const wrapper = shallow(
      <BetaHeader.WrappedComponent data={data} />,
    );
    expect(wrapper.find('button').text()).toBe('2Show alerts <FontAwesome />');
    wrapper.instance().setState({ headerDropdownVisible: true });
    wrapper.update();
    expect(wrapper.find('button').text()).toBe('2Hide alerts <FontAwesome />');
  });

  it('displays the correct button text when the button is clicked', () => {
    const data = 'test\n\n\ntest';
    const wrapper = shallow(
      <BetaHeader.WrappedComponent data={data} />,
    );
    expect(wrapper.find('button').text()).toBe('2Show alerts <FontAwesome />');
    wrapper.find('button').simulate('click');
    expect(wrapper.find('button').text()).toBe('2Hide alerts <FontAwesome />');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BetaHeader.WrappedComponent />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  describe('mapDispatchToProps', () => {
    const config = {
      fetchData: [],
      patchData: [{}],
    };
    testDispatchFunctions(mapDispatchToProps, config);
  });
});
