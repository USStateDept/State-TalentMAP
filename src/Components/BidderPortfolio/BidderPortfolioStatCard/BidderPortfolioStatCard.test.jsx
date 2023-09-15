import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import toJSON from 'enzyme-to-json';
import thunk from 'redux-thunk';
import BidderPortfolioStatCard from './BidderPortfolioStatCard';
import { clientObject } from '../../../__mocks__/client';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('BidderPortfolioStatCard', () => {
  const props = {
    userProfile: clientObject,
  };
  it('is defined', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <BidderPortfolioStatCard
          {...props}
        />
      </Provider>, 
      );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <BidderPortfolioStatCard
          {...props}
        />
      </Provider>, 
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
