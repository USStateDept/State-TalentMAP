import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import toJSON from 'enzyme-to-json';
import ExportLink from './ExportLink';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ExportLink Component', () => {
  it('is defined', () => {
    const wrapper = mount(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <ExportLink />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('it mounts', () => {
    const wrapper = mount(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <ExportLink />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('calls onClick on button click', () => {
    const wrapper = mount(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <ExportLink />
        </MemoryRouter>
      </Provider>,
    );
    const button = wrapper.find('ExportButton').first();
    button.simulate('click');
    // You can add more assertions here to check the state or other side effects
  });

  it('matches snapshot', () => {
    const wrapper = mount(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <ExportLink />
        </MemoryRouter>
      </Provider>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
