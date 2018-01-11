import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidSteps from './BidSteps';
import bidListObject from '../../../__mocks__/bidListObject';

describe('BidStepsComponent', () => {
  const bid = bidListObject.results[0];

  it('is defined', () => {
    const wrapper = shallow(
      <BidSteps bid={bid} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidSteps bid={bid} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
