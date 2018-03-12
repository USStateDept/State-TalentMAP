import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import History from './History';

describe('HistoryComponent', () => {
  const props = {
    dateUpdated: '2018-02-12T18:22:52.451408Z',
    updatedBy: 'John Doe',
    isArchived: true,
    id: 1,
    submitGlossaryTerm: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(<History {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when isArchived is false', () => {
    const wrapper = shallow(<History {...props} isArchived={false} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<History {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isArchived is false', () => {
    const wrapper = shallow(<History {...props} isArchived={false} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when dateUpdated is undefined', () => {
    const wrapper = shallow(<History {...props} isArchived={false} dateUpdated={undefined} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when updatedBy is undefined', () => {
    const wrapper = shallow(<History {...props} isArchived={false} updatedBy={undefined} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
