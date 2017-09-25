import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import TextInput from './TextInput';

describe('TextInputComponent', () => {
  const id = '1';

  it('is defined', () => {
    const wrapper = shallow(
      <TextInput
        id={id}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can change text', () => {
    const text = 'test';
    const wrapper = shallow(
      <TextInput
        id={id}
      />,
    );
    wrapper.instance().changeText({ target: { value: text } });
    expect(wrapper.instance().state.input.value).toBe(text);
  });

  it('can add a label', () => {
    const text = 'test';
    const wrapper = shallow(
      <TextInput
        id={id}
        label={text}
      />,
    );
    expect(wrapper.find(text)).toBeDefined();
  });

  it('can add a label message', () => {
    const text = 'test';
    const wrapper = shallow(
      <TextInput
        id={id}
        labelMessage={text}
      />,
    );
    expect(wrapper.find(text)).toBeDefined();
  });

  it('can add a sr-only class', () => {
    const wrapper = shallow(
      <TextInput
        id={id}
        labelSrOnly
      />,
    );
    expect(wrapper.find('.usa-sr-only')).toBeDefined();
  });

  it('can change based on type', () => {
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
