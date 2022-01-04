import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Splash from './Splash';

describe('Splash', () => {
  it('is defined', () => {
    const wrapper = shallow(<Splash />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<Splash />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
