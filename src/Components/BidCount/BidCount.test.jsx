import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidCount from './BidCount';

describe('BidCountComponent', () => {
  const props = {
    bidStatistics: {
      total_bids: 5,
      in_grade: 5,
      at_skill: 5,
      in_grade_at_skill: 5,
    },
  };
  const stylePropsTrue = {
    altStyle: true,
    isCondensed: true,
    isTandemTwo: true,
  };
  const stylePropsFalse = {
    altStyle: false,
    isCondensed: false,
    isTandemTwo: false,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <BidCount {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when hideLabel is true', () => {
    const wrapper = shallow(
      <BidCount {...props} hideLabel />,
    );
    expect(wrapper).toBeDefined();
  });

  it('properly renders classes on true', () => {
    const wrapper = shallow(
      <BidCount {...props} {...stylePropsTrue} />,
    );
    expect(wrapper.find('.bid-count-secondary').exists()).toBe(true);
    expect(wrapper.find('.bid-count-condensed').exists()).toBe(true);
    expect(wrapper.find('.bid-count-list-tandem').exists()).toBe(true);
  });

  it('properly renders classes on false', () => {
    const wrapper = shallow(
      <BidCount {...props} {...stylePropsFalse} />,
    );
    expect(wrapper.find('.bid-count-secondary').exists()).toBe(false);
    expect(wrapper.find('.bid-count-condensed').exists()).toBe(false);
    expect(wrapper.find('.bid-count-list-tandem').exists()).toBe(false);
  });

  it('displays 0 when a prop is not defined', () => {
    const bidStatistics = {
      total_bids: undefined,
      in_grade: null,
      at_skill: 5,
    };
    const wrapper = shallow(
      <BidCount {...props} bidStatistics={bidStatistics} />,
    );
    expect(wrapper.find('BidCountNumber').at(0).props().number).toBe(0);
    expect(wrapper.find('BidCountNumber').at(1).props().number).toBe(0);
    expect(wrapper.find('BidCountNumber').at(2).props().number).toBe(5);
    expect(wrapper.find('BidCountNumber').at(3).props().number).toBe(0);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidCount {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when hideLabel is true', () => {
    const wrapper = shallow(
      <BidCount {...props} hideLabel />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
