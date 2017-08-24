import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Favorite from './Favorite';

describe('Favorite', () => {
  let favorite = null;

  beforeEach(() => {
    favorite = TestUtils.renderIntoDocument(<Favorite refKey="0036" type="fav" />);
  });

  it('is defined', () => {
    expect(favorite).toBeDefined();
  });

  it('can accept different kinds of props', () => {
    const favoriteCompare = shallow(
      <Favorite refKey="0037" type="compare" />,
     );
    expect(favoriteCompare).toBeDefined();
    const favoriteOther = shallow(
      <Favorite refKey="0037" type="other" />,
     );
    expect(favoriteOther).toBeDefined();
  });

  it('can add a favorite', () => {
    const wrapper = shallow(<Favorite refKey="0036" type="fav" />);
    wrapper.find('span').simulate('click');
    expect(wrapper.instance().state.saved).toBe(true);
  });

  it('can add and remove a favorite', () => {
    const wrapper = shallow(<Favorite refKey="0037" type="fav" />);
    wrapper.find('span').simulate('click');
    expect(wrapper.instance().state.saved).toBe(true);
    wrapper.find('span').simulate('click');
    expect(wrapper.instance().state.saved).toBe(false);
  });

  it('can handle len key in state', () => {
    const wrapper = shallow(<Favorite refKey="0037" type="fav" />);
    wrapper.instance().state.len = 100000; // greater than default limit
    wrapper.find('span').simulate('click');
    expect(wrapper.instance().state.saved).toBe(true);
  });
});
