import { shallow } from 'enzyme';
import Classifications from './Classifications';

describe('Classifications Component', () => {
  it('is defined', () => {
    const wrapper = shallow(<Classifications />);
    expect(wrapper).toBeDefined();
  });
});
