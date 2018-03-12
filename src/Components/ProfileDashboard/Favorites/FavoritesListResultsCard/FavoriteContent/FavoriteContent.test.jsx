import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import FavoriteContent from './FavoriteContent';
import resultsObject from '../../../../../__mocks__/resultsObject';

describe('FavoriteContentComponent', () => {
  const position = resultsObject.results[0];
  it('is defined', () => {
    const wrapper = shallow(
      <FavoriteContent
        position={position}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <FavoriteContent
        position={position}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
