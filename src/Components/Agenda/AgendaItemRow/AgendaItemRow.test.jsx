import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AgendaItemRow from './AgendaItemRow';

describe('AgendaItemRow Component', () => {
  it('is defined', () => {
    const wrapper = shallow(<AgendaItemRow />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<AgendaItemRow />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
