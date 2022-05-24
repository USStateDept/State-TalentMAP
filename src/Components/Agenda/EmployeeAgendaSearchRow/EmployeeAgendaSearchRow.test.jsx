import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import EmployeeAgendaSearchRow from './EmployeeAgendaSearchRow';

describe('EmployeeAgendaSearchRow', () => {
  it('is defined', () => {
    const wrapper = shallow(<EmployeeAgendaSearchRow />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<EmployeeAgendaSearchRow />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
