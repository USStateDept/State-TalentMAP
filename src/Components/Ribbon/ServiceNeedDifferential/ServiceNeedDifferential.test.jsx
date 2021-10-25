import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ServiceNeedDifferential from './ServiceNeedDifferential';

describe('ServiceNeedDifferentialComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<ServiceNeedDifferential />);
    expect(wrapper).toBeDefined();
  });

  it('text correct when !shortName', () => {
    const wrapper = shallow(<ServiceNeedDifferential />);
    expect(wrapper.find('Ribbon').props().text).toBe('Service need differential');
  });

  it('text correct when shortName', () => {
    const wrapper = shallow(<ServiceNeedDifferential shortName />);
    expect(wrapper.find('Ribbon').props().text).toBe('SND');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ServiceNeedDifferential />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
