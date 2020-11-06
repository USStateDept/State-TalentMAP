import { shallow } from 'enzyme';
import TandemSelectionFilter from './TandemSelectionFilter';

describe('TandemSelectionFilter', () => {
  const props = {
    onChange: () => {},
    userProfile: { display_name: 'John Doe' },
    isLoading: false,
  };
  it('is defined', () => {
    const wrapper = shallow(
      <TandemSelectionFilter.WrappedComponent {...props} />,
    );
    expect(wrapper).toBeDefined();
  });
});
