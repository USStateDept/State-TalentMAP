import React from 'react';
import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Header } from './Header';

describe('Header', () => {
  const loginObject = {
    requesting: false,
    successful: true,
  };

  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  const client = {
    token: '1234',
  };

  it('is defined', () => {
    const header = shallow(
      <Header client={client} login={loginObject} fetchData={() => {}} isAuthorized={() => true} />,
    );
    expect(header).toBeDefined();
  });

  it('matches snapshot when logged in', () => {
    const header = shallow(
      <Header client={client} login={loginObject} fetchData={() => {}} isAuthorized={() => true} />,
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
      />,
      );
    expect(toJSON(header)).toMatchSnapshot();
  });

  it('displays login text if user is logged out', () => {
    const header = mount(
      <Provider store={mockStore({})}><MemoryRouter>
        <Header
          client={{}}
          login={loginObject}
          fetchData={() => {}}
          isAuthorized={() => false}
        />
      </MemoryRouter></Provider>,
    );
    expect(header.find('[href="login"]').text()).toBe('Login');
  });
});
