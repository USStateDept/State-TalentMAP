import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import IsOnStandby from './IsOnStandby';
import bidListObject from '../../../../__mocks__/bidListObject';

describe('IsOnStandbyComponent', () => {
  const bid = bidListObject.results[0];

  const props = {
    bid,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <IsOnStandby {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('accepts different props', () => {
    const newBid = { ...bid };
    newBid.status = 'closed';
    const wrapper = shallow(
      <IsOnStandby {...props} bid={newBid} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <IsOnStandby {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
