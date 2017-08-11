import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Share from './Share';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Main', () => {
  const api = 'http://localhost:8000/api/v1';

  it('is defined', () => {
    const share = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Share api={api} identifier={5} />
    </MemoryRouter></Provider>);
    expect(share).toBeDefined();
  });

  it('can call the onChildSend function', () => {
    const wrapper = shallow(
      <Share.WrappedComponent api="test" identifier={1} onNavigateTo={() => {}} />,
    );
    wrapper.instance().onChildSend();
  });
});
