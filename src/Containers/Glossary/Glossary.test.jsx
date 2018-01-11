import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import Glossary, { mapDispatchToProps } from './Glossary';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Glossary', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Glossary />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('can call the toggleVisibility function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Glossary.WrappedComponent
        toggleGlossaryVisibility={spy}
      />,
    );
    wrapper.instance().toggleVisibility();
    sinon.assert.calledOnce(spy);
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    toggleGlossaryVisibility: [true],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
