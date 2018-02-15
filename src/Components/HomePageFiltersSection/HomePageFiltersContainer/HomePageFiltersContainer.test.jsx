import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import toJSON from 'enzyme-to-json';
import { testDispatchFunctions } from '../../../testUtilities/testUtilities';
import HomePageFiltersContainer, { mapDispatchToProps } from './HomePageFiltersContainer';
import filters from '../../../__mocks__/filtersArray';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('HomePageFiltersContainerComponent', () => {
  const props = {
    filters,
    onNavigateTo: () => {},
  };

  it('is defined when connected', () => {
    const home = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <HomePageFiltersContainer
        {...props}
      />
    </MemoryRouter></Provider>);
    expect(home).toBeDefined();
  });

  it('is defined', () => {
    const wrapper = shallow(
      <HomePageFiltersContainer.WrappedComponent {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('sets state after being mounted', () => {
    const wrapper = shallow(
      <HomePageFiltersContainer.WrappedComponent {...props} />,
    );
    expect(wrapper.instance().state.filterValues.skill__code__in).toBeDefined();
  });

  it('is defined when no filters are available', () => {
    const wrapper = shallow(
      <HomePageFiltersContainer.WrappedComponent {...props} filters={[]} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can call the submitSearch function', () => {
    let qString = '';
    const onNavigateTo = (q) => { qString = q; };
    const wrapper = shallow(
      <HomePageFiltersContainer.WrappedComponent {...props} onNavigateTo={onNavigateTo} />,
    );
    wrapper.instance().onSkillSelect([{ code: '1' }]);
    wrapper.instance().submitSearch({ preventDefault: () => {} });
    expect(qString).toBe('/results?skill__code__in=1');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <HomePageFiltersContainer.WrappedComponent {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    onNavigateTo: ['/results'],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
