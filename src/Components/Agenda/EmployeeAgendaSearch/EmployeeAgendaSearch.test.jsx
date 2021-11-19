import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import EmployeeAgendaSearch from './EmployeeAgendaSearch';

describe('EmployeeAgendaSearchComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<EmployeeAgendaSearch isCDO />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when CDO', () => {
    const wrapper = shallow(<EmployeeAgendaSearch isCDO />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when not CDO', () => {
    const wrapper = shallow(<EmployeeAgendaSearch isCDO={false} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
