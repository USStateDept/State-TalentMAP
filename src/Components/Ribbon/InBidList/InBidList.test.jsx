import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import InBidList from './InBidList';

describe('InBidListComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<InBidList />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<InBidList />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
