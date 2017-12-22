import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidTracker from './BidTracker';
import bidListObject from '../../__mocks__/bidListObject';

describe('BidTrackerComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <BidTracker bidList={bidListObject} bidListIsLoading={false} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidTracker bidList={bidListObject} bidListIsLoading={false} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when bidListIsLoading is true', () => {
    const wrapper = shallow(
      <BidTracker bidList={bidListObject} bidListIsLoading />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
