import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AssignmentHistory from './AssignmentHistory';
import assignmentObject from '../../../../__mocks__/assignmentObject';

describe('AssignmentHistory Component', () => {
  const props = {
    assignments: [assignmentObject],
  };
  it('is defined', () => {
    const wrapper = shallow(<AssignmentHistory {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<AssignmentHistory {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
