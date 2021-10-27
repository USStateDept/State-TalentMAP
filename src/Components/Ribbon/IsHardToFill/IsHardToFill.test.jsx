import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import IsHardToFill from './IsHardToFill';

describe('IsHardToFillComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<IsHardToFill />);

    expect(wrapper).toBeDefined();
  });

  it('text correct when !shortName', () => {
    const wrapper = shallow(<IsHardToFill />);
    expect(wrapper.find('Ribbon').props().text).toBe('Hard to Fill');
  });

  it('text correct when shortName', () => {
    const wrapper = shallow(<IsHardToFill shortName />);
    expect(wrapper.find('Ribbon').props().text).toBe('HTF');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<IsHardToFill />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
