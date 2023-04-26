import { shallow } from 'enzyme';
import PanelAdmin from './PanelAdmin';


describe('PanelAdmin Component', () => {
  it('is defined', () => {
    const wrapper = shallow(<PanelAdmin />);
    expect(wrapper).toBeDefined();
  });
});
