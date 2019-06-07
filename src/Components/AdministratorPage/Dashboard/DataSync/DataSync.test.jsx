import React from 'react';
import { shallow } from 'enzyme';
import DataSync from './DataSync';

describe('DataSync', () => {
  const props = {};

  it('is defined', () => {
    const wrapper = shallow(<DataSync {...props} />);
    expect(wrapper).toBeDefined();
  });

  [['showForm', true], ['closeForm', false]].map(m =>
    it(`updates showForm on ${m[0]}()`, () => {
      const wrapper = shallow(<DataSync {...props} />);
      wrapper.instance()[m[0]]();
      expect(wrapper.instance().state.showForm).toBe(m[1]);
    }),
  );

  [['updateOccurrence', 'recurring'], ['updateFrequency', 'frequency'], ['updateTime', 'time'], ['updateDate', 'date']].map(m =>
    it(`updates formValues.${m[1]} on ${m[0]}()`, () => {
      const wrapper = shallow(<DataSync {...props} />);
      wrapper.instance()[m[0]]('a');
      expect(wrapper.instance().state.formValues[m[1]]).toBe('a');
    }),
  );
});
