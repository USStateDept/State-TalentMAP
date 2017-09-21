import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import Profile from './Profile';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Profile', () => {
  it('is defined', () => {
    const profile = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Profile isAuthorized={() => true} onNavigateTo={() => {}} />
    </MemoryRouter></Provider>);
    expect(profile).toBeDefined();
  });

  it('can call the onToggleFavorite function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Profile.WrappedComponent
        isAuthorized={() => true}
        onNavigateTo={() => {}}
        fetchData={() => {}}
        toggleFavorite={spy}
      />,
    );
    wrapper.instance().onToggleFavorite();
    sinon.assert.calledOnce(spy);
  });

  it('can handle authentication redirects', () => {
    const profile = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Profile isAuthorized={() => false} onNavigateTo={() => {}} />
    </MemoryRouter></Provider>);
    expect(profile).toBeDefined();
  });
});
