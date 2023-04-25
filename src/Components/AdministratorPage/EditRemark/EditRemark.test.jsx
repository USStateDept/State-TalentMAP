import { shallow } from 'enzyme';
import EditRemark from './EditRemark';


describe('EditRemark Component', () => {
  it('is defined', () => {
    const wrapper = shallow(<EditRemark />);
    expect(wrapper).toBeDefined();
  });
});
