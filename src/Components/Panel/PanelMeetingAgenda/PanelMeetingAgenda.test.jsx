import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import PanelMeetingAgenda from './PanelMeetingAgenda';

describe('PanelMeetingSearchRow', () => {
  it('is defined', () => {
    const wrapper = shallow(<PanelMeetingAgenda />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<PanelMeetingAgenda />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
