import { shallow } from 'enzyme';
import ScrollUpButton from './ScrollUpButton';

describe('ScrollUpButton', () => {
  it('is defined', () => {
    const wrapper = shallow(<ScrollUpButton />);
    expect(wrapper).toBeDefined();
  });
});
