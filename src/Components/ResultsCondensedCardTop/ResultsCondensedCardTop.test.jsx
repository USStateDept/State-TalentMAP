import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ResultsCondensedCardTop from './ResultsCondensedCardTop';
import resultsObject from '../../__mocks__/resultsObject';
import bidListObject from '../../__mocks__/bidListObject';

describe('ResultsCondensedCardTopComponent', () => {
  const type = 'default';
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
        toggleBid={() => {}}
        bidList={bidListObject.results}
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
        toggleBid={() => {}}
        bidList={bidListObject.results}
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
        toggleBid={() => {}}
        bidList={bidListObject.results}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when type is serviceNeed', () => {
    const wrapper = shallow(
      <ResultsCondensedCardTop
        position={resultsObject.results[0]}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        favorites={favorites}
        toggleBid={() => {}}
        bidList={bidListObject.results}
        type="serviceNeed"
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
        type={'default'}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        favorites={favorites}
        toggleBid={() => {}}
        bidList={bidListObject.results}
      />,
    );
    expect(wrapper.instance().props.type).toBe('default');
  });
});
