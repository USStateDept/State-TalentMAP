import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import CondensedCardDataPoint from './CondensedCardDataPoint';

describe('CondensedCardDataPointComponent', () => {
  const props = {
    title: 'Title',
    content: 'Content',
  };

  it('is defined', () => {
    const wrapper = shallow(
      <CondensedCardDataPoint
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('applies the correct class when hasFixedTitleWidth is false', () => {
    const wrapper = shallow(
      <CondensedCardDataPoint
        {...props}
        hasFixedTitleWidth={false}
      />,
    );
    expect(wrapper.find('.condensed-card-data-title').exists()).toBe(true);
    expect(wrapper.find('.title-fixed-width').exists()).toBe(false);
  });

  it('applies the correct class when hasFixedTitleWidth is true', () => {
    const wrapper = shallow(
      <CondensedCardDataPoint
        {...props}
        hasFixedTitleWidth
      />,
    );
    expect(wrapper.find('.condensed-card-data-title').exists()).toBe(true);
    expect(wrapper.find('.title-fixed-width').exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <CondensedCardDataPoint
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
