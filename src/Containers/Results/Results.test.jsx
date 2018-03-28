import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import Results, { mapDispatchToProps } from './Results';
import resultsObject from '../../__mocks__/resultsObject';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Results', () => {
  const debounceTimeInMs = 500;
  it('is defined', () => {
    const results = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Results
        results={resultsObject}
        isAuthorized={() => true}
        onNavigateTo={() => {}}
        setAccordion={() => {}}
        toggleFavorite={() => {}}
        saveSearch={() => {}}
        resetSavedSearchAlerts={() => {}}
        fetchMissionAutocomplete={() => {}}
        missionSearchResults={[]}
        missionSearchIsLoading={false}
        missionSearchHasErrored={false}
        fetchPostAutocomplete={() => {}}
        postSearchResults={[]}
        postSearchIsLoading={false}
        postSearchHasErrored={false}
      />
    </MemoryRouter></Provider>);
    expect(results).toBeDefined();
  });

  it('can handle authentication redirects', () => {
    const results = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Results
        results={resultsObject}
        isAuthorized={() => false}
        onNavigateTo={() => {}}
        setAccordion={() => {}}
        toggleFavorite={() => {}}
        saveSearch={() => {}}
        resetSavedSearchAlerts={() => {}}
        fetchMissionAutocomplete={() => {}}
        missionSearchResults={[]}
        missionSearchIsLoading={false}
        missionSearchHasErrored={false}
        fetchPostAutocomplete={() => {}}
        postSearchResults={[]}
        postSearchIsLoading={false}
        postSearchHasErrored={false}
      />
    </MemoryRouter></Provider>);
    expect(results).toBeDefined();
  });

  it('can call the onQueryParamUpdate function', () => {
    const query = { ordering: 'bureau', q: 'German' };
    const wrapper = shallow(
      <Results.WrappedComponent
        results={resultsObject}
        isAuthorized={() => true}
        fetchData={() => {}}
        onNavigateTo={() => {}}
        fetchFilters={() => {}}
        setAccordion={() => {}}
        toggleFavorite={() => {}}
        saveSearch={() => {}}
        fetchMissionAutocomplete={() => {}}
        missionSearchResults={[]}
        missionSearchIsLoading={false}
        missionSearchHasErrored={false}
        fetchPostAutocomplete={() => {}}
        postSearchResults={[]}
        postSearchIsLoading={false}
        postSearchHasErrored={false}
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

  it('can handle filters being already fetched', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Results.WrappedComponent
        results={resultsObject}
        isAuthorized={() => true}
        fetchData={() => {}}
        onNavigateTo={() => {}}
        fetchFilters={spy}
        setAccordion={() => {}}
        filters={{ hasFetched: true }}
        toggleFavorite={() => {}}
        saveSearch={() => {}}
        fetchMissionAutocomplete={() => {}}
        missionSearchResults={[]}
        missionSearchIsLoading={false}
        missionSearchHasErrored={false}
        fetchPostAutocomplete={() => {}}
        postSearchResults={[]}
        postSearchIsLoading={false}
        postSearchHasErrored={false}
      />,
    );
    expect(wrapper.instance().props.filters.hasFetched).toBe(true);
    sinon.assert.calledOnce(spy);
  });

  it('can call the saveSearch function', () => {
    const savedSearch = { q: null, id: null };
    const wrapper = shallow(
      <Results.WrappedComponent
        results={resultsObject}
        isAuthorized={() => true}
        fetchData={() => {}}
        onNavigateTo={() => {}}
        fetchFilters={() => {}}
        setAccordion={() => {}}
        toggleFavorite={() => {}}
        saveSearch={(q, id) => { savedSearch.q = q; savedSearch.id = id; }}
        fetchMissionAutocomplete={() => {}}
        missionSearchResults={[]}
        missionSearchIsLoading={false}
        missionSearchHasErrored={false}
        fetchPostAutocomplete={() => {}}
        postSearchResults={[]}
        postSearchIsLoading={false}
        postSearchHasErrored={false}
      />,
    );
    wrapper.instance().saveSearch('test', 1);
    expect(savedSearch.q.name).toBe('test');
    expect(savedSearch.id).toBe(1);
  });

  it('can call the onQueryParamToggle function when removing a param', (done) => {
    const wrapper = shallow(
      <Results.WrappedComponent
        results={resultsObject}
        isAuthorized={() => true}
        fetchData={() => {}}
        onNavigateTo={() => {}}
        fetchFilters={() => {}}
        setAccordion={() => {}}
        toggleFavorite={() => {}}
        saveSearch={() => {}}
        fetchMissionAutocomplete={() => {}}
        missionSearchResults={[]}
        missionSearchIsLoading={false}
        missionSearchHasErrored={false}
        fetchPostAutocomplete={() => {}}
        postSearchResults={[]}
        postSearchIsLoading={false}
        postSearchHasErrored={false}
        pageTitle="Results"
        debounceTimeInMs={debounceTimeInMs}
      />,
    );
    // define the instance
    const instance = wrapper.instance();
    instance.state.query.value = 'language=1&skill=2';
    // remove the skill
    instance.onQueryParamToggle('language', '1', true);

    const f = () => {
      setTimeout(() => {
        // make sure the skill was removed
        expect(instance.state.query.value).toBe('skill=2');
        done();
      }, debounceTimeInMs + 100);
    };
    f();
  });

  it('can call the onQueryParamToggle function when adding a param value and that param already exists', (done) => {
    const wrapper = shallow(
      <Results.WrappedComponent
        results={resultsObject}
        isAuthorized={() => true}
        fetchData={() => {}}
        onNavigateTo={() => {}}
        fetchFilters={() => {}}
        setAccordion={() => {}}
        toggleFavorite={() => {}}
        saveSearch={() => {}}
        fetchMissionAutocomplete={() => {}}
        missionSearchResults={[]}
        missionSearchIsLoading={false}
        missionSearchHasErrored={false}
        fetchPostAutocomplete={() => {}}
        postSearchResults={[]}
        postSearchIsLoading={false}
        postSearchHasErrored={false}
        pageTitle="Results"
        debounceTimeInMs={debounceTimeInMs}
      />,
    );
    // define the instance
    const instance = wrapper.instance();
    instance.state.query.value = 'language=1&skill=2';
    // remove the skill
    instance.onQueryParamToggle('language', '2', false);

    const f = () => {
      setTimeout(() => {
        // make sure the skill was removed
        expect(instance.state.query.value).toBe('language=1%2C2&skill=2');
        done();
      }, debounceTimeInMs + 100);
    };
    f();
  });

  it('can call the onQueryParamToggle function when adding a param value and that param does not exist', (done) => {
    const wrapper = shallow(
      <Results.WrappedComponent
        results={resultsObject}
        isAuthorized={() => true}
        fetchData={() => {}}
        onNavigateTo={() => {}}
        fetchFilters={() => {}}
        setAccordion={() => {}}
        toggleFavorite={() => {}}
        saveSearch={() => {}}
        fetchMissionAutocomplete={() => {}}
        missionSearchResults={[]}
        missionSearchIsLoading={false}
        missionSearchHasErrored={false}
        fetchPostAutocomplete={() => {}}
        postSearchResults={[]}
        postSearchIsLoading={false}
        postSearchHasErrored={false}
        pageTitle="Results"
        debounceTimeInMs={debounceTimeInMs}
      />,
    );
    // define the instance
    const instance = wrapper.instance();
    instance.state.query.value = 'language=1&skill=2';
    // remove the skill
    instance.onQueryParamToggle('newFilter', '2', false);

    const f = () => {
      setTimeout(() => {
        // make sure the skill was removed
        expect(instance.state.query.value).toBe('language=1&newFilter=2&skill=2');
        done();
      }, debounceTimeInMs + 100);
    };
    f();
  });

  it('can call the onQueryParamToggle function and handle removing non-existent params', () => {
    const wrapper = shallow(
      <Results.WrappedComponent
        results={resultsObject}
        isAuthorized={() => true}
        fetchData={() => {}}
        onNavigateTo={() => {}}
        fetchFilters={() => {}}
        setAccordion={() => {}}
        toggleFavorite={() => {}}
        saveSearch={() => {}}
        fetchMissionAutocomplete={() => {}}
        missionSearchResults={[]}
        missionSearchIsLoading={false}
        missionSearchHasErrored={false}
        fetchPostAutocomplete={() => {}}
        postSearchResults={[]}
        postSearchIsLoading={false}
        postSearchHasErrored={false}
      />,
    );
    const history = { value: { search: null } };
    wrapper.instance().context.router = { history: { push: (h) => { history.value = h; } } };
    wrapper.instance().state.query.value = 'language=1&ordering=bureau&q=German&skill=1';
    wrapper.instance().onQueryParamToggle('skill', '2', true);
    // There wasn't a change, so we should refresh the page - i.e., value.search
    // shouldn't change.
    expect(history.value.search).toBe(null);
  });

  it('can handle routerLocations upon mount', () => {
    global.scrollTo = jest.fn();
    const routerLocations = [{ pathname: 'test' }, { pathname: 'test2' }];
    const wrapper = shallow(
      <Results.WrappedComponent
        results={resultsObject}
        isAuthorized={() => true}
        fetchData={() => {}}
        onNavigateTo={() => {}}
        fetchFilters={() => {}}
        setAccordion={() => {}}
        toggleFavorite={() => {}}
        saveSearch={() => {}}
        routerLocations={routerLocations}
        fetchMissionAutocomplete={() => {}}
        missionSearchResults={[]}
        missionSearchIsLoading={false}
        missionSearchHasErrored={false}
        fetchPostAutocomplete={() => {}}
        postSearchResults={[]}
        postSearchIsLoading={false}
        postSearchHasErrored={false}
      />,
    );
    wrapper.instance().componentDidMount();
    expect(global.scrollTo).toBeCalled();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    fetchData: ['1'],
    fetchFilters: [{}, '?q', '?q'],
    setAccordion: [{}],
    onNavigateTo: ['/details'],
    toggleFavorite: [1, true],
    saveSearch: [{}, 1],
    fetchMissionAutocomplete: ['?q'],
    fetchPostAutocomplete: ['?q'],
    toggleSearchBarVisibility: ['?q'],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
