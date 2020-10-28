import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import ToggleButton from './ToggleButton';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

describe('ToggleButtonComponent', () => {
  const props = {
    onChange: EMPTY_FUNCTION,
    checked: true,
    labelText: 'button label',
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
