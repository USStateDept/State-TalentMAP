import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AssignmentsList from './AssignmentsList';
import assignmentObject from '../../../__mocks__/assignmentObject';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('AssignmentsListComponent', () => {
  const positions = [assignmentObject];
  it('is defined', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <AssignmentsList assignments={positions} />
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <AssignmentsList assignments={positions} />
      </Provider>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when there are no bids', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <AssignmentsList assignments={[]} />
      </Provider>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
