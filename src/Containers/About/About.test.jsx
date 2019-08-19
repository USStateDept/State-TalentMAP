import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import About, { mapDispatchToProps } from './About';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Feedback', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <About />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('calls props.patchData on this.patchData', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <About.WrappedComponent patchData={spy} />,
    );
    wrapper.instance().patchData({});
    sinon.assert.calledOnce(spy);
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    patchData: [{}],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
