import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AgendaItemTimeline from './AgendaItemTimeline';

describe('AgendaItemTimeline Component', () => {
  it('is defined', () => {
    const wrapper = shallow(<AgendaItemTimeline />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<AgendaItemTimeline />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
