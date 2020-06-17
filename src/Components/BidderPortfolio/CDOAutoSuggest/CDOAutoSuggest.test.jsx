import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import CDOAutoSuggest, { renderList } from './CDOAutoSuggest';

describe('renderList', () => {
  it('render', () => {
    const wrapper = renderList({ items: [{ id: 1 }, { id: 2 }], selected: [{ id: 1 }] });
    expect(wrapper).toBeDefined();
  });
});

describe('CDOAutoSuggest', () => {
  const props = {
    cdos: [
      { first_name: 'John', last_name: 'Daniels', id: 3, hru_id: 3 },
      { first_name: 'Mary', last_name: 'Brown', id: 4, hru_ud: 4 },
    ],
    selection: [{ first_name: 'Mary', last_name: 'Brown', id: 4 }],
    isLoading: false,
    hasErrored: false,
    setCDOsToSearchBy: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(<CDOAutoSuggest.WrappedComponent {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('is defined after new props', () => {
    const wrapper = shallow(<CDOAutoSuggest.WrappedComponent {...props} />);
    wrapper.setProps(props);
    expect(wrapper).toBeDefined();
  });

  it('calls the prop on onSuggestionSelected()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<CDOAutoSuggest.WrappedComponent {...props} setCDOsToSearchBy={spy} />);
    wrapper.instance().selectMultipleOption([props.cdos[0]]);
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<CDOAutoSuggest.WrappedComponent {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
