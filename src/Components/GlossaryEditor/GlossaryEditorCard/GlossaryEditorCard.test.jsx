import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import GlossaryEditorCard from './GlossaryEditorCard';
import glossaryItems from '../../../__mocks__/glossaryItems';

describe('GlossaryEditorCardComponent', () => {
  const props = {
    term: glossaryItems[0],
    submitGlossaryTerm: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(<GlossaryEditorCard {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('can call the toggleEditorState function', () => {
    const wrapper = shallow(<GlossaryEditorCard {...props} />);
    const instance = wrapper.instance();
    expect(instance.state.editorHidden).toBe(true);
    instance.toggleEditorState();
    expect(instance.state.editorHidden).toBe(false);
  });

  it('can call the updateTitle function', () => {
    const wrapper = shallow(<GlossaryEditorCard {...props} />);
    const instance = wrapper.instance();
    instance.updateTitle('test');
    expect(instance.state.newTitle).toBe('test');
  });

  it('can call the updateDefinition function', () => {
    const wrapper = shallow(<GlossaryEditorCard {...props} />);
    const instance = wrapper.instance();
    instance.updateDefinition('test');
    expect(instance.state.newDefinition).toBe('test');
  });

  it('can call the cancel function', () => {
    const wrapper = shallow(<GlossaryEditorCard {...props} />);
    const instance = wrapper.instance();
    // update state first
    instance.toggleEditorState();
    // then cancel should reset to correct values
    instance.cancel();
    wrapper.update();
    expect(instance.state.editorHidden).toBe(true);
    expect(instance.state.newTitle).toBe(null);
    expect(instance.state.newDefinition).toBe(null);
    expect(instance.state.displayZeroLengthAlert).toBe(false);
  });

  it('can call the submitDefinition function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<GlossaryEditorCard {...props} submitGlossaryTerm={spy} />);
    const instance = wrapper.instance();
    instance.updateDefinition('def');
    instance.updateTitle('test');
    instance.submitDefinition();
    sinon.assert.calledOnce(spy);
  });

  it('can call the hasDefinitionChanged function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<GlossaryEditorCard {...props} submitGlossaryTerm={spy} />);
    const instance = wrapper.instance();
    instance.state.newDefinition = 'a term';
    wrapper.setProps({ ...props, term: { definition: 'brand new term' } });
    expect(instance.hasDefinitionChanged).toBe(true);
  });

  it('can display the zero length alert', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<GlossaryEditorCard {...props} submitGlossaryTerm={spy} />);
    const instance = wrapper.instance();
    // definition has length, but not title
    instance.updateDefinition('def');
    instance.updateTitle('');
    instance.submitDefinition();
    expect(instance.state.displayZeroLengthAlert.title).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<GlossaryEditorCard {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when displayZeroLengthAlert is true', () => {
    const wrapper = shallow(<GlossaryEditorCard {...props} />);
    const instance = wrapper.instance();
    instance.updateTitle('');
    instance.submitDefinition();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
