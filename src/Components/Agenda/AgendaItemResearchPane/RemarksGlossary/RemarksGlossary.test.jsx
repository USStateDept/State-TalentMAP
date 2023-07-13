import { shallow } from 'enzyme';
import { find as _find } from 'lodash';
import toJSON from 'enzyme-to-json';
import RemarksGlossary from './RemarksGlossary';

describe('RemarksGlossary Component', () => {
  const userSelections = [
    {
      active_ind: 'Y',
      order_num: 7,
      rc_code: 'B',
      seq_num: 2,
      short_desc_text: 'Promo Bd Recognized',
      text: 'Potential recognized by last promo board',
    }];

  const remarks = [
    {
      active_ind: 'Y',
      mutually_exclusive_ind: 'N',
      order_num: 7,
      rc_code: 'B',
      seq_num: 2,
      short_desc_text: 'Promo Bd Recognized',
      text: 'Potential recognized by last promo board',
    },
    {
      active_ind: 'Y',
      mutually_exclusive_ind: 'N',
      order_num: 5,
      rc_code: 'G',
      seq_num: 3,
      short_desc_text: 'Soph',
      text: 'Sophie',
    }];

  const remarkCategories = [
    {
      code: 'B',
      desc_text: 'Bid List',
    },
    {
      code: 'G',
      desc_text: 'Civil Service',
    },
  ];

  it('is defined', () => {
    const wrapper = shallow(<RemarksGlossary />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<RemarksGlossary />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('displays the correct icon based on user selection', () => {
    const wrapper = shallow(
      <RemarksGlossary
        remarkCategories={remarkCategories}
        remarks={remarks}
        userSelections={userSelections}
      />);
    const liText = wrapper.find('li').map(
      child => ({ seq_num: child.first().key(),
        icon: child.children().first().children().first()
          .props().name }));
    const renderedUserRemark = _find(liText, { seq_num: '2' });
    const unselectedRemark = _find(liText, { seq_num: '3' });
    expect(renderedUserRemark.icon).toBe('minus-circle');
    expect(unselectedRemark.icon).toBe('plus-circle');
  });
});
