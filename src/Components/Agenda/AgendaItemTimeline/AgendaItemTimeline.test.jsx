import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AgendaItemTimeline from './AgendaItemTimeline';

describe('AgendaItemTimeline Component', () => {
  it('is defined', () => {
    const wrapper = shallow(<AgendaItemTimeline />);
    expect(wrapper).toBeDefined();
  });

  // snapshot test will fail as long as legs are randomly generated.
  // TODO - add back in once integrated
  xit('matches snapshot', () => {
    const wrapper = shallow(<AgendaItemTimeline />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
