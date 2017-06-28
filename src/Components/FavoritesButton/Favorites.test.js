import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import FavoritesButton from './FavoritesButton';

describe('FavoritesButton', () => {
  let favoritesButton = null;

  beforeEach(() => {
    favoritesButton = TestUtils.renderIntoDocument(<FavoritesButton refKey="0036" type="fav" />);
  });

  it('is defined', () => {
    expect(favoritesButton).toBeDefined();
  });

  it('can add a favorite', () => {
    const wrapper = shallow(<FavoritesButton refKey="0036" type="fav" />);
    wrapper.find('#changeSaved').simulate('click');
    expect(wrapper.instance().state.saved).toBe(true);
  });

  it('can add and remove a favorite', () => {
    const wrapper = shallow(<FavoritesButton refKey="0037" type="fav" />);
    wrapper.find('#changeSaved').simulate('click');
    expect(wrapper.instance().state.saved).toBe(true);
    wrapper.find('#changeSaved').simulate('click');
    expect(wrapper.instance().state.saved).toBe(false);
  });
});
