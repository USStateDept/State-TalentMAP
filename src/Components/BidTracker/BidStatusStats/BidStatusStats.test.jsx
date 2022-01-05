import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidStatusStats from './BidStatusStats';

describe('BidTrackerComponent', () => {
  const props = {
    bidList: [],
    condensed: false,
  };

  it('is defined', () => {
    const wrapper = shallow(<BidStatusStats {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('renders appropriate class and matches snapshot when not condensed', () => {
    const wrapper = shallow(<BidStatusStats {...props} />);
    expect(wrapper.find('.bid-status-stats').exists()).toBe(true);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('renders appropriate class and matches snapshot when condensed', () => {
    const wrapper = shallow(<BidStatusStats {...props} condensed />);
    expect(wrapper.find('.bid-status-stats--condensed').exists()).toBe(true);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
