import { shallow } from 'enzyme';
import Icon from './Icon';

describe('Icon', () => {
  it('is defined', () => {
    const wrapper = shallow(<Icon />);
    expect(wrapper).toBeDefined();
  });

  it('renders className prop', () => {
    const c = 'my-pretty-class';
    const wrapper = shallow(<Icon className={c} />);
    expect(wrapper.find(`.${c}`).exists()).toBe(true);
  });
});
