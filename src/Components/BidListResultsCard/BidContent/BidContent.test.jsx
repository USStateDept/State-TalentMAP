import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { APPROVED } from '../../../Constants/BidStatuses';
import BidContent from './BidContent';

describe('BidContentComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <BidContent
        status={APPROVED.property}
        positionNumber="055A45"
        postName="Paris"
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidContent
        status={APPROVED.property}
        positionNumber="055A45"
        postName="Paris"
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
