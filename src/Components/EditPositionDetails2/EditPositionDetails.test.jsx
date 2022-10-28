import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import EditPositionDetails from './EditPositionDetails';

describe('EditPositionDetails Component', () => {
  it('is defined', () => {
    const wrapper = shallow(<EditPositionDetails />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<EditPositionDetails />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
