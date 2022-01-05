import { shallow } from 'enzyme';
import NavItem from './NavItem';

describe('NavItemComponent', () => {
  const props = {
    title: 'test',
    value: 't',
    numerator: 5,
    denominator: 10,
    isActive: false,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <NavItem {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when isActive === true', () => {
    const wrapper = shallow(
      <NavItem {...props} isActive />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when when numerator === null', () => {
    const wrapper = shallow(
      <NavItem {...props} numerator={null} />,
    );
    expect(wrapper).toBeDefined();
  });
});
