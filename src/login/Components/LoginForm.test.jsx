import { shallow } from 'enzyme';
import React from 'react';
import { LoginForm } from './LoginForm';

describe('Login', () => {
  const loginObject = {
    requesting: true,
    successful: false,
    messages: [],
    errors: [],
  };

  const props = {
    handleSubmit: () => {},
    onSubmit: () => {},
  };

  const errors = [
    {
      body: 'Request failed with status code 400',
      time: '2017-07-27T20:02:27.683Z',
    },
  ];

  it('can render', () => {
    const wrapper = shallow(<LoginForm login={loginObject}{...props} />);
    expect(wrapper).toBeDefined();
  });

  it('can handle other props', () => {
    const wrapper = shallow(
      <LoginForm
        login={{ ...loginObject, requesting: false, errors, messages: errors }}
        {...props}
      />,
    );

    expect(wrapper).toBeDefined();
  });

  it('can submit a username and password', () => {
    const wrapper = shallow(
      <LoginForm
        login={{ ...loginObject, requesting: false }}
        {...props}
      />,
    );

    wrapper.find('#username').simulate('change', { target: { value: 'admin' } });
    wrapper.find('#password').simulate('change', { target: { value: 'admin' } });
    wrapper.find('[type="submit"]').simulate('click');

    expect(wrapper).toBeDefined();
  });
});
