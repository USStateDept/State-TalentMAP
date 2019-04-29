import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import ClientHeaderContainer, { ClientHeader, mapDispatchToProps } from './ClientHeader';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ClientHeader', () => {
  const props = {
    id: 1,
    unset: () => {},
    history: { listen: () => {} },
    client: {},
  };

  it('is defined', () => {
    const wrapper = shallow(<ClientHeader {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('calls unset() on click', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<ClientHeader {...props} unset={spy} client={{ id: 1 }} />);
    wrapper.find('button').simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('it mounts', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({ clientView: { client: {} } })}>
        <MemoryRouter>
          <ClientHeaderContainer {...props} />
        </MemoryRouter>
      </Provider>);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ClientHeader {...props} client={{ id: 1 }} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  testDispatchFunctions(mapDispatchToProps);
});
