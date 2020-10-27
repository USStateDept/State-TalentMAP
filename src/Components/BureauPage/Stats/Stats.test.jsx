import { shallow } from 'enzyme';
import Stats from './Stats';

describe('BureauPage', () => {
  it('is defined', () => {
    const wrapper = shallow(<Stats />);
    expect(wrapper).toBeDefined();
  });
});
