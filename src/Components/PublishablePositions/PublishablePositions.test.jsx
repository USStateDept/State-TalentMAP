import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import PublishablePositions from './PublishablePositions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('PublishablePositions Component', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <PublishablePositions isCDO />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <PublishablePositions />
        </MemoryRouter>
      </Provider>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
