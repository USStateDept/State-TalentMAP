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

  it('can call the submitNewSavedSearch function', () => {
    const form = { value: null };
    wrapper = shallow(
      <SaveNewSearchDialog
        onCancel={() => {}}
        onTextChange={() => {}}
        onFormSubmit={(e) => { form.value = e; }}
        newSavedSearchHasErrored="error"
      />,
    );
    const formValue = 1;
    wrapper.instance().submitNewSavedSearch(formValue);
    expect(form.value).toBe(formValue);
  });

  it('can call the submitUpdatedSavedSearch function', () => {
    const form = { value: null, valueSec: null };
    const savedSearch = { id: 1, name: 'test' };
    wrapper = shallow(
      <SaveNewSearchDialog
        onCancel={() => {}}
        onTextChange={() => {}}
        onFormSubmit={(e, id) => { form.value = e; form.valueSec = id; }}
        newSavedSearchHasErrored="error"
        currentSavedSearch={savedSearch}
      />,
    );
    const formValue = 1;
    wrapper.instance().submitUpdatedSavedSearch(formValue);
    expect(form.value).toBe(formValue);
    expect(form.valueSec).toBe(savedSearch.id);
  });

  it('can call the onSubmit function', () => {
    const savedSearch = { id: 1, name: 'test' };
    const spy = sinon.spy();
    wrapper = shallow(
      <SaveNewSearchDialog
        onCancel={() => {}}
        onTextChange={() => {}}
        onFormSubmit={spy}
        newSavedSearchHasErrored="error"
        currentSavedSearch={savedSearch}
      />,
    );
    wrapper.instance().onSubmit();
    sinon.assert.calledOnce(spy);
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
