import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import MailToButton from './MailToButton';

describe('MailToButtonComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <MailToButton />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <MailToButton />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
