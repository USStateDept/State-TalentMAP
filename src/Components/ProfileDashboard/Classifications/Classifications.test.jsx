import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Classifications from './Classifications';

describe('UpdatesComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<Classifications />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<Classifications />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
