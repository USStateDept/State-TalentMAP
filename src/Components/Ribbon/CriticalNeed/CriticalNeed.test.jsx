import { shallow } from 'enzyme';
import CriticalNeed from './CriticalNeed';

describe('CriticalNeedComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<CriticalNeed />);

    expect(wrapper).toBeDefined();
  });
});
