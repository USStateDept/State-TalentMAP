import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ResultsCondensedCardBottom from './ResultsCondensedCardBottom';
import resultsObject from '../../__mocks__/resultsObject';
import bidListObject from '../../__mocks__/bidListObject';
import { bidderUserObject } from '../../__mocks__/userObject';

describe('ResultsCondensedCardBottomComponent', () => {
  const type = 'default';
  const favorites = bidderUserObject.favorite_positions;
  const favoritesPV = bidderUserObject.favorite_positions_pv;
  it('is defined', () => {
    const wrapper = shallow(
      <ResultsCondensedCardBottom
        position={resultsObject.results[0]}
        bidList={bidListObject.results}
        favorites={favorites}
        favoritesPV={favoritesPV}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <ResultsCondensedCardBottom
        position={resultsObject.results[0]}
        bidList={bidListObject.results}
        favorites={favorites}
        favoritesPV={favoritesPV}
      />,
    );
    expect(wrapper.instance().props.type).toBe(type);
  });

  it('does not render the bid stats when showBidCount === false', () => {
    const wrapper = shallow(
      <ResultsCondensedCardBottom
        position={resultsObject.results[0]}
        bidList={bidListObject.results}
        favorites={favorites}
        favoritesPV={favoritesPV}
        showBidCount={false}
      />,
    );
    expect(wrapper.find('ResultsCondensedCardStats').exists()).toBe(false);
  });

  it('renders stats if showBidCount is true', () => {
    const wrapper = shallow(
      <ResultsCondensedCardBottom
        position={resultsObject.results[0]}
        bidList={bidListObject.results}
        favorites={favorites}
        favoritesPV={favoritesPV}
        showBidCount
      />,
    );
    expect(wrapper.instance().renderStats()).toBeDefined();
  });

  it('renders bid list button if showBidListButton is true', () => {
    const wrapper = shallow(
      <ResultsCondensedCardBottom
        position={resultsObject.results[0]}
        bidList={bidListObject.results}
        favorites={favorites}
        favoritesPV={favoritesPV}
        showBidListButton
      />,
    );
    expect(wrapper.instance().renderBidListButton()).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ResultsCondensedCardBottom
        position={resultsObject.results[0]}
        bidList={bidListObject.results}
        favorites={favorites}
        favoritesPV={favoritesPV}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when context.isClient === true', () => {
    const wrapper = shallow(
      <ResultsCondensedCardBottom
        position={resultsObject.results[0]}
        bidList={bidListObject.results}
        favorites={favorites}
        favoritesPV={favoritesPV}
      />, { context: { isClient: true } },
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot with bidlist button', () => {
    const wrapper = shallow(
      <ResultsCondensedCardBottom
        position={resultsObject.results[0]}
        bidList={bidListObject.results}
        favorites={favorites}
        favoritesPV={favoritesPV}
        showBidListButton
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
