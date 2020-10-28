import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { bidderUserObject } from '../../../__mocks__/userObject';
import assignmentObject from '../../../__mocks__/assignmentObject';
import UserProfile from './UserProfile';

describe('UserProfileComponent', () => {
  const props = {
    userProfile: {
      ...bidderUserObject,
      current_assignment: assignmentObject,
    },
  };
  it('is defined', () => {
    const wrapper = shallow(<UserProfile
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<UserProfile
      {...props}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
