import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import CheckBox from './CheckBox';

describe('CheckBoxComponent', () => {
  it('can receive props', () => {
    const wrapper = shallow(
      <CheckBox
        id="id"
        label="label"
        title="title"
        name="name"
        value="value"
        onCheckBoxClick={() => {}}
      />,
    );
    expect(wrapper.instance().props.id).toBe('id');
  });

  it('can call the onCheck function upon selection', () => {
    const wrapper = shallow(
      <CheckBox
        id="id"
        label="label"
        title="title"
        name="name"
        value="value"
        onCheckBoxClick={() => {}}
      />,
    );
    wrapper.instance().onCheck();
    expect(wrapper.instance().state.checked.value).toBe(false);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <CheckBox
        id="id"
        label="label"
        title="title"
        name="name"
        value="value"
        onCheckBoxClick={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
