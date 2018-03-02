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

  it('supports external links', () => {
    const isExternal = true;
    const wrapper = shallow(
      <LinkButton className="test-class" toLink={toLink} isExternal={isExternal}>
        {child}
      </LinkButton>,
    );
    expect(wrapper.instance().props.toLink).toBe(toLink);
    expect(wrapper.find('a.test-class')).toBeDefined();
  });

  it('supports external links with useDefaultClass as false', () => {
    const isExternal = true;
    const useDefaultClass = false;
    const wrapper = shallow(
      <LinkButton toLink={toLink} isExternal={isExternal} useDefaultClass={useDefaultClass}>
        {child}
      </LinkButton>,
    );
    expect(wrapper.instance().props.toLink).toBe(toLink);
    expect(wrapper.find('a')).toBeDefined();
  });

  it('can take props with useDefaultClass as false', () => {
    const useDefaultClass = false;
    const wrapper = shallow(
      <LinkButton toLink={toLink} useDefaultClass={useDefaultClass}>
        {child}
      </LinkButton>,
    );
    expect(wrapper.instance().props.toLink).toBe(toLink);
    expect(wrapper.find('Link')).toBeDefined();
  });
});
