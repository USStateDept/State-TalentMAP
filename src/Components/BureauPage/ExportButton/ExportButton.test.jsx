import { shallow } from 'enzyme';
import ExportButton from './ExportButton';

describe('ExportButton', () => {
  const props = {
    id: 1,
  };

  it('is defined', () => {
    const wrapper = shallow(<ExportButton {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('sets state on exportBidders()', () => {
    const wrapper = shallow(<ExportButton {...props} />);
    wrapper.instance().exportBidders();
    expect(wrapper.instance().state.isLoading).toBe(true);
  });
});
