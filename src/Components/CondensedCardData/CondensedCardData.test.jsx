import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import CondensedCardData from './CondensedCardData';
import resultsObject from '../../__mocks__/resultsObject';
import { NO_POSITION_TITLE, NO_POST, NO_SKILL, NO_GRADE } from '../../Constants/SystemMessages';

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

  it('can display system defaults', () => {
    const position = resultsObject.results[0];
    position.post = null;
    position.skill = null;
    position.grade = null;

    const wrapper = shallow(
      <CondensedCardData
        position={position}
      />,
    );

    expect(wrapper.find('.condensed-card-data div').at(0).text()).toContain(NO_POSITION_TITLE);
    expect(wrapper.find('.condensed-card-data div').at(2).text()).toContain(NO_SKILL);
    expect(wrapper.find('.condensed-card-data div').at(3).text()).toContain(NO_GRADE);
  });
});
