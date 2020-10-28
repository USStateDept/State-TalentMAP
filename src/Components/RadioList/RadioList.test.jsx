import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import RadioList from './RadioList';

describe('RadioListComponent', () => {
  const props = {
    options: [
      {
        id: 'a',
        name: 'a-name',
        value: 'a-value',
        label: 'a-label',
      },
      {
        id: 'b',
        name: 'b-name',
        value: 'b-value',
        label: 'b-label',
      },
    ],
    value: 'b-value',
  };

  it('is defined', () => {
    const wrapper = shallow(
      <RadioList {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('receives props', () => {
    const wrapper = shallow(
      <RadioList {...props} />,
    );
    expect(wrapper.instance().props.value).toEqual(props.value);
  });

  it('handles the onChange event', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <RadioList
        {...props}
        onChange={spy}
      />,
    );

    const input = wrapper.find('input').at(0);
    input.simulate('change', { target: { value: input.props().value } });
    expect(wrapper.instance().state.value).toBe(input.props().value);
    sinon.assert.calledOnce(spy);
  });

  it('sets new props', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <RadioList
        {...props}
        onChange={spy}
      />,
    );

    wrapper.setProps({ ...props, value: 'a-value' });
    expect(wrapper.instance().state.value).toBe('a-value');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <RadioList
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
