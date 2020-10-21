import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SectionHeader from './SectionHeader';

describe('SectionHeaderComponent', () => {
  const props = {
    title: 'Title',
    buttonText: 'click me',
    icon: 'clock-o',
  };

  it('is defined', () => {
    const wrapper = shallow(<SectionHeader {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<SectionHeader {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
