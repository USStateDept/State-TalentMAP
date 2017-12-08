import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import HomePage from './HomePage';
import { ENDPOINT_PARAMS } from '../../Constants/EndpointParams';
import { DEFAULT_HOME_PAGE_POSITIONS } from '../../Constants/DefaultProps';
import bidListObject from '../../__mocks__/bidListObject';

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
      homePagePositions={DEFAULT_HOME_PAGE_POSITIONS}
      toggleFavorite={() => {}}
      userProfileFavoritePositionIsLoading={false}
      userProfileFavoritePositionHasErrored={false}
      toggleBid={() => {}}
      bidList={bidListObject.results}
    />);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(<HomePage
      filters={items}
      onNavigateTo={() => {}}
      homePagePositions={DEFAULT_HOME_PAGE_POSITIONS}
      toggleFavorite={() => {}}
      userProfileFavoritePositionIsLoading={false}
      userProfileFavoritePositionHasErrored={false}
      toggleBid={() => {}}
      bidList={bidListObject.results}
    />);
    expect(wrapper.instance().props.filters[0].item.title).toBe(items[0].item.title);
  });

  it('can call the onNavigateTo function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<HomePage
      filters={items}
      onNavigateTo={spy}
      homePagePositions={DEFAULT_HOME_PAGE_POSITIONS}
      toggleFavorite={() => {}}
      userProfileFavoritePositionIsLoading={false}
      userProfileFavoritePositionHasErrored={false}
      toggleBid={() => {}}
      bidList={bidListObject.results}
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
      homePagePositions={DEFAULT_HOME_PAGE_POSITIONS}
      toggleFavorite={() => {}}
      userProfileFavoritePositionIsLoading={false}
      userProfileFavoritePositionHasErrored={false}
      toggleBid={() => {}}
      bidList={bidListObject.results}
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
      homePagePositions={DEFAULT_HOME_PAGE_POSITIONS}
      toggleFavorite={() => {}}
      userProfileFavoritePositionIsLoading={false}
      userProfileFavoritePositionHasErrored={false}
      toggleBid={() => {}}
      bidList={bidListObject.results}
    />);
    wrapper.instance().submitRegion(text);
    expect(nav.value).toEqual(`/results?${ENDPOINT_PARAMS.org}=${text}`);
  });
});
