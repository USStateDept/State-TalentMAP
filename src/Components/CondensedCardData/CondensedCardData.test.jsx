import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import CondensedCardData from './CondensedCardData';
import resultsObject from '../../__mocks__/resultsObject';
import * as SystemMessages from '../../Constants/SystemMessages';

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
    expect(wrapper.find('.condensed-card-data div strong').first().text()).toBe(SystemMessages.NO_POSITION_TITLE);
    expect(wrapper.find('.condensed-card-data div').at(1).text()).toContain(SystemMessages.NO_POST);
    expect(wrapper.find('.condensed-card-data div').at(2).text()).toContain(SystemMessages.NO_SKILL);
    expect(wrapper.find('.condensed-card-data div').at(3).text()).toContain(SystemMessages.NO_GRADE);
  });
});
