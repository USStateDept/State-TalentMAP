import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AgendaItemMaintenanceContainer from './AgendaItemMaintenanceContainer';

describe('AgendaItemMaintenanceContainerComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<AgendaItemMaintenanceContainer />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when there is a route id', () => {
    const wrapper = shallow(<AgendaItemMaintenanceContainer match={{ params: { id: 1 } }} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<AgendaItemMaintenanceContainer />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
