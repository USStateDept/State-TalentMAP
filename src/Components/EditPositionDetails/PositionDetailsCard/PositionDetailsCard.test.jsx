import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import PositionDetailsCard from './PositionDetailsCard';

describe('PositionDetailsCardComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<PositionDetailsCard />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<PositionDetailsCard />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
