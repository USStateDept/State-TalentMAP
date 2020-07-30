import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import MailToButton from './MailToButton';

describe('MailToButtonComponent', () => {
  const props = {
    textAfter: 'test text',
  };
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

  it('text renders before icon', () => {
    const wrapper = shallow(<MailToButton
      textBefore={'test text'}
    />);
    expect(wrapper.find('a').text()).toContain('test text');
  });

  it('text renders after icon', () => {
    const wrapper = shallow(<MailToButton
      {...props}
    />);
    expect(wrapper.find('a').text()).toContain('test text');
  });
});
