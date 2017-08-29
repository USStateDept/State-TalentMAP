import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import Pill from './Pill';

describe('PillComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<Pill
      description="description"
      codeRef="ref"
      selectionRef="selRef"
      onPillClick={() => {}}
    />);
    expect(wrapper).toBeDefined();
  });

  it('can take different props', () => {
    const wrapper = shallow(<Pill
      description="test"
      codeRef="code"
      selectionRef="selection"
      onPillClick={() => {}}
    />);
    expect(wrapper.instance().props.description).toBe('test');
  });

  it('can click the button', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<Pill
      description="test"
      codeRef="code"
      selectionRef="selection"
      onPillClick={spy}
    />);
    wrapper.find('button').simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<Pill
      description="test"
      codeRef="code"
      selectionRef="selection"
      onPillClick={() => {}}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
