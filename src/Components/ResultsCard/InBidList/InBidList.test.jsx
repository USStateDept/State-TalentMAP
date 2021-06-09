import { shallow } from 'enzyme';
import InBidList from './InBidList';

describe('InBidListContainer', () => {
  const props = {
    id: 1,
    compareArray: { results: [{ position_info: { id: 1 } }] },
    clientCompareArray: { results: [{ position_info: { id: 1 } }] },
  };
  it('is defined', () => {
    const wrapper = shallow(<InBidList.WrappedComponent {...props} />);
    expect(wrapper).toBeDefined();
  });
  it('renders the component if the id is in the compare array', () => {
    const wrapper = shallow(<InBidList.WrappedComponent {...props} />);
    expect(wrapper.find('InBidList').exists()).toBe(true);
  });
  it('does not render the component if the id is not in the compare array', () => {
    const wrapper = shallow(<InBidList.WrappedComponent {...props} id={2} />);
    expect(wrapper.find('InBidList').exists()).toBe(false);
  });
});
