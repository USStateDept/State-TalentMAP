import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import toJSON from 'enzyme-to-json';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AgendaItemTimeline from './AgendaItemTimeline';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('AgendaItemTimeline Component', () => {
  it('is defined', () => {
    const wrapper = mount(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <AgendaItemTimeline />
        </MemoryRouter>
      </Provider>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  // snapshot test will fail as long as legs are randomly generated.
  // TODO - add back in once integrated
  xit('matches snapshot', () => {
    const wrapper = shallow(<AgendaItemTimeline />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
