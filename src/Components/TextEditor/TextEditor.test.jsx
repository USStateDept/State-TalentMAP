// draft-js creates dynamic keys, so we won't do any snapshot testing here

import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import TextEditor from './TextEditor';

describe('TextEditorComponent', () => {
  const id = '1';

  it('is defined', () => {
    const wrapper = shallow(
      <TextEditor
        onSubmitText={() => {}}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can submit text', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <TextEditor
        id={id}
        onSubmitText={spy}
      />,
    );
    wrapper.instance().submit();
    sinon.assert.calledOnce(spy);
  });

  it('can call the cancel function', () => {
    const cancelSpy = sinon.spy();
    const wrapper = shallow(
      <TextEditor
        id={id}
        onSubmitText={() => {}}
        cancel={cancelSpy}
      />,
    );
    wrapper.instance().cancel();
    expect(wrapper.instance().state.editorState).toBeDefined();
    sinon.assert.calledOnce(cancelSpy);
  });

  it('can call the onChange function', () => {
    const text = { value: 'text' };
    const wrapper = shallow(
      <TextEditor
        id={id}
        onSubmitText={() => {}}
      />,
    );
    wrapper.instance().onChange(text);
    expect(wrapper.instance().state.editorState).toBeDefined();
  });

  it('can properly set editorState and editorStateCopy', () => {
    const wrapper = shallow(
      <TextEditor
        id={id}
        onSubmitText={() => {}}
        initialText="test"
      />,
    );
    // get our "normal" and "copy" states, then use the plain text
    // function to check for equality, as the root object is a nested immutable
    // object with different keys.
    const instanceEditorState = wrapper.instance().state.editorState
      .getCurrentContent().getPlainText();
    const instanceEditorStateCopy = wrapper.instance().state.editorStateCopy
      .getCurrentContent().getPlainText();
    expect(instanceEditorState).toBe(instanceEditorStateCopy);
  });

  it('can properly maintain the value of the editorState and editorStateCopy after canceling', () => {
    const wrapper = shallow(
      <TextEditor
        id={id}
        onSubmitText={() => {}}
        initialText="test"
      />,
    );
    // regular and copied state should initialize as different objects
    let instanceEditorState = wrapper.instance().state.editorState;
    let instanceEditorStateCopy = wrapper.instance().state.editorStateCopy;
    expect(instanceEditorState).not.toEqual(instanceEditorStateCopy);

    // then we'll simulate a cancel
    wrapper.instance().cancel();
    // and now the regular and copied states should match
    instanceEditorState = wrapper.instance().state.editorState;
    instanceEditorStateCopy = wrapper.instance().state.editorStateCopy;
    expect(instanceEditorState).toEqual(instanceEditorStateCopy);
  });

  it('can properly maintain the value of the editorState and editorStateCopy after submitting', () => {
    const wrapper = shallow(
      <TextEditor
        id={id}
        onSubmitText={() => {}}
        initialText="test"
      />,
    );
    // regular and copied state should initialize as different objects
    let instanceEditorState = wrapper.instance().state.editorState;
    let instanceEditorStateCopy = wrapper.instance().state.editorStateCopy;
    expect(instanceEditorState).not.toEqual(instanceEditorStateCopy);

    // then we'll simulate a cancel
    wrapper.instance().submit();
    // and now the regular and copied states should match
    instanceEditorState = wrapper.instance().state.editorState;
    instanceEditorStateCopy = wrapper.instance().state.editorStateCopy;
    expect(instanceEditorState).toEqual(instanceEditorStateCopy);
  });
});
