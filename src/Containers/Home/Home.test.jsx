import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Home from './Home';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Home', () => {
  const api = 'http://localhost:8000/api/v1';

  it('is defined', () => {
    const home = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Home isAuthorized={() => true} api={api} onNavigateTo={() => {}} />
    </MemoryRouter></Provider>);
    expect(home).toBeDefined();
  });

  it('can handle authentication redirects', () => {
    const home = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Home isAuthorized={() => false} api={api} onNavigateTo={() => {}} />
    </MemoryRouter></Provider>);
    expect(home).toBeDefined();
  });

  it('can call the onChildSubmit function', () => {
    const wrapper = shallow(<Home.WrappedComponent
      isAuthorized={() => true}
      api={api}
      onNavigateTo={() => {}}
    />);
    wrapper.instance().onChildSubmit();
  });
});
