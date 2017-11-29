import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import NewPositionsSection from './NewPositionsSection';
import resultsObject from '../../__mocks__/resultsObject';
import bidListObject from '../../__mocks__/bidListObject';

describe('NewPositionsSectionComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <NewPositionsSection
        positions={resultsObject.results}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        toggleBid={() => {}}
        bidList={bidListObject.results}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <NewPositionsSection
        positions={resultsObject.results}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        toggleBid={() => {}}
        bidList={bidListObject.results}
      />,
    );
    expect(wrapper.instance().props.positions[0].id).toBe(resultsObject.results[0].id);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <NewPositionsSection
        positions={resultsObject.results}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        toggleBid={() => {}}
        bidList={bidListObject.results}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
