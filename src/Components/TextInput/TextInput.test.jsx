import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import TextInput from './TextInput';

describe('TextInputComponent', () => {
  const id = '1';
  const value = 'test';

  it('is defined', () => {
    const wrapper = shallow(
      <TextInput
        id={id}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('calls changeText() on text change', () => {
    const spy = sinon.spy();
    let wrapper;
    act(() => {
      wrapper = mount(
        <TextInput
          id={id}
          changeText={spy}
        />,
      );
    });
    wrapper.find('input').simulate('change', { target: { value } });
    sinon.assert.calledOnce(spy);
  });

  it('changes text', () => {
    const wrapper = shallow(
      <TextInput
        id={id}
      />,
    );
    wrapper.find('input').simulate('change', { target: { value } });
    expect(wrapper.find('input').prop('value')).toEqual(value);
  });

  it('renders a label', () => {
    const text = 'test';
    const wrapper = shallow(
      <TextInput
        id={id}
        label={text}
      />,
    );
    expect(wrapper.find(text)).toBeDefined();
  });

  it('renders a label message', () => {
    const text = 'test';
    const wrapper = shallow(
      <TextInput
        id={id}
        labelMessage={text}
      />,
    );
    expect(wrapper.find(text)).toBeDefined();
  });

  it('renders a sr-only class', () => {
    const wrapper = shallow(
      <TextInput
        id={id}
        labelSrOnly
      />,
    );
    expect(wrapper.find('.usa-sr-only')).toBeDefined();
  });

  it('renders different classNames based on type', () => {
    let wrapper = shallow(
      <TextInput
        id={id}
        type="success"
      />,
    );
    expect(wrapper.find('.usa-input-success')).toBeDefined();
    wrapper = shallow(
      <TextInput
        id={id}
        type="error"
      />,
    );
    expect(wrapper.find('.usa-input-error-message')).toBeDefined();
    expect(wrapper.find('.input-error')).toBeDefined();
    expect(wrapper.find('.usa-input-error')).toBeDefined();
    wrapper = shallow(
      <TextInput
        id={id}
        type="focus"
      />,
    );
    expect(wrapper.find('.usa-input-focus')).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <TextInput
        id={id}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
