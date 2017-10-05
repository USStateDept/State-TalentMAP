import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import LinkButton from './LinkButton';

describe('LinkButtonComponent', () => {
  const child = (<span>Text</span>);
  const toLink = '/test/100';
  it('is defined', () => {
    const wrapper = shallow(
      <LinkButton toLink={toLink}>
        {child}
      </LinkButton>,
    );
    expect(wrapper).toBeDefined();
  });

  it('can take props', () => {
    const wrapper = shallow(
      <LinkButton className="test-class" toLink={toLink}>
        {child}
      </LinkButton>,
    );
    expect(wrapper.instance().props.toLink).toBe(toLink);
    expect(wrapper.find('.test-class')).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <LinkButton toLink={toLink}>
        {child}
      </LinkButton>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
