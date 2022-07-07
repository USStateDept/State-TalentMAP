import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import TestUtils from 'react-dom/test-utils';
import RemarksPill from './RemarksPill';
// import AgendaItemMaintenanceContainer from '../AgendaItemMaintenanceContainer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('RemarksPill', () => {
  const props = {
    remark: {
      active_ind: 'Y',
      mutually_exclusive_ind: 'N',
      order_num: 7,
      rc_code: 'B',
      seq_num: 2,
      short_desc_text: 'Promo Bd Recognized',
      text: 'Potential recognized by last promo board',
    },
    isEditable: true,
    userSelection: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(<RemarksPill />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<RemarksPill />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when remarks are provided', () => {
    const wrapper = shallow(<RemarksPill {...props} />);
    // console.log(toJSON(wrapper));
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  xit('displays a remark', () => {
    const wrapper = shallow(<RemarksPill {...props} />);
    expect(wrapper.find('div').text()).toBe(props.remark.text);
  });

  it('shows an x when a remark isEditable', () => {
    const wrapper = shallow(<RemarksPill {...props} />);
    const expected = `${props.remark.text}<FontAwesome />`;
    expect(wrapper.find('div').text()).toBe(expected);
  });

  xit('callback', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<RemarksPill updateSelection={spy} />);
    const button = wrapper.find('fa fa-times');
    // console.log(button);
    button.simulate('click');
    // wrapper.updateSelection();
    sinon.assert.calledOnce(spy);
  });

  xit('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <RemarksPill {...props} />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });
});
