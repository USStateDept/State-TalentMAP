import React from 'react';
import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Card from './Card';

describe('Card', () => {
  const selector = '.card';

  it('has own className any additional others', () => {
    const suffix = 'test';
    const wrapper = shallow(<Card className={suffix} />);

    expect(wrapper.find(`${selector}.${suffix}`).exists()).toBe(true);
  });

  it('can receive children prop', () => {
    const wrapper = shallow(
      <Card>
        <span>span</span>
        <div>div</div>
        <span>span</span>
      </Card>,
    );

    expect(wrapper.find(selector).children('span')).toHaveLength(2);
    expect(wrapper.find(selector).children('div')).toHaveLength(1);
  });

  it('renders `as` prop and renders new tag', () => {
    const tags = ('button|div|span|section|p').split('|');

    tags.forEach((tag) => {
      const wrapper = mount(<Card as={tag} />);
      expect(wrapper.find(tag).exists()).toBe(true);
    });
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Card id="Card-1" className="tm-grid">
        <div className="usa-width-one-whole" />
      </Card>,
    );

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
