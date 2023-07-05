import { shallow } from 'enzyme';
import ProjectedVacancy from './projectedVacancy';

describe('EditProjectedVacancyDetails', () => {
  it('should be defined', () => {
    const wrapper = shallow(<ProjectedVacancy.WrappedComponent />);
    expect(wrapper).toBeDefined();
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<ProjectedVacancy.WrappedComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
