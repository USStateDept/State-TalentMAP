import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import BidderPortfolioGridList, { isAllFalse, isAllTrue } from './BidderPortfolioGridList';
import bidderListObject from '../../../__mocks__/bidderListObject';
import classifications from '../../../__mocks__/classificationsObject';

describe('BidderPortfolioGridListComponent', () => {
  const props = {
    results: bidderListObject.results,
    showEdit: false,
    classifications,
    showExpand: false,
  };

  it('is defined', () => {
    const wrapper = shallow(<BidderPortfolioGridList
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  [['componentDidMount'], ['onSetAccordion'], ['toggleExpand', { expandAll: false }],
    ['toggleExpand', { expandAll: true }]].map(m => (
    it(`calls debouncedSetValue (setExpandAllValue child function) after ${m[0]} and new state === ${m[1]}`, (done) => {
      const wrapper = shallow(<BidderPortfolioGridList
        {...props}
      />);
      const spy = sinon.spy(wrapper.instance(), 'setExpandAllValue');
      if (m[1]) {
        wrapper.instance().setState(m[1]);
      }
      wrapper.instance()[m[0]]();
      setTimeout(() => {
        sinon.assert.calledOnce(spy);
        done();
      }, 1);
    })
  ));

  it('matches snapshot', () => {
    const wrapper = shallow(<BidderPortfolioGridList
      {...props}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  describe('helpers', () => {
    it('returns true if true', () => {
      expect(isAllTrue(true)).toBe(true);
    });

    it('returns true if false', () => {
      expect(isAllFalse(false)).toBe(true);
    });
  });
});
