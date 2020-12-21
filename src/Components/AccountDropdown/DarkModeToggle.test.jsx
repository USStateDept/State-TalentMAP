import { shallow } from 'enzyme';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import DarkModeToggle, { mapDispatchToProps } from './DarkModeToggle';

describe('DarkModeToggle', () => {
  const props = {
    isDarkMode: false,
    set: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <DarkModeToggle.WrappedComponent {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('it displays "Disable" when isDarkMode === true', () => {
    const wrapper = shallow(
      <DarkModeToggle.WrappedComponent {...props} isDarkMode />,
    );
    expect(wrapper.find('button').text()).toBe('Disable Dark Mode');
  });

  it('it displays "Enable" when isDarkMode !== true', () => {
    const wrapper = shallow(
      <DarkModeToggle.WrappedComponent {...props} />,
    );
    expect(wrapper.find('button').text()).toBe('Enable Dark Mode');
  });

  it('calls the set function', () => {
    let val = true;
    const onClick = v => val = v; // eslint-disable-line
    const wrapper = shallow(
      <DarkModeToggle.WrappedComponent {...props} isDarkMode set={onClick} />,
    );
    const click = () => wrapper.find('button').simulate('click');
    click();
    expect(val).toBe(false);
    wrapper.setProps({ isDarkMode: false });
    wrapper.update();
    click();
    expect(val).toBe(true);
  });
});

describe('mapDispatchToProps', () => {
  testDispatchFunctions(mapDispatchToProps, { bool: [true] });
});
