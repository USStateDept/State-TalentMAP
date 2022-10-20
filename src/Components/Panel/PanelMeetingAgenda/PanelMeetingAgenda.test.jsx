import { shallow } from 'enzyme';
import PanelMeetingAgenda from './PanelMeetingAgenda';

describe('PanelMeetingAgendaComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<PanelMeetingAgenda />);
    expect(wrapper).toBeDefined();
  });
});
