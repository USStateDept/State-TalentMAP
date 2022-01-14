import { shallow } from 'enzyme';
import AvailableBidderStats from './AvailableBidderStats';


describe('AvailableBidderStats', () => {
  it('is defined', () => {
    const wrapper = shallow(<AvailableBidderStats isCDO />);
    expect(wrapper).toBeDefined();
  });
});
