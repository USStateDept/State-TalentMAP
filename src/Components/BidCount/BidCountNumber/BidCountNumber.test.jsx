import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidCountNumber from './BidCountNumber';

describe('BidCountNumberComponent', () => {
  ['totalBids', 'inGradeBids', 'atSkillBids', 'inGradeAtSkillBids'].forEach((type) => {
    it(`is defined where type = ${type}`, () => {
      const wrapper = shallow(
        <BidCountNumber type={type} number={10} />,
      );
      expect(wrapper).toBeDefined();
    });

    it(`matches snapshot where type = ${type}`, () => {
      const wrapper = shallow(
        <BidCountNumber type={type} number={10} />,
      );
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
