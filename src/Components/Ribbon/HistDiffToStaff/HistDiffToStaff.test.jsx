import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import HistDiffToStaff from './HistDiffToStaff';

describe('HistDiffToStaffComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<HistDiffToStaff />);
    expect(wrapper).toBeDefined();
  });

  it('text correct when !shortName', () => {
    const wrapper = shallow(<HistDiffToStaff />);
    expect(wrapper.find('Ribbon').props().text).toBe('Hist. Diff. to Staff');
  });

  it('text correct when shortName', () => {
    const wrapper = shallow(<HistDiffToStaff shortName />);
    expect(wrapper.find('Ribbon').props().text).toBe('HDS');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<HistDiffToStaff />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
