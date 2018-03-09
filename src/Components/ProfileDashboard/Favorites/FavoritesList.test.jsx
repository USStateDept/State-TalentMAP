import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import FavoritesList from './FavoritesList';
import resultsObject from '../../../__mocks__/resultsObject';

describe('FavoritesListComponent', () => {
  const positions = resultsObject.results;
  it('is defined', () => {
    const wrapper = shallow(<FavoritesList favorites={positions} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<FavoritesList favorites={positions} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when there are no bids', () => {
    const wrapper = shallow(<FavoritesList favorites={[]} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
