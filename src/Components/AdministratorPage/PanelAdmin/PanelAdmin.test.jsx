import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PanelAdmin from './PanelAdmin';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('PanelAdmin Component', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <PanelAdmin />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });
});
