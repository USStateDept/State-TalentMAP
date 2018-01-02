import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ContactCDOButton from './ContactCDOButton';

describe('ContactCDOButtonComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ContactCDOButton email="test@email.com" />,
    );
    expect(wrapper).toBeDefined();
  });

  it('applies the email to the "toLink" prop correctly', () => {
    const wrapper = shallow(
      <ContactCDOButton email="test@email.com" />,
    );
    expect(wrapper.find('LinkButton').prop('toLink')).toBe('mailto:test@email.com');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ContactCDOButton email="test@email.com" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
