import { shallow } from 'enzyme';
import ServiceNeedDifferential from './ServiceNeedDifferential';

describe('ServiceNeedDifferentialComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<ServiceNeedDifferential />);

    expect(wrapper).toBeDefined();
  });
});
