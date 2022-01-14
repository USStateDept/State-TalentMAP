import { shallow } from 'enzyme';
import AvailableBidderStats from './AvailableBidderStats';


describe('AvailableBidderContainerStats', () => {
  it('is defined', () => {
    const wrapper = shallow(<AvailableBidderStats isCDO />);
    expect(wrapper).toBeDefined();
  });
});
