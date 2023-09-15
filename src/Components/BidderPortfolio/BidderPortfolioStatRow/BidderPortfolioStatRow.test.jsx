import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import toJSON from 'enzyme-to-json';
import BidderPortfolioStatRow from './BidderPortfolioStatRow';
import { clientObject } from '../../../__mocks__/client';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('BidderPortfolioStatRow', () => {
  const props = {
    userProfile: clientObject,
  };
  it('is defined', () => {
    const wrapper = shallow(
    <Provider store={mockStore({})}>
      <BidderPortfolioStatRow
        {...props}
      />
    </Provider>,);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <BidderPortfolioStatRow
          {...props}
        />
      </Provider>,);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
