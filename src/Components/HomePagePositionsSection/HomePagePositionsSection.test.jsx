import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import HomePagePositionsSection from './HomePagePositionsSection';
import resultsObject from '../../__mocks__/resultsObject';
import bidListObject from '../../__mocks__/bidListObject';

describe('HomePagePositionsSection', () => {
  const props = {
    title: 'Title',
    positions: resultsObject.results,
    toggleFavorite: () => {},
    userProfileFavoritePositionIsLoading: false,
    userProfileFavoritePositionHasErrored: false,
    toggleBid: () => {},
    bidList: bidListObject.results,
  };

  it('renders', () => {
    const wrapper = shallow(<HomePagePositionsSection {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('displays the error message when hasErrored is true and isLoading is false', () => {
    const wrapper = shallow(<HomePagePositionsSection {...props} hasErrored isLoading={false} />);
    expect(wrapper.find('Alert').props().type).toBe('error');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<HomePagePositionsSection {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
