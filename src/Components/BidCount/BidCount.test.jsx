import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidCount from './BidCount';

describe('BidCountComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <BidCount
        totalBids={5}
        inGradeBids={5}
        atSkillBids={5}
        inGradeAtSkillBids={5}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidCount
        totalBids={5}
        inGradeBids={5}
        atSkillBids={5}
        inGradeAtSkillBids={5}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
