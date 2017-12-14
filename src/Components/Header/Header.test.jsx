import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import createHistory from 'history/createBrowserHistory';
import { Header } from './Header';

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

  it('is defined', () => {
    const header = shallow(
      <Header
        client={client}
        login={loginObject}
        fetchData={() => {}}
        isAuthorized={() => true}
        onNavigateTo={() => {}}
        location={location}
        toggleSearchBarVisibility={() => {}}
        shouldShowSearchBar
        history={history}
      />,
    );
    expect(header).toBeDefined();
  });

  it('can call the toggleSearchVisibility function', () => {
    const spy = sinon.spy();
    const header = shallow(
      <Header
        client={client}
        login={loginObject}
        fetchData={() => {}}
        isAuthorized={() => true}
        onNavigateTo={() => {}}
        location={{ pathname: '/results' }}
        toggleSearchBarVisibility={spy}
        shouldShowSearchBar
        history={history}
      />,
    );
    header.instance().toggleSearchVisibility();
    sinon.assert.calledTwice(spy);
  });

  it('can call the submitSearch function', () => {
    const spy = sinon.spy();
    const header = shallow(
      <Header
        client={client}
        login={loginObject}
        fetchData={() => {}}
        isAuthorized={() => true}
        onNavigateTo={spy}
        location={location}
        toggleSearchBarVisibility={() => {}}
        shouldShowSearchBar
        history={history}
      />,
    );
    header.instance().submitSearch({ q: 'search' });
    sinon.assert.calledOnce(spy);
  });

  it('refreshes data on history change', () => {
    const wrapper = shallow(
      <Header
        client={client}
        login={loginObject}
        fetchData={() => {}}
        isAuthorized={() => true}
        onNavigateTo={() => {}}
        location={location}
        toggleSearchBarVisibility={() => {}}
        shouldShowSearchBar
        history={history}
      />,
    );
    const spy = sinon.spy(wrapper.instance(), 'matchCurrentPath');
    wrapper.instance().props.history.push('/home');
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot when logged in', () => {
    const header = shallow(
      <Header
        client={client}
        login={loginObject}
        userProfile={{ user: { username: 'test' } }}
        fetchData={() => {}}
        isAuthorized={() => true}
        onNavigateTo={() => {}}
        location={location}
        toggleSearchBarVisibility={() => {}}
        shouldShowSearchBar
        history={history}
      />,
    );
    expect(toJSON(header)).toMatchSnapshot();
  });

  it('matches snapshot when logged out', () => {
    const header = shallow(
      <Header
        client={{}}
        login={Object.assign({}, loginObject, { successful: false })}
        fetchData={() => {}}
        isAuthorized={() => false}
        onNavigateTo={() => {}}
        location={location}
        toggleSearchBarVisibility={() => {}}
        shouldShowSearchBar
        history={history}
      />,
      );
    expect(toJSON(header)).toMatchSnapshot();
  });
});
