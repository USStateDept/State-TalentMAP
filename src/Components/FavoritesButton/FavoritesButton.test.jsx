import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import toJSON from 'enzyme-to-json';
import FavoritesButton from './FavoritesButton';

describe('FavoritesButton', () => {
  let favoritesButton = null;

  beforeEach(() => {
    favoritesButton = TestUtils.renderIntoDocument(<FavoritesButton refKey="0036" type="fav" />);
  });

  it('is defined', () => {
    expect(favoritesButton).toBeDefined();
  });

  it('can accept different kinds of props', () => {
    const favoritesButtonCompare = shallow(
      <FavoritesButton refKey="0037" type="compare" />,
     );
    expect(favoritesButtonCompare).toBeDefined();
    const favoritesButtonOther = shallow(
      <FavoritesButton refKey="0037" type="other" />,
     );
    expect(favoritesButtonOther).toBeDefined();
  });

  it('can add a favorite', () => {
    const wrapper = shallow(<FavoritesButton refKey="0036" type="fav" />);
    wrapper.find('button').simulate('click');
    expect(wrapper.instance().state.saved).toBe(true);
  });

  it('can add and remove a favorite', () => {
    const wrapper = shallow(<FavoritesButton refKey="0037" type="fav" />);
    wrapper.find('button').simulate('click');
    expect(wrapper.instance().state.saved).toBe(true);
    wrapper.find('button').simulate('click');
    expect(wrapper.instance().state.saved).toBe(false);
  });

  it('can handle len key in state', () => {
    const wrapper = shallow(<FavoritesButton refKey="0037" type="fav" />);
    wrapper.instance().state.len = 100000; // greater than default limit
    wrapper.find('button').simulate('click');
    expect(wrapper.instance().state.saved).toBe(true);
  });

  it('can handle a disabled state', () => {
    // force the limit to be zero so that no more favorites can be added
    const wrapper = shallow(<FavoritesButton limit={0} refKey="0037" type="fav" />);
    const button = wrapper.find('button');
    expect(button.prop('disabled')).toBe(true);
    expect(button.prop('className')).toEqual('usa-button-disabled');
    expect(button.text()).toEqual('Add to Favorites');
    expect(toJSON(button)).toMatchSnapshot();
  });
});
