import { shallow } from 'enzyme';
import HardToFill from './HardToFill';

describe('HardToFillComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<HardToFill />);

    expect(wrapper).toBeDefined();
  });
});
