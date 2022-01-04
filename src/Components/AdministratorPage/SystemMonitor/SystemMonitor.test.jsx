import { shallow } from 'enzyme';
import SystemMonitor from './SystemMonitor';

describe('UserRoles', () => {
  it('is defined', () => {
    const wrapper = shallow(<SystemMonitor />);
    expect(wrapper).toBeDefined();
  });
});
