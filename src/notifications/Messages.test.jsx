import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Message from './Messages';

describe('PositionDetailsComponent', () => {
  let wrapper = null;

  const messageArray = [
    {
      body: 'Message',
      time: '1298892322',
    },
  ];

  it('is defined', () => {
    const messages = TestUtils.renderIntoDocument(<Message />);
    expect(messages).toBeDefined();
  });

  it('can receive props', () => {
    wrapper = shallow(
      <Message error={messageArray} />,
    );
    expect(wrapper.instance().props.messages.length).toBe(1);
  });
});
