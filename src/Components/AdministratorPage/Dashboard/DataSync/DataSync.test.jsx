import React from 'react';
import { shallow } from 'enzyme';
import { get } from 'lodash';
import DataSync, { parseDate } from './DataSync';

describe('DataSync', () => {
  const props = {
    syncJobs: [
      {
        id: 7,
        last_synchronization: '2019-05-29T19:10:43.131897Z',
        delta_sync: 604800,
        running: false,
        talentmap_model: 'organization.Country',
        next_synchronization: '2019-06-05T19:10:43.131897Z',
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

  [['updateTime', 'next_synchronization_time'], ['updateDate', 'next_synchronization']].map(m =>
    it(`updates formValues.${m[1]} on ${m[0]}()`, () => {
      const wrapper = shallow(<DataSync {...props} />);
      wrapper.instance()[m[0]]('a');
      expect(get(wrapper.instance().state.formValues, [m[1]])).toBe('a');
    }),
  );

  it('updates state with updateBool()', () => {
    const wrapper = shallow(<DataSync {...props} />);
    wrapper.instance().updateBool('a', 'fieldA');
    expect(wrapper.instance().state.formValues.fieldA).toBe('a');
  });

  it('updates state with updateVal()', () => {
    const wrapper = shallow(<DataSync {...props} />);
    wrapper.instance().updateVal({ target: { value: 'a' } }, 'fieldA');
    expect(wrapper.instance().state.formValues.fieldA).toBe('a');
  });

  it('updates state with setJob()', () => {
    const wrapper = shallow(<DataSync {...props} />);
    wrapper.instance().setJob(props.syncJobs[0]);
    expect(wrapper.instance().state.formValues.id).toBeDefined();
  });

  it('submits a job with submitSync()', () => {
    const job = {};
    const wrapper = shallow(<DataSync {...props} patchSyncJob={(e) => { job.value = e; }} />);
    wrapper.instance().setJob(props.syncJobs[0]);
    wrapper.instance().submitSync();
    expect(job.value).toBeDefined();
  });
});
