import { shallow } from 'enzyme';
import RemarksPage from './RemarksPage';


describe('RemarksPage Component', () => {
  it('is defined', () => {
    const wrapper = shallow(<RemarksPage />);
    expect(wrapper).toBeDefined();
  });
});
