import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import SelectForm from './SelectForm';
import { POSITION_SEARCH_SORTS } from '../../Constants/Sort';

describe('SelectForm', () => {
  let wrapper = null;

  it('is defined', () => {
    wrapper = shallow(<SelectForm
      id={1}
      label="Some label"
      defaultSort=""
      options={POSITION_SEARCH_SORTS.options}
      onSelectOption={() => {}}
    />);
    expect(wrapper).toBeDefined();
  });

  it('can receive different props', () => {
    wrapper = shallow(<SelectForm
      id={2}
      label="Some label"
      defaultSort=""
      options={POSITION_SEARCH_SORTS.options}
      onSelectOption={() => {}}
    />);
    expect(wrapper.instance().props.id).toBe(2);
  });

  it('can select an option', () => {
    wrapper = shallow(<SelectForm
      id={2}
      label="Some label"
      defaultSort=""
      options={POSITION_SEARCH_SORTS.options}
      onSelectOption={() => {}}
    />);
    wrapper.find('select').simulate('change', { target: { value: 25 } });
    expect(wrapper.instance().state.selection).toBe(25);
  });

  it('can perform actions upon componentWillReceiveProps', () => {
    wrapper = shallow(<SelectForm
      id={1}
      label="Some label"
      defaultSort=""
      options={POSITION_SEARCH_SORTS.options}
      onSelectOption={() => {}}
    />);
    // define the instance
    const spy = sinon.spy(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.update();
    wrapper.instance().componentWillReceiveProps({ includeFirstEmptyOption: true, defaultSort: '2' });
    sinon.assert.calledOnce(spy);
  });

  it('can call the selectOption function', () => {
    wrapper = shallow(<SelectForm
      id={1}
      label="Some label"
      defaultSort=""
      options={POSITION_SEARCH_SORTS.options}
      onSelectOption={() => {}}
    />);
    // define the instance
    const instance = wrapper.instance();
    // spy the selectOption function
    const handleSelectSpy = sinon.spy(instance, 'selectOption');
    instance.selectOption({ target: { value: '' } });
    sinon.assert.calledOnce(handleSelectSpy);
  });

  it('can call the setDefaultValue function', () => {
    wrapper = shallow(<SelectForm
      id={1}
      label="Some label"
      defaultSort=""
      options={POSITION_SEARCH_SORTS.options}
      onSelectOption={() => {}}
    />);
    // define the instance
    const instance = wrapper.instance();
    const defaultSort = POSITION_SEARCH_SORTS.options[1];
    instance.setDefaultValue({ includeFirstEmptyOption: true, defaultSort });
    expect(instance.state.selection).toBe(defaultSort);
  });

  it('matches snapshot', () => {
    wrapper = shallow(<SelectForm
      id={1}
      label="Some label"
      defaultSort=""
      options={POSITION_SEARCH_SORTS.options}
      onSelectOption={() => {}}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when disabled', () => {
    wrapper = shallow(<SelectForm
      id={1}
      label="Some label"
      defaultSort=""
      options={POSITION_SEARCH_SORTS.options}
      onSelectOption={() => {}}
      disabled
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
