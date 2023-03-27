import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import FrequentPositions from './FrequentPositions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('FrequentPositionsComponent', () => {
  const props = {
    positions: [
      {
        pos_org_short_desc: 'AF',
        pos_num_text: '010101010',
        pos_title_desc: 'Information Technology Spec',
      },
    ],
  };
  it('is defined', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <FrequentPositions {...props} />,
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <FrequentPositions {...props} />,
        </MemoryRouter>
      </Provider>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
