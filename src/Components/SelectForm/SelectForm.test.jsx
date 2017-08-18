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
});
