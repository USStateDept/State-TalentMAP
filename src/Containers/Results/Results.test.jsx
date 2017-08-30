import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import Results from './Results';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Results', () => {
  it('is defined', () => {
    const results = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Results isAuthorized={() => true} onNavigateTo={() => {}} />
    </MemoryRouter></Provider>);
    expect(results).toBeDefined();
  });

  it('can handle authentication redirects', () => {
    const results = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Results isAuthorized={() => false} onNavigateTo={() => {}} />
    </MemoryRouter></Provider>);
    expect(results).toBeDefined();
  });

  it('can call the onChildToggle function', () => {
    const wrapper = shallow(
      <Results.WrappedComponent
        isAuthorized={() => true}
        fetchData={() => {}}
        onNavigateTo={() => {}}
        fetchFilters={() => {}}
      />,
    );
    expect(wrapper.instance().state.key).toBe(0);
    wrapper.instance().onChildToggle();
    expect(wrapper.instance().state.key).toBeGreaterThan(0);
  });

  it('can call the onQueryParamUpdate function', () => {
    const query = 'ordering=bureau&q=German';
    const wrapper = shallow(
      <Results.WrappedComponent
        isAuthorized={() => true}
        fetchData={() => {}}
        onNavigateTo={() => {}}
        fetchFilters={() => {}}
      />,
    );
    // define the instance
    const instance = wrapper.instance();
    // spy the onQueryParamUpdate function
    const handleUpdateSpy = sinon.spy(instance, 'onQueryParamUpdate');
    wrapper.instance().context.router = { history: { push: () => {} } };
    wrapper.instance().onQueryParamUpdate(query);
    sinon.assert.calledOnce(handleUpdateSpy);
  });

  it('can call the resetFilters function', () => {
    const wrapper = shallow(
      <Results.WrappedComponent
        isAuthorized={() => true}
        fetchData={() => {}}
        onNavigateTo={() => {}}
        fetchFilters={() => {}}
      />,
    );
    // define the instance
    const instance = wrapper.instance();
    // spy the onQueryParamUpdate function
    const handleUpdateSpy = sinon.spy(instance, 'resetFilters');
    wrapper.instance().context.router = { history: { push: () => {} } };
    wrapper.instance().resetFilters();
    sinon.assert.calledOnce(handleUpdateSpy);
  });

  it('can call the onQueryParamToggle function', () => {
    const wrapper = shallow(
      <Results.WrappedComponent
        isAuthorized={() => true}
        fetchData={() => {}}
        onNavigateTo={() => {}}
        fetchFilters={() => {}}
      />,
    );
    const history = { value: { search: null } };
    // define the instance
    const instance = wrapper.instance();
    // spy the onQueryParamUpdate function
    const handleUpdateSpy = sinon.spy(instance, 'onQueryParamToggle');
    wrapper.instance().context.router = { history: { push: (h) => { history.value = h; } } };
    wrapper.instance().state.query.value = 'ordering=bureau&q=German&language=1,2&skill=1';
    wrapper.instance().onQueryParamToggle('language', '1');
    sinon.assert.calledOnce(handleUpdateSpy);
    wrapper.instance().onQueryParamToggle('skill', '1');
    expect(history.value.search).toBe('language=1%2C2&ordering=bureau&q=German');
  });

  it('can call the onQueryParamToggle function and handle non-existent params', () => {
    const wrapper = shallow(
      <Results.WrappedComponent
        isAuthorized={() => true}
        fetchData={() => {}}
        onNavigateTo={() => {}}
        fetchFilters={() => {}}
      />,
    );
    const history = { value: { search: null } };
    wrapper.instance().context.router = { history: { push: (h) => { history.value = h; } } };
    wrapper.instance().state.query.value = 'ordering=bureau&q=German&language=1,2&skill=1';
    wrapper.instance().onQueryParamToggle('skill', '2');
    expect(history.value.search).toBe(null);
  });
});
