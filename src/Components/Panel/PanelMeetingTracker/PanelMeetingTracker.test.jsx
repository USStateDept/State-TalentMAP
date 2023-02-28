import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import PanelMeetingSearchRow from './PanelMeetingTracker';

describe('PanelMeetingTracker', () => {
  it('is defined', () => {
    const wrapper = shallow(<PanelMeetingTracker />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<PanelMeetingTracker />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
