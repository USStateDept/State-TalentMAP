import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Base from './Base';

describe('Base', () => {
  it('can receive children prop', () => {
    const wrapper = shallow(
      <Base>
        <span>span</span>
        <div>div</div>
        <span>span</span>
      </Base>,
    );

    expect(wrapper.children('span')).toHaveLength(2);
    expect(wrapper.children('div')).toHaveLength(1);
  });

  it('renders `as` prop and renders new tag', () => {
    const tags = ('button|div|span|section|p').split('|');

    tags.forEach((tag) => {
      expect(shallow(<Base as={tag} />).find(tag).exists()).toBe(true);
    });
  });

  it('matches snapshot', () => {
    const key = 'base-component';
    const wrapper = shallow(
      <Base id={key} className={key}>
        <div />
      </Base>,
    );

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
