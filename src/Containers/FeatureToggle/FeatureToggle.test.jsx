import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import FeatureToggle from './FeatureToggle';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('FeatureToggleContainer', () => {
  it('renders children when feature is enabled', () => {
    const enabledFeature = 'testFeature';
    const testFeature = <div className={enabledFeature}>TEST FEATURE</div>;
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({ features: [enabledFeature] })}><MemoryRouter>
        <FeatureToggle name={enabledFeature}>
          { testFeature }
        </FeatureToggle>
      </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
    expect(TestUtils.scryRenderedDOMComponentsWithClass(wrapper, enabledFeature).length).toBe(1);
  });

  it('renders null when feature is not enabled', () => {
    const enabledFeature = 'testFeature';
    const testFeature = <div className={enabledFeature}>TEST FEATURE</div>;
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({ features: [] })}><MemoryRouter>
        <FeatureToggle name={enabledFeature}>
          { testFeature }
        </FeatureToggle>
      </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
    expect(TestUtils.scryRenderedDOMComponentsWithClass(wrapper, enabledFeature).length).toBe(0);
  });
});
