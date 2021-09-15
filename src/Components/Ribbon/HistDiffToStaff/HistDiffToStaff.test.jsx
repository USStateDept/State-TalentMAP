import { shallow } from 'enzyme';
import HistDiffToStaff from './HistDiffToStaff';

describe('HistDiffToStaffComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<HistDiffToStaff />);

    expect(wrapper).toBeDefined();
  });
});
