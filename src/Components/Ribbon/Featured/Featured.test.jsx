import { shallow } from 'enzyme';
import Featured from './Featured';

describe('FeaturedComponent', () => {
  ['featured', 'volunteer', 'urgentVacancy'].map(t => (
    it(`is defined for type ${t}`, () => {
      const wrapper = shallow(<Featured featuredType={t} />);
      expect(wrapper).toBeDefined();
    })
  ));

  [['featured', 'Featured'], ['volunteer', 'Volunteer'],
    ['urgentVacancy', 'Urgent']].map(t => (
    it(`it passes the correct text prop for type ${t[0]}`, () => {
      const wrapper = shallow(<Featured featuredType={t[0]} />);
      expect(wrapper.find('Ribbon').at(0).props().text).toBe(t[1]);
    })
  ));
});
