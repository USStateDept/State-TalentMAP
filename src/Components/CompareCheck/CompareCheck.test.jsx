import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import CompareCheck from './CompareCheck';
import COMPARE_LIMIT from '../../Constants/Compare';

describe('CompareCheck', () => {
  let compareCheck = null;

  beforeEach(() => {
    compareCheck = TestUtils.renderIntoDocument(<CompareCheck refKey="0036" type="compare" />);
  });

  it('is defined', () => {
    expect(compareCheck).toBeDefined();
  });

  it('can accept different kinds of props', () => {
    const wrapper = shallow(
      <CompareCheck refKey="0037" type="compare" />,
    );
    expect(wrapper).toBeDefined();
    const compareCheckOther = shallow(
      <CompareCheck refKey="0037" type="other" />,
    );
    expect(compareCheckOther).toBeDefined();
  });

  // TODO - lifecycle is being handled differently with React 16 update? Fix this test.
  xit('can add a compareCheck', () => {
    const wrapper = shallow(<CompareCheck refKey="0036" />);
    wrapper.find('InteractiveElement').simulate('click');
    expect(wrapper.instance().state.saved).toBe(true);
  });

  // TODO - lifecycle is being handled differently with React 16 update? Fix this test.
  xit('can add and remove a compareCheck', () => {
    const wrapper = shallow(<CompareCheck refKey="0037" />);
    wrapper.find('InteractiveElement').simulate('click');
    expect(wrapper.instance().state.saved).toBe(true);
    wrapper.find('InteractiveElement').simulate('click');
    expect(wrapper.instance().state.saved).toBe(false);
  });

  it('handles disabling when count is reached', () => {
    const wrapper = shallow(<CompareCheck refKey="0038" />);
    wrapper.instance().state.count = COMPARE_LIMIT + 1; // greater than default limit.
    wrapper.find('InteractiveElement').simulate('click');
    expect(wrapper.instance().state.saved).toBe(false); // should not be able to add another compare
  });

  it('handles disabling when count is reached and saved state is true', () => {
    const wrapper = shallow(<CompareCheck refKey="0038" />);
    wrapper.instance().state.count = COMPARE_LIMIT + 1; // greater than default limit
    wrapper.instance().state.saved = true;
    wrapper.find('InteractiveElement').simulate('click');
    expect(wrapper.instance().state.saved).toBe(false);
  });

  it('calls removeEventListener() on componentWillUnmount', () => {
    const wrapper = shallow(<CompareCheck refKey="0038" />);
    const spy = sinon.spy();
    window.removeEventListener = spy;
    wrapper.instance().componentWillUnmount();
    sinon.assert.calledOnce(spy);
  });

  it('applies props when isDisabled() returns true', () => {
    const wrapper = shallow(<CompareCheck refKey="0038" />);
    wrapper.setState({ saved: false, count: 500000 });
    wrapper.update();
    expect(wrapper.instance().isDisabled()).toBe(true);
    expect(wrapper.find('InteractiveElement').props().disabled).toBe(true);
  });
});
