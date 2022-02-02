import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AgendaItemResearchPane from './AgendaItemResearchPane';

describe('AgendaResearchPane Component', () => {
  it('is defined', () => {
    const wrapper = shallow(<AgendaItemResearchPane />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<AgendaItemResearchPane />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
