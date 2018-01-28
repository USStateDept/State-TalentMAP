import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import CondensedCardData from './CondensedCardData';
import resultsObject from '../../__mocks__/resultsObject';

describe('CondensedCardDataComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <CondensedCardData
        position={resultsObject.results[0]}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <CondensedCardData
        position={resultsObject.results[0]}
      />,
    );
    expect(wrapper.instance().props.position.id).toBe(resultsObject.results[0].id);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <CondensedCardData
        position={resultsObject.results[0]}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
