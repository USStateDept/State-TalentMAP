import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import FeedbackButton from './FeedbackButton';

describe('FeedbackComponent', () => {
  const props = {
    toggleVisibility: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <FeedbackButton
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can call the toggleVisibility on click', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <FeedbackButton
        {...props}
        toggleVisibility={spy}
      />,
    );
    wrapper.find('button').simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <FeedbackButton
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
