import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidderPortfolioStatRow from './BidderPortfolioStatRow';
import { clientObject } from '../../../__mocks__/client';

describe('BidderPortfolioStatRow', () => {
  const props = {
    userProfile: clientObject,
  };
  it('is defined', () => {
    const wrapper = shallow(<BidderPortfolioStatRow
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidderPortfolioStatRow
      {...props}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
