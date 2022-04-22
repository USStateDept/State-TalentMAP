import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AgendaItemResearchPane from './AgendaItemResearchPane';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('AgendaResearchPane Component', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({})}>
        <AgendaItemResearchPane />
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });
});
