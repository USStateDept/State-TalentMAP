import toJSON from 'enzyme-to-json';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import AgendaItemMaintenancePane from './AgendaItemMaintenancePane';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('AgendaItemMaintenancePane Component', () => {
  const props = {
    userRemarks: [
      {
        active_ind: 'Y',
        mutually_exclusive_ind: 'N',
        order_num: 7,
        rc_code: 'B',
        seq_num: 2,
        short_desc_text: 'Promo Bd Recognized',
        text: 'Potential recognized by last promo board',
      },
    ],
    unitedLoading: false,
    employee: {
      employeeData: {
        user_info: {
          hru_id: 1
        },
        cdos: [{
          cdo_first_name: 'Test',
          cdo_last_name: 'Test',
        }]
      },
      employeeDataError: false,
      employeeDataLoading: false,
    }
  };

  it('is defined', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <AgendaItemMaintenancePane {...props} perdet={'2'} />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <AgendaItemMaintenancePane {...props} perdet={'2'} />
      </Provider>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('displays the correct RemarksPill when a remark is selected', () => {
    const wrapper = mount(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <AgendaItemMaintenancePane {...props} perdet={'2'} />
        </MemoryRouter>
      </Provider>,
    );
    const remarksPill = wrapper.find('.remarks-container').children().find('RemarksPill');
    const renderedSeqNum = remarksPill.props().remark.seq_num;
    expect(renderedSeqNum).toBe(props.userRemarks[0].seq_num);
  });
});
