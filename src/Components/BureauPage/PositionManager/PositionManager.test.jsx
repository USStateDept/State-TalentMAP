import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PositionManager from './PositionManager';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('BureauPage', () => {
  it('mounts', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <PositionManager />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('is defined', () => {
    const wrapper = shallow(<PositionManager />);
    expect(wrapper).toBeDefined();
  });
});
