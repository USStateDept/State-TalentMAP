import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ResultsCondensedCardStats from './ResultsCondensedCardStats';

describe('ResultsCondensedCardStatsComponent', () => {
  const props = {
    bidStatisticsArray: [
      {
        total_bids: 5,
        in_grade: 5,
        at_skill: 5,
        in_grade_at_skill: 5,
      },
    ],
  };
  it('is defined', () => {
    const wrapper = shallow(
      <ResultsCondensedCardStats {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <ResultsCondensedCardStats {...props} />,
    );
    expect(wrapper.instance().props.bidStatisticsArray).toBe(props.bidStatisticsArray);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ResultsCondensedCardStats {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
