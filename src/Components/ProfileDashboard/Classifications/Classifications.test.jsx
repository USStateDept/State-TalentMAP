import toJSON from 'enzyme-to-json';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import Classifications from './Classifications';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('UpdatesComponent', () => {
  const props = {
    classifications: [{
      code: 'P',
      text: 'Pickering/Rangel Fellows',
      seasons: [{ id: 185, season_text: null }],
    }],
    clientClassifications: ['1', '2'],
    updateUserClassifications: EMPTY_FUNCTION,
    userId: 1,
  };

  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Classifications
        {...props}
      />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Classifications
        {...props}
      />
    </MemoryRouter></Provider>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
