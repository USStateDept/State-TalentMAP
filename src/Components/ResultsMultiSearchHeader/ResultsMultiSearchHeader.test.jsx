import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import ResultsMultiSearchHeader from './ResultsMultiSearchHeader';
import filters from '../../__mocks__/filtersArray';
import { bidderUserObject } from '../../__mocks__/userObject';

describe('ResultsMultiSearchHeaderComponent', () => {
  let wrapper = null;

  const props = {
    filters,
    userProfile: bidderUserObject,
    onUpdate: () => {},
    onSubmit: () => {},
  };

  // for testing prop updates
  const updatedProps = {
    userProfile: bidderUserObject,
    defaultFilters: {
      grade__code__in: '03',
      bureau__code__in: '04',
      q: 'german',
      // test that it can accept codes as a string or an object
      skill__code__in: [{ code: '05' }, '06'],
    },
  };

  it('is defined', () => {
    wrapper = shallow(<ResultsMultiSearchHeader
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    wrapper = shallow(<ResultsMultiSearchHeader
      {...props}
    />);
    expect(wrapper.instance().props.filters).toBe(props.filters);
  });

  it('can call the onUpdate function', () => {
    const spy = sinon.spy();
    wrapper = shallow(<ResultsMultiSearchHeader
      {...props}
      onUpdate={spy}
    />);
    wrapper.instance().props.onUpdate();
    expect(spy.calledOnce).toBe(true);
  });

  it('can call the onChangeText function', () => {
    wrapper = shallow(<ResultsMultiSearchHeader
      {...props}
    />);
    wrapper.instance().onChangeText({ target: { value: 'test' } });
    expect(wrapper.instance().state.q).toBe('test');
  });

  it('can call the onChangeBureau function', () => {
    wrapper = shallow(<ResultsMultiSearchHeader
      {...props}
    />);
    wrapper.instance().onChangeBureau({ target: { value: 'bureau' } });
    expect(wrapper.instance().state.bureau__code__in).toBe('bureau');
  });

  it('can call the onChangeGrade function', () => {
    wrapper = shallow(<ResultsMultiSearchHeader
      {...props}
    />);
    wrapper.instance().onChangeGrade({ target: { value: 'grade' } });
    expect(wrapper.instance().state.grade__code__in).toBe('grade');
  });

  it('can submit a search', () => {
    const spy = sinon.spy();
    wrapper = shallow(<ResultsMultiSearchHeader
      {...props}
      onSubmit={spy}
    />);
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    sinon.assert.calledOnce(spy);
  });

  it('can perform a callback on update', () => {
    const spy = sinon.spy();
    wrapper = shallow(<ResultsMultiSearchHeader
      {...props}
      onFilterChange={spy}
    />);
    wrapper.instance().onChangeSkills([]);
    sinon.assert.calledOnce(spy);
  });

  it('can call the submitSearch function', () => {
    const spy = sinon.spy();
    wrapper = shallow(<ResultsMultiSearchHeader
      {...props}
      onSubmit={spy}
    />);
    wrapper.instance().submitSearch({ preventDefault: () => {} });
    expect(spy.calledOnce).toBe(true);
  });

  it('can setup default values when defaultFilters are provided', () => {
    wrapper = shallow(<ResultsMultiSearchHeader
      {...props}
    />);
    const instance = wrapper.instance();
    instance.setupDefaultValues(updatedProps);
    // values from defaultFilters should be used
    expect(instance.state.defaultGrade).toBe(updatedProps.defaultFilters.grade__code__in);
    expect(instance.state.defaultBureau).toBe(updatedProps.defaultFilters.bureau__code__in);
    expect(instance.state.q).toBe(updatedProps.defaultFilters.q);
  });

  it('can perform actions upon componentWillReceiveProps', () => {
    wrapper = shallow(<ResultsMultiSearchHeader
      {...props}
    />);
    // define the instance
    const spy = sinon.spy(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.update();
    wrapper.instance().componentWillReceiveProps(updatedProps);
    sinon.assert.calledOnce(spy);
  });

  it('can return a formatted queries', () => {
    wrapper = shallow(<ResultsMultiSearchHeader
      {...props}
    />);
    const query = wrapper.instance().formatQuery();
    expect(query).toBeDefined();
  });

  it('can setup default values when no defaultFilters are provided', () => {
    wrapper = shallow(<ResultsMultiSearchHeader
      {...props}
    />);
    const instance = wrapper.instance();
    instance.setupDefaultValues(updatedProps);
    // values from userProfile should be used
    expect(instance.state.defaultGrade).toBe(updatedProps.userProfile.grade);
  });

  it('matches snapshot', () => {
    wrapper = shallow(<ResultsMultiSearchHeader
      {...props}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
