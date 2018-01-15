import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import AuthorizedWrapper from './AuthorizedWrapper';

describe('AuthorizedWrapper', () => {
  const props = {
    isAuthorized: () => {},
    children: <span>test</span>,
  };
  it('is defined', () => {
    const wrapper = shallow(
      <AuthorizedWrapper
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('it does not render children if isAuthorized returns false', () => {
    const wrapper = shallow(
      <AuthorizedWrapper
        {...props}
        isAuthorized={() => false}
      />,
    );
    expect(wrapper).toBeDefined();
    expect(wrapper.find('span').exists()).toBe(false);
  });

  it('it renders children if isAuthorized returns true', () => {
    const wrapper = shallow(
      <AuthorizedWrapper
        {...props}
        isAuthorized={() => true}
      />,
    );
    expect(wrapper).toBeDefined();
    expect(wrapper.find('span').exists()).toBe(true);
  });

  it('matches snapshot when isAuthorized returns true', () => {
    const wrapper = shallow(
      <AuthorizedWrapper
        {...props}
        isAuthorized={() => true}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isAuthorized returns false', () => {
    const wrapper = shallow(
      <AuthorizedWrapper
        {...props}
        isAuthorized={() => false}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
