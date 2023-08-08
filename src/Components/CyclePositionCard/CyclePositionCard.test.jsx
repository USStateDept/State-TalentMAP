import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CyclePositionCard from './CyclePositionCard';
import resultsObject from '../../__mocks__/resultsObject';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('CyclePositionCard', () => {
  const result = resultsObject.results[0];

  it('is defined', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <CyclePositionCard data={result} />
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });
});
