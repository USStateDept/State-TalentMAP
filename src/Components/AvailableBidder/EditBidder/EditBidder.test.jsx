import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import EditBidder from './EditBidder';

describe('EditBidders Component', () => {
  it('is defined', () => {
    const wrapper = shallow(<EditBidder />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<EditBidder />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
