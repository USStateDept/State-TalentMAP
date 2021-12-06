import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AgendaItemCard from './AgendaItemCard';

describe('AgendaItemCard Component', () => {
  it('is defined', () => {
    const wrapper = shallow(<AgendaItemCard />);
    expect(wrapper).toBeDefined();
  });

  xit('matches snapshot', () => {
    const wrapper = shallow(<AgendaItemCard />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
