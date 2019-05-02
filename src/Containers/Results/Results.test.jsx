import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import MockTestProvider from '../../testUtilities/MockProvider';
import Results, { mapDispatchToProps } from './Results';
import resultsObject from '../../__mocks__/resultsObject';

describe('Results', () => {
  const debounceTimeInMs = 500;
  it('is defined', () => {
    const results = TestUtils.renderIntoDocument(<MockTestProvider>
      <Results
        results={resultsObject}
        isAuthorized={() => true}
        onNavigateTo={() => {}}
        setAccordion={() => {}}
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
        bidListFetchData={() => {}}
        defaultPageSize={5}
      />
    </MockTestProvider>);
    expect(results).toBeDefined();
  });

  it('can handle authentication redirects', () => {
    const results = TestUtils.renderIntoDocument(<MockTestProvider>
      <Results
        results={resultsObject}
        isAuthorized={() => false}
        onNavigateTo={() => {}}
        setAccordion={() => {}}
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
        bidListFetchData={() => {}}
        defaultPageSize={5}
      />
    </MockTestProvider>);
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
        saveSearch={() => {}}
        fetchMissionAutocomplete={() => {}}
        missionSearchResults={[]}
        missionSearchIsLoading={false}
        missionSearchHasErrored={false}
        fetchPostAutocomplete={() => {}}
        postSearchResults={[]}
        postSearchIsLoading={false}
        postSearchHasErrored={false}
        bidListFetchData={() => {}}
        defaultPageSize={5}
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
        saveSearch={() => {}}
        fetchMissionAutocomplete={() => {}}
        missionSearchResults={[]}
        missionSearchIsLoading={false}
        missionSearchHasErrored={false}
        fetchPostAutocomplete={() => {}}
        postSearchResults={[]}
        postSearchIsLoading={false}
        postSearchHasErrored={false}
        bidListFetchData={() => {}}
        defaultPageSize={5}
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
        saveSearch={(q, id) => { savedSearch.q = q; savedSearch.id = id; }}
        fetchMissionAutocomplete={() => {}}
        missionSearchResults={[]}
        missionSearchIsLoading={false}
        missionSearchHasErrored={false}
        fetchPostAutocomplete={() => {}}
        postSearchResults={[]}
        postSearchIsLoading={false}
        postSearchHasErrored={false}
        bidListFetchData={() => {}}
        defaultPageSize={5}
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
        bidListFetchData={() => {}}
        defaultPageSize={5}
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
        bidListFetchData={() => {}}
        defaultPageSize={5}
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
        bidListFetchData={() => {}}
        defaultPageSize={5}
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
        saveSearch={() => {}}
        fetchMissionAutocomplete={() => {}}
        missionSearchResults={[]}
        missionSearchIsLoading={false}
        missionSearchHasErrored={false}
        fetchPostAutocomplete={() => {}}
        postSearchResults={[]}
        postSearchIsLoading={false}
        postSearchHasErrored={false}
        bidListFetchData={() => {}}
        defaultPageSize={5}
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
});

describe('mapDispatchToProps', () => {
  const config = {
    fetchData: ['1'],
    fetchFilters: [{}, '?q', '?q'],
    setAccordion: [{}],
    onNavigateTo: ['/details'],
    saveSearch: [{}, 1],
    fetchMissionAutocomplete: ['?q'],
    fetchPostAutocomplete: ['?q'],
    toggleSearchBarVisibility: ['?q'],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
