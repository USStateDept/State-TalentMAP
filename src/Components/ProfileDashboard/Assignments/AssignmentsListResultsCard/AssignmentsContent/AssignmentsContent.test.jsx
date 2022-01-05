import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AssignmentsContent from './AssignmentsContent';
import assignmentObject from '../../../../../__mocks__/assignmentObject';

describe('AssignmentsContentComponent', () => {
  const assignment = assignmentObject;
  it('is defined', () => {
    const wrapper = shallow(
      <AssignmentsContent
        assignment={assignment}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <AssignmentsContent
        assignment={assignment}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
