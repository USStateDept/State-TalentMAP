import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AgendaItemCardView from './AgendaItemCardView';

describe('AgendaItemCardView Component', () => {
  it('is defined', () => {
    const wrapper = shallow(<AgendaItemCardView />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<AgendaItemCardView />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
