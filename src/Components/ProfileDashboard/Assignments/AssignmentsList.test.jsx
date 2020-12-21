import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AssignmentsList from './AssignmentsList';
import assignmentObject from '../../../__mocks__/assignmentObject';

describe('AssignmentsListComponent', () => {
  const positions = [assignmentObject];
  it('is defined', () => {
    const wrapper = shallow(<AssignmentsList assignments={positions} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<AssignmentsList assignments={positions} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when there are no bids', () => {
    const wrapper = shallow(<AssignmentsList assignments={[]} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
