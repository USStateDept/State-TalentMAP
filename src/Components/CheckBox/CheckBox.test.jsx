import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
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
    const onCheckBoxClick = sinon.spy();
    const wrapper = shallow(
      <CheckBox
        id="id"
        label="label"
        title="title"
        name="name"
        value="value"
        onCheckBoxClick={onCheckBoxClick}
      />,
    );

    wrapper.instance().onCheck();
    expect(wrapper.instance().state.checked.value).toBe(false);
    expect(onCheckBoxClick.calledOnce).toBe(true);
  });

  it('can apply the base class', () => {
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

    expect(wrapper.find('.tm-checkbox').exists()).toBe(true);
  });

  it('can apply the small class', () => {
    const wrapper = shallow(
      <CheckBox
        id="id"
        label="label"
        title="title"
        name="name"
        value="value"
        onCheckBoxClick={() => {}}
        small
      />,
    );

    expect(wrapper.find('.tm-checkbox-small').exists()).toBe(true);
  });

  it('can handle the onChange event', () => {
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

    const input = wrapper.find('input');
    input.simulate('change', { target: { checked: true } });
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

  it('matches snapshot when small = true and labelSrOnly = true', () => {
    const wrapper = shallow(
      <CheckBox
        id="id"
        label="label"
        title="title"
        name="name"
        value="value"
        onCheckBoxClick={() => {}}
        small
        labelSrOnly
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
