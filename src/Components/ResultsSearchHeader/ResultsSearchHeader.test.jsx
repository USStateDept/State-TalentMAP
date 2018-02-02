import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import ResultsSearchHeader from './ResultsSearchHeader';

describe('ResultsSearchHeaderComponent', () => {
  let wrapper = null;

  const defaultKeyword = 'keyword';

  const props = {
    onUpdate: () => {},
    defaultKeyword,
    onFilterChange: () => {},
  };

  it('is defined', () => {
    wrapper = shallow(<ResultsSearchHeader
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  it('is defined without a defaultKeyword', () => {
    wrapper = shallow(<ResultsSearchHeader
      {...props}
      defaultKeyword={null}
    />);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    wrapper = shallow(<ResultsSearchHeader
      {...props}
    />);
    expect(wrapper.instance().props.defaultKeyword).toBe(defaultKeyword);
  });

  it('can call the onUpdate function', () => {
    const spy = sinon.spy();
    wrapper = shallow(<ResultsSearchHeader
      {...props}
      onUpdate={spy}
    />);
    wrapper.instance().props.onUpdate();
    expect(spy.calledOnce).toBe(true);
  });

  it('can call the changeText function', () => {
    wrapper = shallow(<ResultsSearchHeader
      {...props}
      onUpdate={() => {}}
    />);
    wrapper.instance().changeText('q', { target: { value: defaultKeyword } });
    expect(wrapper.instance().state.q.value).toBe(defaultKeyword);
  });

  it('can call the onChangeQueryText function', () => {
    wrapper = shallow(<ResultsSearchHeader
      {...props}
      onUpdate={() => {}}
    />);
    wrapper.instance().onChangeQueryText({ target: { value: defaultKeyword } });
    expect(wrapper.instance().state.q.value).toBe(defaultKeyword);
  });

  it('can submit a search', () => {
    const spy = sinon.spy();
    wrapper = shallow(<ResultsSearchHeader
      {...props}
      onUpdate={spy}
    />);
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(spy.calledOnce).toBe(true);
  });

  it('can call the submitSearch function', () => {
    const spy = sinon.spy();
    wrapper = shallow(<ResultsSearchHeader
      {...props}
      onUpdate={spy}
    />);
    wrapper.instance().submitSearch({ preventDefault: () => {} });
    expect(spy.calledOnce).toBe(true);
  });

  it('matches snapshot', () => {
    wrapper = shallow(<ResultsSearchHeader
      {...props}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
