import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import BetaHeader from './BetaHeader';

describe('BetaHeader', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <BetaHeader.WrappedComponent />,
    );
    expect(wrapper).toBeDefined();
  });

  it('calls patchData on this.patchData()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <BetaHeader.WrappedComponent patchData={spy} />,
    );
    wrapper.instance().patchData();
    sinon.assert.calledOnce(spy);
  });

  it('updates state on this.toggleEditor()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <BetaHeader.WrappedComponent patchData={spy} />,
    );
    expect(wrapper.instance().state.editorVisible).toBe(false);
    wrapper.instance().toggleEditor();
    expect(wrapper.instance().state.editorVisible).toBe(true);
  });

  it('updates state and calls patchData on this.submit()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <BetaHeader.WrappedComponent patchData={spy} />,
    );
    wrapper.instance().setState({ editorVisible: true });
    expect(wrapper.instance().state.editorVisible).toBe(true);
    wrapper.instance().submit();
    expect(wrapper.instance().state.editorVisible).toBe(false);
    sinon.assert.calledOnce(spy);
  });

  it('updates state on this.cancel()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <BetaHeader.WrappedComponent patchData={spy} />,
    );
    wrapper.instance().setState({ editorVisible: true });
    expect(wrapper.instance().state.editorVisible).toBe(true);
    wrapper.instance().cancel();
    expect(wrapper.instance().state.editorVisible).toBe(false);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BetaHeader.WrappedComponent />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
