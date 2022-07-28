import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AgendaItemLegs from './AgendaLeg';

describe('AgendaLeg Component', () => {
  it('is defined', () => {
    const wrapper = shallow(<AgendaLeg />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<AgendaLeg />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
