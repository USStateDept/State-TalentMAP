import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import FieldSet from './FieldSet';

describe('FieldSetComponent', () => {
  it('can receive props', () => {
    const wrapper = shallow(
      <FieldSet
        legend="legend"
      >
        <span>child</span>
      </FieldSet>,
    );
    expect(wrapper.instance().props.legend).toBe('legend');
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
});
