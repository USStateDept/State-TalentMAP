import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import SaveNewSearchDialog from './SaveNewSearchDialog';

describe('SaveNewSearchDialogComponent', () => {
  let wrapper = null;

  it('is defined', () => {
    wrapper = shallow(
      <SaveNewSearchDialog
        onCancel={() => {}}
        onTextChange={() => {}}
        onFormSubmit={() => {}}
        newSavedSearchHasErrored="error"
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can call functions', () => {
    const cancelSpy = sinon.spy();
    const textSpy = sinon.spy();
    const formSubmitSpy = sinon.spy();
    wrapper = shallow(
      <SaveNewSearchDialog
        onCancel={cancelSpy}
        onTextChange={textSpy}
        onFormSubmit={formSubmitSpy}
      />,
    );
    wrapper.instance().props.onCancel();
    wrapper.instance().props.onTextChange();
    wrapper.instance().props.onFormSubmit();
    sinon.assert.calledOnce(cancelSpy);
    sinon.assert.calledOnce(textSpy);
    sinon.assert.calledOnce(formSubmitSpy);
  });

  it('matches snapshot', () => {
    wrapper = shallow(
      <SaveNewSearchDialog
        onCancel={() => {}}
        onTextChange={() => {}}
        onFormSubmit={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
