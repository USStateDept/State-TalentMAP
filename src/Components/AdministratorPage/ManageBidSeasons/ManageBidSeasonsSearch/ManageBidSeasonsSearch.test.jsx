import { shallow } from 'enzyme';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import PositionManagerSearch from './PositionManagerSearch';

describe('PositionManagerSearch', () => {
  const props = {
    submitSearch: EMPTY_FUNCTION,
  };

  it('is defined', () => {
    const wrapper = shallow(<PositionManagerSearch {...props} />);
    expect(wrapper).toBeDefined();
  });
});
