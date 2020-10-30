import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Success from './Success';
import detailsObject from '../../__mocks__/detailsObject';

describe('Success', () => {
  const props = {
    client: {
      perdet_seq_number: 12345,
      name: 'Woodard, Wendy',
    },
    hideLink: false,
  };

  it('is defined', () => {
    const wrapper = shallow(<Success pos={detailsObject} {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Link')
      .exists()).toBe(true);
  });

  it('hides link', () => {
    const wrapper = shallow(<Success pos={detailsObject} {...props} hideLink />);
    expect(wrapper.find('Link')
      .exists()).toBe(false);
  });

  it('renders public profile link when given perdet', () => {
    const wrapper = shallow(<Success pos={detailsObject} {...props} />);
    expect(wrapper.find('Link').prop('to')).toBe('/profile/bidtracker/public/12345/');
  });

  it('renders basic link', () => {
    const wrapper = shallow(<Success pos={detailsObject} />);
    expect(wrapper.find('Link').prop('to')).toBe('/profile/bidtracker/');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<Success pos={detailsObject} {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
