import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import AgendaItemMaintenanceContainer from './AgendaItemMaintenanceContainer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('AgendaItemMaintenanceContainerComponent', () => {
  const userSelections = {
    remark: {
      active_ind: 'Y',
      mutually_exclusive_ind: 'N',
      order_num: 7,
      rc_code: 'B',
      seq_num: 2,
      short_desc_text: 'Promo Bd Recognized',
      text: 'Potential recognized by last promo board',
    } };

  it('is defined', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <AgendaItemMaintenanceContainer.WrappedComponent />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when there is a route id', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <AgendaItemMaintenanceContainer.WrappedComponent
            match={{ params: { id: 1 } }}
          />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <AgendaItemMaintenanceContainer.WrappedComponent />
        </MemoryRouter>
      </Provider>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  xit('displays the correct header', () => {
    const wrapper = shallow(
      <AgendaItemMaintenanceContainer.WrappedComponent
        userSelections={userSelections}
      />);
    const header = toJSON(wrapper.find('.ai-maintenance-container').children('span').children());
    expect(header).toBe(' - Employee Name Placeholder');
  });
});
