import { mount } from 'enzyme';
import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const FakeComponent = () => null;

describe('ErrorBoundary', () => {
  it('should display an ErrorMessage if wrapped component throws', () => {
    const wrapper = mount(
      <ErrorBoundary>
        <FakeComponent />
      </ErrorBoundary>,
    );

    const error = new Error('test');

    // Alert does not display initially...
    expect(wrapper.find('Alert').exists()).toBe(false);
    // until the child component throws an error.
    wrapper.find(FakeComponent).simulateError(error);
    // Now the alert should display.
    expect(wrapper.find('Alert').exists()).toBe(true);
  });

  it('returns error information to onCatch if wrapped component throws', () => {
    let obj = { a: null, b: null };
    const onCatch = (a, b) => { obj = { a, b }; };
    const wrapper = mount(
      <ErrorBoundary onCatch={onCatch}>
        <FakeComponent />
      </ErrorBoundary>,
    );

    const error = new Error('test');
    // Simulate error.
    wrapper.find(FakeComponent).simulateError(error);
    expect(obj.a).toBeInstanceOf(Error);
    expect(obj.b.componentStack).toEqual(`
    in FakeComponent (created by ErrorBoundary)
    in ErrorBoundary (created by WrapperComponent)
    in WrapperComponent`,
    );
  });
});
