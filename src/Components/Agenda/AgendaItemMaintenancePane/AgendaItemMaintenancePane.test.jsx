import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AgendaItemMaintenancePane from './AgendaItemMaintenancePane';

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
    const wrapper = shallow(<AgendaItemMaintenancePane />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<AgendaItemMaintenancePane />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('displays the correct RemarksPill when a remark is selected', () => {
    const wrapper = shallow(<AgendaItemMaintenancePane {...props} />);
    const remarksPill = wrapper.find('.remarks-container').children().find('RemarksPill');
    const renderedSeqNum = remarksPill.props().remark.seq_num;
    expect(renderedSeqNum).toBe(props.userSelections[0].seq_num);
  });
});
