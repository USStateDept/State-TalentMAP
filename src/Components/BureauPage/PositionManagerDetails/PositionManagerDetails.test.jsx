import { shallow } from 'enzyme';
import PositionManagerDetails from './PositionManagerDetails';

describe('PositionManagerDetails', () => {
  const props = {
  };

  it('is defined', () => {
    const wrapper = shallow(<PositionManagerDetails.WrappedComponent {...props} />);
    expect(wrapper).toBeDefined();
  });
});
