import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ChecklistModal from './ChecklistModal';


describe('ChecklistModal', () => {
  it('is defined', () => {
    const wrapper = shallow(<ChecklistModal />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ChecklistModal />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
