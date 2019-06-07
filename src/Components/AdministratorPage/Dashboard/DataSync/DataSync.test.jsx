import React from 'react';
import { shallow } from 'enzyme';
import DataSync, { parseDate } from './DataSync';

describe('DataSync', () => {
  const props = {
    syncJobs: [
      {
        id: 7,
        last_sync: '2019-05-29T19:10:43.131897Z',
        delta_sync: 604800,
        running: false,
        talentmap_model: 'organization.Country',
        next_sync: '2019-06-05T19:10:43.131897Z',
        priority: 0,
        use_last_date_updated: false,
      },
    ],
  };

  it('is defined', () => {
    const wrapper = shallow(<DataSync {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when isLoading', () => {
    const wrapper = shallow(<DataSync {...props} isLoading />);
    expect(wrapper).toBeDefined();
  });

  it('parses a date', () => {
    const parsed = parseDate('06/01/2019', 'MM/DD/YYYY');
    expect(parsed).toBeDefined();

    const parsedError = parseDate(null, 'MM/DD/YYYY');
    expect(parsedError).toEqual(undefined);
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
