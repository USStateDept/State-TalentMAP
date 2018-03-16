import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import FeedbackButton, { mapDispatchToProps } from './FeedbackButton';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('FeedbackButton', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <FeedbackButton />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('can call the toggleVisibility function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <FeedbackButton.WrappedComponent
        toggleFeedbackVisibility={spy}
      />,
    );
    wrapper.instance().toggleVisibility();
    sinon.assert.calledOnce(spy);
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    toggleFeedbackVisibility: [true],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
