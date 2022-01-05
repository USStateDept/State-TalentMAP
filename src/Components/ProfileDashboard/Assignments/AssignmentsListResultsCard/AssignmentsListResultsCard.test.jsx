import { shallow } from 'enzyme';
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

  it('matches snapshot', () => {
    const wrapper = shallow(
      <AssignmentsListResultsCard
        assignment={assignment}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
