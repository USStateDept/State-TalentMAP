import { shallow } from 'enzyme';
import CompareDrawer from './CompareDrawer';
import resultsObject from '../../__mocks__/resultsObject';

describe('CompareDrawer', () => {
  const props = {
    comparisons: resultsObject.results,
    isHidden: false,
  };
  it('is defined', () => {
    const wrapper = shallow(<CompareDrawer {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('applies correct css class when isHidden === true', () => {
    const wrapper = shallow(<CompareDrawer {...props} isHidden />);
    expect(wrapper.find('.drawer-hidden').exists()).toBe(true);
  });

  it('does not apply new css class when isHidden === false', () => {
    const wrapper = shallow(<CompareDrawer {...props} isHidden={false} />);
    expect(wrapper.find('.drawer-hidden').exists()).toBe(false);
  });

  it('displays the correct number of results data cards', () => {
    const wrapper = shallow(<CompareDrawer {...props} isHidden={false} />);
    expect(wrapper.find('.check-container').length).toBe(resultsObject.results.length);
  });

  it('displays the correct number of empty cards', () => {
    const maxCards = 5;
    const wrapper = shallow(<CompareDrawer {...props} isHidden={false} />);
    expect(wrapper.find('.compare-item-empty').length).toBe(maxCards - resultsObject.results.length);
  });
});
