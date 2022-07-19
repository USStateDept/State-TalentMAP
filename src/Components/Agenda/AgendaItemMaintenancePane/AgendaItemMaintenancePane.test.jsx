import toJSON from 'enzyme-to-json';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import AgendaItemMaintenancePane from './AgendaItemMaintenancePane';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('AgendaItemMaintenancePane Component', () => {
  const props = {
    userSelections: [
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
  };

  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({})}>
        <AgendaItemMaintenancePane perdet={'2'} />
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({})}>
        <AgendaItemMaintenancePane perdet={'2'} />
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
    expect(renderedSeqNum).toBe(props.userSelections[0].seq_num);
  });
});
