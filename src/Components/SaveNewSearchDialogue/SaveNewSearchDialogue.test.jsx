import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import SaveNewSearchDialogue from './SaveNewSearchDialogue';

describe('SaveNewSearchDialogueComponent', () => {
  let wrapper = null;

  it('is defined', () => {
    wrapper = shallow(
      <SaveNewSearchDialogue
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
      <SaveNewSearchDialogue
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
      <SaveNewSearchDialogue
        onCancel={() => {}}
        onTextChange={() => {}}
        onFormSubmit={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
