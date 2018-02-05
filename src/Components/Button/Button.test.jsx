import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import Button from './Button';

describe('ButtonComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <Button onClick={() => {}}>
        <span>child</span>
      </Button>,
    );
    expect(wrapper).toBeDefined();
  });

  it('accepts arbitrary props', () => {
    const className = 'test-class';
    const wrapper = shallow(
      <Button onClick={() => {}} className={className}>
        <span>child</span>
      </Button>,
    );
    expect(wrapper.find(`.${className}`)).toBeDefined();
  });

  it('can click the button', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Button onClick={spy}>
        <span>child</span>
      </Button>,
    );
    wrapper.find('button').simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('can click a button when the passed value contains preventDefault', () => {
    const spy = sinon.spy();
    const preventDefaultSpy = sinon.spy();
    const wrapper = shallow(
      <Button onClick={spy}>
        <span>child</span>
      </Button>,
    );
    wrapper.instance().onClick({ preventDefault: preventDefaultSpy });
    sinon.assert.calledOnce(preventDefaultSpy);
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Button onClick={() => {}}>
        <span>child</span>
      </Button>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
