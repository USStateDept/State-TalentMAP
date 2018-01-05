import React from 'react';
import sinon from 'sinon';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { testDispatchFunctions } from '../../../testUtilities/testUtilities';
import GlossaryIcon, { mapDispatchToProps } from './GlossaryIcon';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const history = createHistory();

describe('GlossaryIconComponent', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <GlossaryIcon history={history} />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('can toggle visibility', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <GlossaryIcon.WrappedComponent toggleGlossaryVisibility={spy} />,
    );
    wrapper.instance().toggleVisibility();
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <GlossaryIcon.WrappedComponent />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    toggleGlossaryVisibility: [true],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
