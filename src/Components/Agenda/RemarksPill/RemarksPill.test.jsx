import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import RemarksPill from './RemarksPill';

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

  const props2 = {
    remark: {
      active_ind: 'Y',
      mutually_exclusive_ind: 'N',
      order_num: 7,
      rc_code: 'B',
      seq_num: 2,
      short_desc_text: 'Promo Bd Recognized',
      text: 'Potential recognized by last promo board',
    },
    isEditable: false,
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
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('displays an editable remark', () => {
    const wrapper = shallow(<RemarksPill {...props} />);
    const expected = `${props.remark.text}<FontAwesome />`;
    expect(wrapper.find('div').text()).toBe(expected);
  });

  it('displays an un-editable remark', () => {
    const wrapper = shallow(<RemarksPill {...props2} />);
    const expected = `${props.remark.text}`;
    expect(wrapper.find('div').text()).toBe(expected);
  });
});
