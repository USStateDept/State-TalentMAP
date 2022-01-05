import { shallow } from 'enzyme';
import RegisterSuccess from './RegisterSuccess';

describe('RegisterSuccess', () => {
  it('is defined', () => {
    const wrapper = shallow(<RegisterSuccess undo={() => {}} />);
    expect(wrapper).toBeDefined();
  });
});
