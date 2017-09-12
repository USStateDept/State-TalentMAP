import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import NewPositionsCardList from './NewPositionsCardList';
import resultsObject from '../../__mocks__/resultsObject';

describe('NewPositionsCardListComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <NewPositionsCardList
        positions={resultsObject.results}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <NewPositionsCardList
        positions={resultsObject.results}
      />,
    );
    expect(wrapper.instance().props.positions[0].id).toBe(resultsObject.results[0].id);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <NewPositionsCardList
        positions={resultsObject.results}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
