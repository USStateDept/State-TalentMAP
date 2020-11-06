import { shallow } from 'enzyme';
import InBidList from './InBidList';

describe('InBidListComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<InBidList />);
    expect(wrapper).toBeDefined();
  });
});
