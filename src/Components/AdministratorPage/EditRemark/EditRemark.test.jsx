import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import EditRemark from './EditRemark';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('EditRemark Component', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({})}>
        <EditRemark />
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });
});
