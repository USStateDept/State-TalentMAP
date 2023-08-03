import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PublishablePositionCard from './PublishablePositionCard';
import resultsObject from '../../__mocks__/resultsObject';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('PublishablePositionCard', () => {
  const result = resultsObject.results[0];

  it('is defined', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <PublishablePositionCard.WrappedComponent data={result} />
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });
});
