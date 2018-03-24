import React from 'react';
import { shallow } from 'enzyme';
import PageTitle from './PageTitle';

describe('PageTitle', () => {
  const pageTitle = 'Page';

  it('is defined', () => {
    const wrapper = shallow(<PageTitle pageTitle={pageTitle} />);
    expect(wrapper).toBeDefined();
  });

  it('accepts props', () => {
    const wrapper = shallow(<PageTitle pageTitle={pageTitle} srOnly />);
    const h1 = wrapper.find('h1');
    expect(h1.text()).toBe(pageTitle);
    expect(h1.hasClass('sr-only')).toBe(true);
  });
});
