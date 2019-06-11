import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import Administrator, { mapDispatchToProps } from './Administrator';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Administrator', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Administrator />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('can call the onDownloadClick function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Administrator.WrappedComponent getLogs={spy} />,
    );
    wrapper.instance().onDownloadClick();
    sinon.assert.calledOnce(spy);
  });
});

describe('mapDispatchToProps', () => {
  testDispatchFunctions(mapDispatchToProps);
});
