import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import FieldSet from './FieldSet';

describe('FieldSetComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <FieldSet
        legend="legend"
      >
        <span>child</span>
      </FieldSet>,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <FieldSet
        legend="legend"
      >
        <span>child</span>
      </FieldSet>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('can receive legendSrOnly prop', () => {
    const legendSrOnly = true;
    const wrapper = shallow(
      <FieldSet
        legend="legend"
        legendSrOnly={legendSrOnly}
      >
        <span>child</span>
      </FieldSet>,
    );
    expect(wrapper.find('legend.usa-sr-only').exists()).toBe(true);
  });
});
