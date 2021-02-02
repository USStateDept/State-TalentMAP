import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ToggleButton from './ToggleButton';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

describe('ToggleButtonComponent', () => {
  const props = {
    onChange: EMPTY_FUNCTION,
    checked: true,
    labelTextLeft: 'button label',
  };
  const propsTwoLabels = {
    onChange: EMPTY_FUNCTION,
    checked: true,
    labelTextLeft: 'button label',
    labelTextRight: 'button label',
  };
  it('is defined', () => {
    const wrapper = shallow(<ToggleButton
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  it('has rendered only one label', () => {
    const wrapper = shallow(<ToggleButton
      {...props}
    />);
    expect(wrapper.find('label').length).toBe(1);
  });

  it('has rendered both labels', () => {
    const wrapper = shallow(<ToggleButton
      {...propsTwoLabels}
    />);
    expect(wrapper.find('label').length).toBe(2);
  });

  it('has rendered proper label text', () => {
    const wrapper = shallow(<ToggleButton
      {...props}
    />);
    expect(wrapper.find('label').text()).toBe('button label');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ToggleButton
      {...props}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
