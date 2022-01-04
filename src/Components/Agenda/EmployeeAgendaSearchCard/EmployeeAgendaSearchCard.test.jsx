import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import EmployeeAgendaSearchCard from './EmployeeAgendaSearchCard';

describe('EmployeeAgendaSearchCards', () => {
  it('is defined', () => {
    const wrapper = shallow(<EmployeeAgendaSearchCard />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<EmployeeAgendaSearchCard />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
