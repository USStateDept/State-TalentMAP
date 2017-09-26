import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import FavoritePositionsTitle from './FavoritePositionsTitle';

describe('FavoritePositionsTitleComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <FavoritePositionsTitle />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <FavoritePositionsTitle />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
