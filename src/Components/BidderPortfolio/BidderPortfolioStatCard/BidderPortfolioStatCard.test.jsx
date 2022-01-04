import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidderPortfolioStatCard from './BidderPortfolioStatCard';
import { clientObject } from '../../../__mocks__/client';

describe('BidderPortfolioStatCard', () => {
  const props = {
    userProfile: clientObject,
  };
  it('is defined', () => {
    const wrapper = shallow(<BidderPortfolioStatCard
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidderPortfolioStatCard
      {...props}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
