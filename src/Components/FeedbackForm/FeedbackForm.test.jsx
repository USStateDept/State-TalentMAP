import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import FeedbackForm from './FeedbackForm';

describe('FeedbackFormComponent', () => {
  const props = {
    visible: true,
    toggleVisibility: () => {},
    feedbackIsSending: false,
    feedbackHasErrored: { hasErrored: false, message: null },
    submitFeedback: () => {},
    onChangeText: () => {},
    feedbackText: 'text',
    additionalFeedbackCheck: false,
    feedbackSuccess: false,
    onCheckBoxClick: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <FeedbackForm
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('displays "Sending" text when submission is sending', () => {
    const wrapper = shallow(
      <FeedbackForm
        {...props}
        feedbackIsSending
      />,
    );
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.feedback-submission-messages').text()).toBe('Sending...');
  });

  it('displays the error text when submission has errored', () => {
    const wrapper = shallow(
      <FeedbackForm
        {...props}
        feedbackHasErrored={{ hasErrored: true, message: 'Error occurred' }}
      />,
    );
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.feedback-submission-messages').text()).toBe('Error occurred');
  });

  it('displays the success text when feedbackSuccess is true', () => {
    const wrapper = shallow(
      <FeedbackForm
        {...props}
        feedbackSuccess
      />,
    );
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.feedback-submission-messages').text()).toBe('Submitted!');
  });

  it('can close the feedback', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <FeedbackForm
        {...props}
        toggleVisibility={spy}
      />,
    );
    wrapper.find('.feedback-close').simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <FeedbackForm
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when visible is false', () => {
    const wrapper = shallow(
      <FeedbackForm
        {...props}
        visible={false}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
