import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import PanelMeetingSearchRow from './PanelMeetingSearchRow';

describe('PanelMeetingSearchRow', () => {
  it('is defined', () => {
    const wrapper = shallow(<PanelMeetingSearchRow />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<PanelMeetingSearchRow />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
