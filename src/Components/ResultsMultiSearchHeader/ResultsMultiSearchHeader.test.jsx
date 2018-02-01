import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import ResultsMultiSearchHeader from './ResultsMultiSearchHeader';

describe('ResultsMultiSearchHeaderComponent', () => {
  let wrapper = null;

  const defaultKeyword = 'keyword';
  const defaultLocation = 'a location';

  it('is defined', () => {
    wrapper = shallow(<ResultsMultiSearchHeader
      onUpdate={() => {}}
    />);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    wrapper = shallow(<ResultsMultiSearchHeader
      onUpdate={() => {}}
      defaultKeyword={defaultKeyword}
      defaultLocation={defaultLocation}
    />);
    expect(wrapper.instance().props.defaultKeyword).toBe(defaultKeyword);
  });

  it('can call the onUpdate function', () => {
    const spy = sinon.spy();
    wrapper = shallow(<ResultsMultiSearchHeader
      onUpdate={spy}
      defaultKeyword={defaultKeyword}
      defaultLocation={defaultLocation}
    />);
    wrapper.instance().props.onUpdate();
    expect(spy.calledOnce).toBe(true);
  });

  it('can call the changeText function', () => {
    wrapper = shallow(<ResultsMultiSearchHeader
      onUpdate={() => {}}
      defaultKeyword={defaultKeyword}
      defaultLocation={defaultLocation}
    />);
    wrapper.instance().changeText('q', { target: { value: defaultKeyword } });
    expect(wrapper.instance().state.q.value).toBe(defaultKeyword);
  });

  it('can call the onChangeQueryText function', () => {
    wrapper = shallow(<ResultsMultiSearchHeader
      onUpdate={() => {}}
      defaultKeyword={defaultKeyword}
      defaultLocation={defaultLocation}
    />);
    wrapper.instance().onChangeQueryText({ target: { value: defaultKeyword } });
    expect(wrapper.instance().state.q.value).toBe(defaultKeyword);
  });

  it('can submit a search', () => {
    const spy = sinon.spy();
    wrapper = shallow(<ResultsMultiSearchHeader
      onUpdate={spy}
      defaultKeyword={defaultKeyword}
      defaultLocation={defaultLocation}
    />);
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(spy.calledOnce).toBe(true);
  });

  it('can call the submitSearch function', () => {
    const spy = sinon.spy();
    wrapper = shallow(<ResultsMultiSearchHeader
      onUpdate={spy}
      defaultKeyword={defaultKeyword}
      defaultLocation={defaultLocation}
    />);
    wrapper.instance().submitSearch({ preventDefault: () => {} });
    expect(spy.calledOnce).toBe(true);
  });

  it('matches snapshot', () => {
    wrapper = shallow(<ResultsMultiSearchHeader
      onUpdate={() => {}}
      defaultKeyword={defaultKeyword}
      defaultLocation={defaultLocation}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
