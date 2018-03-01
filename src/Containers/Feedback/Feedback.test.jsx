import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import Feedback, { mapDispatchToProps } from './Feedback';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Feedback', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Feedback />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('can call the toggleVisibility function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Feedback.WrappedComponent
        toggleFeedbackVisibility={spy}
      />,
    );
    wrapper.instance().toggleVisibility();
    sinon.assert.calledOnce(spy);
  });

  it('can call the submitFeedback function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Feedback.WrappedComponent
        submitFeedback={spy}
      />,
    );
    wrapper.instance().submitFeedback({ preventDefault: () => {} });
    sinon.assert.calledOnce(spy);
  });

  it('can call the changeFeedbackText function', () => {
    const wrapper = shallow(
      <Feedback.WrappedComponent />,
    );
    wrapper.instance().changeFeedbackText('text');
    expect(wrapper.instance().state.feedbackText).toBe('text');
  });

  it('can call the changeAdditionalFeedbackCheck function', () => {
    const wrapper = shallow(
      <Feedback.WrappedComponent />,
    );
    expect(wrapper.instance().state.additionalFeedbackCheck).toBe(false);
    wrapper.instance().changeAdditionalFeedbackCheck(true);
    expect(wrapper.instance().state.additionalFeedbackCheck).toBe(true);
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    toggleFeedbackVisibility: [true],
    feedbackSubmitData: ['text', true],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
