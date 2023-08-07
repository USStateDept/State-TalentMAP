import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PanelAdmin from './PanelAdmin';
import { MemoryRouter } from 'react-router';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('PanelAdmin Component', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <PanelAdmin />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });
});
