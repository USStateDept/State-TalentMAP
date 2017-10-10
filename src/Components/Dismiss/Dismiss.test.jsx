import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import Dismiss from './Dismiss';

describe('DismissComponent', () => {
  const child = (
    <div>
      <span>My content</span>
    </div>
  );

  it('can receive props', () => {
    const title = 'click';
    const wrapper = shallow(
      <Dismiss onDismiss={() => {}} buttonTitle={title}>
        {child}
      </Dismiss>,
    );
    expect(wrapper.instance().props.children).toBe(child);
    expect(wrapper.instance().props.buttonTitle).toBe(title);
  });

  it('can render classes', () => {
    const className = 'class1';
    const buttonClassName = 'class2';
    const wrapper = shallow(
      <Dismiss onDismiss={() => {}} className={className} buttonClassName={buttonClassName}>
        {child}
      </Dismiss>,
    );
    expect(wrapper.find(`.${className}`).exists()).toBe(true);
    expect(wrapper.find(`.${buttonClassName}`).exists()).toBe(true);
  });

  it('can click the button', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Dismiss onDismiss={spy}>
        {child}
      </Dismiss>,
    );
    wrapper.find('button').simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Dismiss onDismiss={() => {}}>
        {child}
      </Dismiss>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
