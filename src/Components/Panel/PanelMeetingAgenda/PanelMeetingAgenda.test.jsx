import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import PanelMeetingAgenda from './PanelMeetingAgenda';

describe('PanelMeetingAgendaComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<PanelMeetingAgenda />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when CDO', () => {
    const wrapper = shallow(<PanelMeetingAgenda isCDO />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when not CDO', () => {
    const wrapper = shallow(<PanelMeetingAgenda isCDO={false} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
