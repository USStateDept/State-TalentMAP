import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Stats, { formatNum } from './Stats';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('formatNum', () => {
  it('formats a number correctly', () => {
    expect(formatNum(1000)).toBe('1,000');
  });
});

describe('Stats', () => {
  const props = {
    stats: [
      { type: 'total', title: 'total', count: 1000 },
      { type: 'unique', title: 'unique', count: 1000 },
    ],
    statsIsLoading: false,
    statsHasErrored: false,
    statsSuccess: true,
    getStats: () => [],
  };

  it('mounts', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <Stats {...props} />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined', () => {
    const wrapper = shallow(<Stats.WrappedComponent {...props} />);
    expect(wrapper).toBeDefined();
  });
});
