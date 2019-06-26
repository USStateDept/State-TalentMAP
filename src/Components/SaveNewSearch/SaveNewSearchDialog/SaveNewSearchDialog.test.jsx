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
    const cancelSpy = sinon.spy();
    const formSubmitSpy = sinon.spy();
    wrapper = shallow(
      <SaveNewSearchDialog
        {...props}
        onCancel={cancelSpy}
        saveSearch={formSubmitSpy}
      />,
    );
    wrapper.instance().props.onCancel();
    wrapper.instance().onSubmit();
    sinon.assert.calledOnce(cancelSpy);
    sinon.assert.calledOnce(formSubmitSpy);
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
