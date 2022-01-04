import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidCountNumber from './BidCountNumber';

describe('BidCountNumberComponent', () => {
  ['totalBids', 'atGradeBids', 'inSkillBids', 'atGradeInSkillBids'].forEach((type) => {
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
