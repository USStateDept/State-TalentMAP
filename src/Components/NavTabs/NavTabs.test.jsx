import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import NavTabs from './NavTabs';

describe('NavTabsComponent', () => {
  const wrapper = shallow(<NavTabs />);
  it('is defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
