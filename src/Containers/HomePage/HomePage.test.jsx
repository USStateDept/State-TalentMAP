import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import HomePage from './HomePage';
import ENDPOINT_PARAMS from '../../Constants/EndpointParams';

describe('HomePageComponent', () => {
  const items = [{
    item: { title: 'title', selectionRef: 'ref' },
    data: [{ isSelected: true }],
  },
  {
    item: { title: 'Region', selectionRef: 'ref2' },
    data: [{ isSelected: false }],
  },
  ];

  it('is defined', () => {
    const wrapper = shallow(<HomePage
      filters={items}
      onNavigateTo={() => {}}
    />);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(<HomePage
      filters={items}
      onNavigateTo={() => {}}
    />);
    expect(wrapper.instance().props.filters[0].item.title).toBe(items[0].item.title);
  });

  it('can call the onNavigateTo function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<HomePage
      filters={items}
      onNavigateTo={spy}
    />);
    wrapper.instance().props.onNavigateTo();
    sinon.assert.calledOnce(spy);
  });

  it('can call the submitSearch function', () => {
    const nav = { value: null };
    const text = 'test';
    const wrapper = shallow(<HomePage
      filters={items}
      onNavigateTo={(q) => { nav.value = q; }}
    />);
    wrapper.instance().submitSearch({ q: text });
    expect(nav.value).toEqual(`/results?q=${text}`);
  });

  it('can call the submitRegion function', () => {
    const nav = { value: null };
    const text = 'test';
    const wrapper = shallow(<HomePage
      filters={items}
      onNavigateTo={(q) => { nav.value = q; }}
    />);
    wrapper.instance().submitRegion(text);
    expect(nav.value).toEqual(`/results?${ENDPOINT_PARAMS.org}=${text}`);
  });
});
