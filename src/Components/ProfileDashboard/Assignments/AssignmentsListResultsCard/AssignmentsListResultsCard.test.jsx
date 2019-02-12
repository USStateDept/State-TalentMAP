import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import AssignmentsListResultsCard from './AssignmentsListResultsCard';
import assignmentObject from '../../../../__mocks__/assignmentObject';

describe('AssignmentsListResultsCardComponent', () => {
  const assignment = assignmentObject;
  it('is defined', () => {
    const wrapper = shallow(
      <AssignmentsListResultsCard
        assignment={assignment}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <AssignmentsListResultsCard
        assignment={assignment}
      />,
    );
    expect(wrapper.instance().props.assignment.id).toBe(assignment.id);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <AssignmentsListResultsCard
        assignment={assignment}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
