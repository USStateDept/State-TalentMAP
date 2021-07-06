import { shallow } from 'enzyme';
import DarkMode from './DarkMode';

describe('DarkMode', () => {
  const props = {
    isDarkMode: true,
  };

  // TypeError: target.cssRules.item is not a function (after adding polyfill in setupTests.js)
  xit('is defined', () => {
    const wrapper = shallow(
      <DarkMode.WrappedComponent {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  // TypeError: target.cssRules.item is not a function (after adding polyfill in setupTests.js)
  xit('is defined after it receives new props', () => {
    const wrapper = shallow(
      <DarkMode.WrappedComponent {...props} />,
    );
    wrapper.setProps({ isDarkMode: false });
    wrapper.update();
    expect(wrapper).toBeDefined();
  });
});
