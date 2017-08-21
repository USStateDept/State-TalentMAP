import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Errors from './Errors';

describe('PositionDetailsComponent', () => {
  let wrapper = null;

  const errorArray = [
    {
      body: 'Error',
      time: '1298892322',
    },
  ];

  it('is defined', () => {
    const error = TestUtils.renderIntoDocument(<Errors />);
    expect(error).toBeDefined();
  });

  it('can receive props', () => {
    wrapper = shallow(
      <Errors error={errorArray} />,
    );
    expect(wrapper.instance().props.errors.length).toBe(1);
  });
});
