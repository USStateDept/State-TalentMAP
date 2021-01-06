import { shallow } from 'enzyme';
import PositionManagerBidders from './PositionManagerBidders';

describe('PositionManagerBidders', () => {
  const props = {
    id: 1,
  };

  it('is defined', () => {
    const wrapper = shallow(<PositionManagerBidders {...props} />);
    expect(wrapper).toBeDefined();
  });
});
