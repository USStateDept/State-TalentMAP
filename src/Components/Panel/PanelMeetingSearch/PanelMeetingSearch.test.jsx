import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import PanelMeetingSearch from './PanelMeetingSearch';

describe('EmployeeAgendaSearchComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<PanelMeetingSearch isCDO />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when CDO', () => {
    const wrapper = shallow(<PanelMeetingSearch isCDO />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when not CDO', () => {
    const wrapper = shallow(<PanelMeetingSearch isCDO={false} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
