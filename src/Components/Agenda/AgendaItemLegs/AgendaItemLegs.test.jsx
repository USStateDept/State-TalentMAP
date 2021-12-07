import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AgendaItemLegs from './AgendaItemLegs';

describe('AgendaItemLegs Component', () => {
  it('is defined', () => {
    const wrapper = shallow(<AgendaItemLegs />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<AgendaItemLegs />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
