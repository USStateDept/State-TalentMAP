import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AgendaItemHistory from './AgendaItemHistory';

describe('AgendaItemHistoryComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<AgendaItemHistory />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<AgendaItemHistory />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
