import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import TextEditorSubmit from './TextEditorSubmit';

describe('TextEditorSubmitComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <TextEditorSubmit
        submit={() => {}}
        cancel={() => {}}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can click submit', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <TextEditorSubmit
        submit={spy}
        cancel={() => {}}
      />,
    );
    // submit is the first button (0 index)
    wrapper.find('button').at(0).simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('can click cancel', () => {
    const cancelSpy = sinon.spy();
    const wrapper = shallow(
      <TextEditorSubmit
        submit={() => {}}
        cancel={cancelSpy}
      />,
    );
    // cancel is the second button (1 index)
    wrapper.find('button').at(1).simulate('click');
    sinon.assert.calledOnce(cancelSpy);
  });
});
