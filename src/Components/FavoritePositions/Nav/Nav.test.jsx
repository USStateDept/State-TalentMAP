import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import Nav from './Nav';

describe('NavComponent', () => {
  const props = {
    options: [
      { title: 'Test', value: '1', numerator: 2 },
      { title: 'Test 2', value: '2', numerator: 3 },
    ],
    denominator: 5,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <Nav {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('mounts with the selection prop', () => {
    const exp = props.options[1].title;
    const wrapper = shallow(
      <Nav {...props} selected={exp} />,
    );
    expect(wrapper.instance().state.selected).toBe(exp);
  });

  it('updates the selected state if a new selected prop is set', () => {
    const exp = 'test';
    const wrapper = shallow(
      <Nav {...props} />,
    );
    wrapper.setProps({ ...props, selected: exp });
    expect(wrapper.instance().state.selected).toBe(exp);
  });

  it('sets state and calls the onClick prop when instance.onClick is called', () => {
    const exp = 'test';
    const spy = sinon.spy();
    const wrapper = shallow(
      <Nav {...props} onClick={spy} />,
    );
    wrapper.instance().onClick(exp);
    sinon.assert.calledOnce(spy);
    expect(wrapper.instance().state.selected).toBe(exp);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Nav {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
