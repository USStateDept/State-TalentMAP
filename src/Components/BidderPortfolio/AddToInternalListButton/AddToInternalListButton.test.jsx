import { shallow } from 'enzyme';
import AddToInternalListButton from './AddToInternalListButton';

describe('AddToInternalListButton', () => {
  const props = {
    refKey: 1,
  };

  it('is defined', () => {
    const wrapper = shallow(<AddToInternalListButton.WrappedComponent {...props} />);
    expect(wrapper).toBeDefined();
  });
});
