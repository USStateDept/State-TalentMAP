import { shallow } from 'enzyme';
import SavedSearchesWrapper from './SavedSearchesWrapper';

describe('SavedSearchesWrapperComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <SavedSearchesWrapper />,
    );
    expect(wrapper).toBeDefined();
  });
});
