import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Faq from './Faq';

describe('Faq', () => {
  it('is defined', () => {
    const wrapper = shallow(<Faq />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<Faq />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
