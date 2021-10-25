import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CriticalNeed from './CriticalNeed';

describe('CriticalNeedComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<CriticalNeed />);
    expect(wrapper).toBeDefined();
  });

  it('text correct when !shortName', () => {
    const wrapper = shallow(<CriticalNeed />);
    expect(wrapper.find('Ribbon').props().text).toBe('Critical need');
  });

  it('text correct when shortName', () => {
    const wrapper = shallow(<CriticalNeed shortName />);
    expect(wrapper.find('Ribbon').props().text).toBe('CN');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<CriticalNeed />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
