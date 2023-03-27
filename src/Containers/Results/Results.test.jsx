import { shallow } from 'enzyme';
import sinon from 'sinon';
import q from 'query-string';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import Results, { mapDispatchToProps } from './Results';
import resultsObject from '../../__mocks__/resultsObject';

describe('Results', () => {
  const debounceTimeInMs = 500;

  const props = {
    results: resultsObject,
    isAuthorized: () => true,
    onNavigateTo: () => {},
    setAccordion: () => {},
    storeSearch: () => {},
    resetSavedSearchAlerts: () => {},
    fetchMissionAutocomplete: () => {},
    missionSearchResults: [],
    missionSearchIsLoading: false,
    missionSearchHasErrored: false,
    fetchPostAutocomplete: () => {},
    postSearchResults: [],
    postSearchIsLoading: false,
    postSearchHasErrored: false,
    bidListFetchData: () => {},
    defaultPageSize: 5,
    filtersIsLoading: false,
    fetchData: () => {},
    fetchFilters: () => {},
  };

  it('is defined', () => {
    const results = shallow(
      <Results.WrappedComponent
        {...props}
      />);
    expect(results).toBeDefined();
  });

  it('is defined when isAuthorized returns false', () => {
    const results = shallow(
      <Results.WrappedComponent
        {...props}
        isAuthorized={() => false}
      />);
    expect(results).toBeDefined();
  });

  it('sets filtersIsLoading state when it receives new props', () => {
    const wrapper = shallow(
      <Results.WrappedComponent
        {...props}
      />,
    );
    expect(wrapper.instance().state.filtersIsLoading).toBe(true);
    wrapper.setProps({ ...props, filtersIsLoading: false });
    expect(wrapper.instance().state.filtersIsLoading).toBe(false);
  });

  it('returns a value for getStringifiedQuery()', () => {
    const wrapper = shallow(
      <Results.WrappedComponent
        {...props}
      />,
    );
    wrapper.instance().resultsPageRef = { getKeywordValue: () => 'test' };
    wrapper.update();
    expect(wrapper.instance().getStringifiedQuery()).toBeDefined();
  });

  it('can call the onQueryParamUpdate function', () => {
    const query = { ordering: 'position__bureau', q: 'German' };
    const wrapper = shallow(
      <Results.WrappedComponent
        {...props}
      />,
    );
    wrapper.instance().resultsPageRef = { getKeywordValue: () => 'German' };
    wrapper.update();

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
        {...props}
        filters={{ hasFetched: true }}
        fetchFilters={spy}
      />,
    );
    expect(wrapper.instance().props.filters.hasFetched).toBe(true);
    sinon.assert.calledOnce(spy);
  });

  it('can call the storeSearch function', () => {
    const value = { newValue: null };
    const wrapper = shallow(
      <Results.WrappedComponent
        {...props}
        storeSearch={(v) => { value.newValue = v; }}
      />,
    );
    wrapper.instance().setState({ query: { value: 'q=German' } });
    wrapper.update();
    wrapper.instance().storeSearch();
    expect(value.newValue).toEqual({ q: 'German' });
  });

  it('calls history.push on this.resetFilters()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Results.WrappedComponent
        {...props}
      />, { context: { router: { history: { push: spy } } } },
    );
    wrapper.instance().resetFilters();
    sinon.assert.calledOnce(spy);
  });

  [
    [{ q: '', ordering: 'order' }, false],
    [{ q: 'a' }, true],
    [{ ordering: 'order' }, false],
    [{ other: true, ordering: 'order' }, true],
    [{ other: 0 }, true],
  ].map((d, i) => (
    it(`returns the correct value for this.getQueryExists() at index ${i}`, () => {
      const wrapper = shallow(
        <Results.WrappedComponent
          {...props}
        />,
      );
      const q$ = q.stringify(d[0]);
      wrapper.instance().setState({ query: { value: q$ } });
      const exp = wrapper.instance().getQueryExists();
      expect(exp).toBe(d[1]);
    })
  ));

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
        filtersIsLoading={false}
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
        filtersIsLoading={false}
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
        filtersIsLoading={false}
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
        filtersIsLoading={false}
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
