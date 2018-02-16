import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import GlossaryEditor, { mapDispatchToProps } from './GlossaryEditor';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('GlossaryEditor', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <GlossaryEditor />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('can call the submitGlossaryTerm function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <GlossaryEditor.WrappedComponent
        submitGlossaryTerm={spy}
      />,
    );
    wrapper.instance().submitGlossaryTerm({});
    sinon.assert.calledOnce(spy);
  });

  it('can call the submitNewGlossaryTerm function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <GlossaryEditor.WrappedComponent
        submitNewGlossaryTerm={spy}
      />,
    );
    wrapper.instance().submitNewGlossaryTerm({});
    sinon.assert.calledOnce(spy);
  });
});

describe('mapDispatchToProps', () => {
  const mockGlossaryObject = { id: 1, title: 'title', definition: 'definition' };
  const config = {
    submitGlossaryTerm: [mockGlossaryObject],
    submitNewGlossaryTerm: [mockGlossaryObject],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
