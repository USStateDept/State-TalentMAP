import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import createHistory from 'history/createBrowserHistory';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import { Header, mapDispatchToProps } from './Header';

describe('Header', () => {
  const loginObject = {
    requesting: false,
    successful: true,
  };

  const history = createHistory();
  const location = { pathname: '/results' };

  const client = {
    token: '1234',
  };

  const props = {
    client,
    location,
    history,
    login: loginObject,
    fetchData: () => {},
    isAuthorized: () => true,
    onNavigateTo: () => {},
    toggleSearchBarVisibility: () => {},
    shouldShowSearchBar: true,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <Header
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can call the toggleSearchVisibility function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Header
        {...props}
        toggleSearchBarVisibility={spy}
      />,
    );
    wrapper.instance().toggleSearchVisibility();
    sinon.assert.calledTwice(spy);
  });

  it('can call the submitSearch function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Header
        {...props}
        onNavigateTo={spy}
      />,
    );
    wrapper.instance().submitSearch({ q: 'search' });
    sinon.assert.calledOnce(spy);
  });

  it('can call the onFilterChange function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Header
        {...props}
        setSearchFilters={spy}
      />,
    );
    wrapper.instance().onFilterChange({ q: 'search' });
    sinon.assert.calledOnce(spy);
  });

  it('refreshes data on history change', () => {
    const wrapper = shallow(
      <Header
        {...props}
      />,
    );
    const spy = sinon.spy(wrapper.instance(), 'matchCurrentPath');
    wrapper.instance().props.history.push('/home');
    sinon.assert.calledOnce(spy);
  });

  it('does not render the search bar if it is on a hidden route', () => {
    const wrapper = shallow(
      <Header
        {...props}
        location={{ pathname: '/results' }}
      />,
    );
    expect(wrapper.find('.results-search-bar-header').exists()).toBe(false);
  });

  it('renders the search bar if it is not on a hidden route', () => {
    const wrapper = shallow(
      <Header
        {...props}
        location={{ pathname: '/profile' }}
      />,
    );
    expect(wrapper.find('.results-search-bar-header').exists()).toBe(true);
  });

  it('applies a visibility class when it is on a route that should not hide the search bar by default', () => {
    const wrapper = shallow(
      <Header
        {...props}
        location={{ pathname: '/' }}
      />,
    );
    expect(wrapper.find('.search-bar-visible').exists()).toBe(true);
  });

  it('applies a hidden class when it is on a route that should hide the search bar by default', () => {
    const wrapper = shallow(
      <Header
        {...props}
        shouldShowSearchBar={false}
        location={{ pathname: '/profile' }}
      />,
    );
    expect(wrapper.find('.search-bar-hidden').exists()).toBe(true);
  });

  it('applies a results class when it is on the results page', () => {
    const wrapper = shallow(
      <Header
        {...props}
        location={{ pathname: '/results' }}
      />,
    );
    expect(wrapper.find('.is-on-results-page').exists()).toBe(true);
  });

  it('does not apply a results class when it is not on the results page', () => {
    const wrapper = shallow(
      <Header
        {...props}
        location={{ pathname: '/profile' }}
      />,
    );
    expect(wrapper.find('.is-on-results-page').exists()).toBe(false);
  });

  it('matches snapshot when logged in', () => {
    const wrapper = shallow(
      <Header
        {...props}
        userProfile={{ user: { first_name: 'test' } }}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when logged out', () => {
    const wrapper = shallow(
      <Header
        {...props}
        client={{}}
        login={Object.assign({}, loginObject, { successful: false })}
      />,
      );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    fetchData: ['?q'],
    onNavigateTo: ['/profile'],
    toggleSearchBarVisibility: [true],
    setSearchFilters: [{}],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
