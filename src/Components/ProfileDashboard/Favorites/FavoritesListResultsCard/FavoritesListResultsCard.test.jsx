import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import FavoritesListResultsCard from './FavoritesListResultsCard';
import resultsObject from '../../../../__mocks__/resultsObject';

describe('FavoritesListResultsCardComponent', () => {
  const position = resultsObject.results[0];
  it('is defined', () => {
    const wrapper = shallow(
      <FavoritesListResultsCard
        position={position}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <FavoritesListResultsCard
        position={position}
      />,
    );
    expect(wrapper.instance().props.position.id).toBe(position.id);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <FavoritesListResultsCard
        position={position}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
