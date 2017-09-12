import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import PopularPositionsCardList from './PopularPositionsCardList';
import resultsObject from '../../__mocks__/resultsObject';

describe('PopularPositionsCardListComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <PopularPositionsCardList
        positions={resultsObject.results}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <PopularPositionsCardList
        positions={resultsObject.results}
      />,
    );
    expect(wrapper.instance().props.positions[0].id).toBe(resultsObject.results[0].id);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <PopularPositionsCardList
        positions={resultsObject.results}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
