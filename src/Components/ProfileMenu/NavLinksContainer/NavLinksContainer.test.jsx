import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import NavLinksContainer from './NavLinksContainer';

describe('NavLinksContainerComponent', () => {
  const element = (
    <NavLinksContainer>
      <li>test 1</li>
      <li>test 2</li>
    </NavLinksContainer>
  );
  it('is defined', () => {
    const wrapper = shallow(
      element,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      element,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
