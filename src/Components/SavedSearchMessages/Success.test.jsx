import { shallow } from 'enzyme';
import Success from './Success';

describe('Success', () => {
  it('is defined', () => {
    const wrapper = shallow(<Success name="Test Search" />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when isUpdated is true', () => {
    const wrapper = shallow(<Success name="Test Search" isUpdated />);
    expect(wrapper).toBeDefined();
  });
});
