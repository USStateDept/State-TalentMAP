import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import Favorite, { mapDispatchToProps } from './Favorite';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Favorite', () => {
  const props = {
    onToggle: () => {},
    isLoading: new Set(),
    hasErrored: false,
    refKey: 'key',
    compareArray: [],
  };

  it('is defined', () => {
    const wrapper = shallow(
      <Favorite.WrappedComponent {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is mounts', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Favorite {...props} />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  testDispatchFunctions(mapDispatchToProps, { onToggle: [1, true] });
});
