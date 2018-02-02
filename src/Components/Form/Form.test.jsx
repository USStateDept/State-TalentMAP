import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import Form from './Form';

describe('FormComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <Form onSubmit={() => {}}>
        <span>child</span>
      </Form>,
    );
    expect(wrapper).toBeDefined();
  });

  it('accepts a className', () => {
    const className = 'test-class';
    const wrapper = shallow(
      <Form onSubmit={() => {}} className={className}>
        <span>child</span>
      </Form>,
    );
    expect(wrapper.find(`.${className}`)).toBeDefined();
  });

  it('can submit the form', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Form onSubmit={spy}>
        <span>child</span>
      </Form>,
    );
    wrapper.find('form').simulate('submit');
    sinon.assert.calledOnce(spy);
  });

  it('can submit a form when the passed value contains preventDefault', () => {
    const spy = sinon.spy();
    const preventDefaultSpy = sinon.spy();
    const wrapper = shallow(
      <Form onSubmit={spy}>
        <span>child</span>
      </Form>,
    );
    wrapper.instance().onSubmit({ preventDefault: preventDefaultSpy });
    sinon.assert.calledOnce(preventDefaultSpy);
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Form onSubmit={() => {}}>
        <span>child</span>
      </Form>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
