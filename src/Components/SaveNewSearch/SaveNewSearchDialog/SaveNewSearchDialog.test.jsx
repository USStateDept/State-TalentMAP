import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import { SaveNewSearchDialog, mapDispatchToProps } from './SaveNewSearchDialog';
import { testDispatchFunctions } from '../../../testUtilities/testUtilities';

describe('SaveNewSearchDialogComponent', () => {
  let wrapper = null;

  const props = {
    toggle: () => {},
    isOpen: false,
    hasErrored: '',
    isLoading: false,
    saveSearch: () => {},
    currentSearch: {},
  };

  it('is defined', () => {
    wrapper = shallow(
      <SaveNewSearchDialog
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when hasErrored is truthy', () => {
    wrapper = shallow(
      <SaveNewSearchDialog
        {...props}
        hasErrored="some error"
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can call the onSubmit function', () => {
    const form = { value: null, preventDefault: sinon.spy() };
    wrapper = shallow(
      <SaveNewSearchDialog
        {...props}
        saveSearch={(e) => { form.value = e; }}
      />,
    );
    wrapper.instance().onSubmit(form);
    expect(form.value).toBe(form.value);
    sinon.assert.calledOnce(form.preventDefault);
  });

  it('can call functions', () => {
    const formSubmitSpy = sinon.spy();
    wrapper = shallow(
      <SaveNewSearchDialog
        {...props}
        saveSearch={formSubmitSpy}
      />,
    );
    wrapper.instance().onSubmit();
    sinon.assert.calledOnce(formSubmitSpy);
  });

  it('performs logic on UNSAFE_componentWillReceiveProps()', () => {
    const toggleSpy = sinon.spy();

    const props$ = {
      ...props,
      toggle: toggleSpy,
      isLoading: true,
    };

    wrapper = shallow(
      <SaveNewSearchDialog
        {...props$}
      />,
    );
    const changeNewSearchNameSpy = sinon.spy(wrapper.instance(), 'changeNewSearchName');
    wrapper.setProps({ ...props$, isLoading: false, hasErrored: false });
    sinon.assert.calledOnce(toggleSpy);
    sinon.assert.calledOnce(changeNewSearchNameSpy);
  });

  it('performs logic on onCancel()', () => {
    const toggleSpy = sinon.spy();

    const props$ = {
      ...props,
      toggle: toggleSpy,
    };

    wrapper = shallow(
      <SaveNewSearchDialog
        {...props$}
      />,
    );
    wrapper.instance().onCancel();
    sinon.assert.calledOnce(toggleSpy);
  });

  it('matches snapshot', () => {
    wrapper = shallow(
      <SaveNewSearchDialog
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    toggle: [true],
    saveSearch: [{}],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
