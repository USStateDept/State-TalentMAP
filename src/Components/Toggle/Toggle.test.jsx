import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import Toggle from './Toggle';

describe('Toggle', () => {
  const props = {
    items: [{ label: 'a', value: 1, toggleClass: 'toggle-tandem-1' },
      { label: 'b', value: 2, toggleClass: 'toggle-tandem-2' },
      { label: 'Projected Vacancies', value: 'projected', toggleClass: 'toggle-pv' },
      { label: 'Open Positions', value: 'open', toggleClass: 'toggle-ap' },
      { label: 'c', value: 3, toggleClass: '' }],
  };
  const class$ = 'toggle-button--selected';

  it('is defined', () => {
    const wrapper = shallow(
      <Toggle {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('renders buttons correctly', () => {
    const wrapper = shallow(
      <Toggle {...props} />,
    );
    expect(wrapper.find('button').length).toBe(props.items.length);
    expect(wrapper.find(`.${class$}`).length).toBe(1);
  });

  it('applies initialIndex correctly', () => {
    const wrapper = shallow(
      <Toggle {...props} initialIndex={2} />,
    );
    expect(wrapper.find('button').at(0).hasClass(class$)).toBe(false);
    expect(wrapper.find('button').at(1).hasClass(class$)).toBe(false);
    expect(wrapper.find('button').at(2).hasClass(class$)).toBe(true);
  });

  it('updates state with updateVal', () => {
    const wrapper = shallow(
      <Toggle {...props} initialIndex={2} />,
    );
    const value = 2;
    wrapper.instance().updateVal(2);
    expect(wrapper.instance().state.val).toBe(value);
  });

  it('updates the selected value with onSelect()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Toggle {...props} onChange={spy} />,
    );
    // define instance
    const instance = wrapper.instance();
    // expect initial state
    expect(instance.state.val).toBe(props.items[0].value);
    // define and click button
    const button = wrapper.find('button').at(2);
    button.simulate('click', { target: { value: button.props().value } });
    // expect state change
    expect(instance.state.val).toBe(props.items[2].value);
    // expect callback with correct value
    sinon.assert.calledOnce(spy);
    expect(spy.getCall(0).args[0]).toEqual(props.items[2].value);
  });

  it('renders classes based on props', () => {
    const wrapper = shallow(
      <Toggle {...props} />,
    );
    expect(wrapper.find('button').at(0).hasClass('toggle-tandem-1')).toBe(true);
    expect(wrapper.find('button').at(1).hasClass('toggle-tandem-2')).toBe(true);
    expect(wrapper.find('button').at(2).hasClass('toggle-pv')).toBe(true);
    expect(wrapper.find('button').at(3).hasClass('toggle-ap')).toBe(true);
    expect(wrapper.find('button').at(4).hasClass('toggle-ap')).toBe(false);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Toggle {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
