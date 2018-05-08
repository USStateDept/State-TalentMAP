import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import PositionInformation from './PositionInformation';
import assignmentObject from '../../../__mocks__/assignmentObject';

describe('PositionInformationComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<PositionInformation assignment={assignmentObject} />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when assignmentObject has no dates', () => {
    const wrapper = shallow(
      <PositionInformation
        assignment={{ ...assignmentObject, start_date: null, end_date: null }}
      />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when assignment is active', () => {
    const wrapper = shallow(
      <PositionInformation
        assignment={{ ...assignmentObject, status: 'active' }}
      />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when assignment is active and estimated_end_date is null', () => {
    const wrapper = shallow(
      <PositionInformation
        assignment={{ ...assignmentObject, status: 'active', estimated_end_date: null }}
      />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<PositionInformation assignment={assignmentObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
