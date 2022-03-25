import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import RemarksGlossary from './RemarksGlossary';

describe('RemarksGlossary Component', () => {
  it('is defined', () => {
    const wrapper = shallow(<RemarksGlossary />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<RemarksGlossary />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
