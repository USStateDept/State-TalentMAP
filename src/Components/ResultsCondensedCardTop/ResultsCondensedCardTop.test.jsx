import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ResultsCondensedCardTop from './ResultsCondensedCardTop';
import resultsObject from '../../__mocks__/resultsObject';

describe('ResultsCondensedCardTopComponent', () => {
  const type = 'new';
  const favorites = [];
  it('is defined', () => {
    const wrapper = shallow(
      <ResultsCondensedCardTop
        position={resultsObject.results[0]}
        type={type}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        favorites={favorites}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <ResultsCondensedCardTop
        position={resultsObject.results[0]}
        type={type}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        favorites={favorites}
      />,
    );
    expect(wrapper.instance().props.type).toBe(type);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ResultsCondensedCardTop
        position={resultsObject.results[0]}
        type={type}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        favorites={favorites}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('can receive alternate props', () => {
    const position = resultsObject.results[0];
    position.update_date = null;
    const wrapper = shallow(
      <ResultsCondensedCardTop
        position={position}
        type={'popular'}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        favorites={favorites}
      />,
    );
    expect(wrapper.instance().props.type).toBe('popular');
  });
});
