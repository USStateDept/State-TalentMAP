import { shallow, mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import toJSON from 'enzyme-to-json';
import FavoritePositions from './FavoritePositions';
import sinon from 'sinon';
import resultsObject from '../../__mocks__/resultsObject';
import bidListObject from '../../__mocks__/bidListObject';

describe('FavoritePositionsComponent', () => {
  const props = {
    favorites: resultsObject.results,
    favoritesPV: resultsObject.results,
    toggleFavoritePositionIsLoading: false,
    toggleFavoritePositionHasErrored: false,
    favoritePositionsIsLoading: false,
    favoritePositionsHasErrored: false,
    bidList: bidListObject.results,
    toggleBid: () => {},
    onSortChange: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <FavoritePositions {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when selected === open', () => {
    const spy = sinon.spy();
    let wrapper;
    act(() => {
      wrapper = mount(
        <FavoritePositions
          navSelected={spy}
        />,
      );
    });
    wrapper.find('Nav').simulate('onClick', 'open');
    expect(wrapper).toBeDefined();
  });

  it('is defined when selected === pv', () => {
    const wrapper = shallow(
      <FavoritePositions {...props} />,
    );
    wrapper.setState({ selected: 'pv' });
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <FavoritePositions {...props} />,
    );
    expect(wrapper.instance().props.favorites).toBe(props.favorites);
  });

  it('displays an alert if there are no positions', () => {
    const wrapper = shallow(
      <FavoritePositions
        {...props}
        favorites={[]}
        favoritesPV={[]}
        favoritePositionsIsLoading={false}
      />,
    );
    expect(wrapper.find('NoFavorites').exists()).toBe(true);
  });

  it('renders the Spinner when loading', () => {
    const wrapper = shallow(
      <FavoritePositions
        {...props}
        favoritePositionsIsLoading
        favoritePositionsHasErrored={false}
      />,
    );
    expect(wrapper.find('Spinner').exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <FavoritePositions {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
