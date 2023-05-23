import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import PanelMeetingSearchRow from './PanelMeetingSearchRow';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('PanelMeetingSearchRow', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({})}>
        <Router>
          <PanelMeetingSearchRow />
        </Router>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });
});
