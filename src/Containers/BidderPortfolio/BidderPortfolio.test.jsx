import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import BidderPortfolio, { mapDispatchToProps } from './BidderPortfolio';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('BidderPortfolio', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <BidderPortfolio />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('can call the onQueryParamUpdate function', () => {
    const wrapper = shallow(
      <BidderPortfolio.WrappedComponent
        fetchBidderPortfolioCounts={() => {}}
      />,
    );
    wrapper.instance().onQueryParamUpdate({ q: 'test' });
    wrapper.instance().onQueryParamUpdate({ page: 2 });
    expect(wrapper.instance().state.query.value).toBe('page=2&q=test');
  });

  it('can call the mapToType function', () => {
    const wrapper = shallow(
      <BidderPortfolio.WrappedComponent
        fetchBidderPortfolioCounts={() => {}}
      />,
    );
    wrapper.instance().state.query.value = 'type=all';
    wrapper.instance().mapTypeToQuery();
    expect(wrapper.instance().state.query.value).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  testDispatchFunctions(mapDispatchToProps);
});
