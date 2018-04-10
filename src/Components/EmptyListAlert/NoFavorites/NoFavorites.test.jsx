import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import NoFavorites from './NoFavorites';

describe('NoFavoritesComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<NoFavorites />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<NoFavorites />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
