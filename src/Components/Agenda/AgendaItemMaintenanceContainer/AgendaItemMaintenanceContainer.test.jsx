import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AgendaItemMaintenanceContainer from './AgendaItemMaintenanceContainer';

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
    const wrapper = shallow(<AgendaItemMaintenanceContainer.WrappedComponent />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when there is a route id', () => {
    const wrapper = shallow(
      <AgendaItemMaintenanceContainer.WrappedComponent
        match={{ params: { id: 1 } }}
      />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<AgendaItemMaintenanceContainer.WrappedComponent />);
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
