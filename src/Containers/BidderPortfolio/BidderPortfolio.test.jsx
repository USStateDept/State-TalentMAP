import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import BidderPortfolio from './BidderPortfolio';

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
      <BidderPortfolio.WrappedComponent />,
    );
    wrapper.instance().onQueryParamUpdate({ q: 'test' });
    wrapper.instance().onQueryParamUpdate({ page: 2 });
    expect(wrapper.instance().state.query.value).toBe('page=2&q=test');
  });
});
