import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AgendaItemRowView from './AgendaItemRowView';

describe('AgendaItemRowView Component', () => {
  it('is defined', () => {
    const wrapper = shallow(<AgendaItemRowView />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<AgendaItemRowView />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
