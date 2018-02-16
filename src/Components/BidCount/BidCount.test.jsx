import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidCount from './BidCount';

describe('BidCountComponent', () => {
  const props = {
    bidStatistics: {
      total_bids: 5,
      in_grade: 5,
      at_skill: 5,
      in_grade_at_skill: 5,
    },
  };
  it('is defined', () => {
    const wrapper = shallow(
      <BidCount {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when hideLabel is true', () => {
    const wrapper = shallow(
      <BidCount {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('displays 0 when a prop is not defined', () => {
    const bidStatistics = {
      total_bids: undefined,
      in_grade: null,
      at_skill: 5,
    };
    const wrapper = shallow(
      <BidCount {...props} bidStatistics={bidStatistics} />,
    );
    expect(wrapper.find('BidCountNumber').at(0).props().number).toBe(0);
    expect(wrapper.find('BidCountNumber').at(1).props().number).toBe(0);
    expect(wrapper.find('BidCountNumber').at(2).props().number).toBe(5);
    expect(wrapper.find('BidCountNumber').at(3).props().number).toBe(0);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidCount {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when hideLabel is true', () => {
    const wrapper = shallow(
      <BidCount {...props} hideLabel />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
