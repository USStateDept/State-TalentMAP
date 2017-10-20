import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import toJSON from 'enzyme-to-json';
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
    wrapper.find('.usa-button').simulate('click');
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

  it('matches snapshot', () => {
    const wrapper = shallow(
      <TextEditor
        id={id}
        onSubmitText={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
