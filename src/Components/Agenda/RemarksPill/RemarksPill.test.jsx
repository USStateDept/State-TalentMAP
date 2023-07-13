import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import RemarksPill from './RemarksPill';

describe('RemarksPill', () => {
  const props = {
    remark: {
      active_ind: 'Y',
      order_num: 7,
      rc_code: 'B',
      seq_num: 2,
      short_desc_text: 'Promo Bd Recognized',
      text: 'Potential recognized by {Bureau} at last promo board {date}',
      remark_inserts: [
        {
          riinsertiontext: '{Bureau}',
          rirmrkseqnum: 225,
          riseqnum: 193,
        },
        {
          riinsertiontext: '{date}',
          rirmrkseqnum: 225,
          riseqnum: 192,
        },
      ],
      ari_insertions: {
        193: 'GTM/EX/OTS/SSD/OAB/OS',
        192: '1.1.1600',
      },
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

  xit('matches snapshot when remarks are provided', () => {
    const wrapper = shallow(<RemarksPill {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  xit('displays an editable remark', () => {
    const wrapper = shallow(<RemarksPill {...props} />);
    const expected = 'Potential recognized by GTM/EX/OTS/SSD/OAB/OS at last promo board 1.1.1600<FontAwesome />';
    expect(wrapper.find('div').text()).toBe(expected);
  });

  xit('displays an un-editable remark', () => {
    const wrapper = shallow(<RemarksPill {...props} isEditable={false} />);
    const expected = 'Potential recognized by GTM/EX/OTS/SSD/OAB/OS at last promo board 1.1.1600';
    expect(wrapper.find('div').text()).toBe(expected);
  });
});
