import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AgendaItemMaintenancePane from './AgendaItemMaintenancePane';

describe('AgendaItemMaintenancePane Component', () => {
  it('is defined', () => {
    const wrapper = shallow(<AgendaItemMaintenancePane />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<AgendaItemMaintenancePane />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
