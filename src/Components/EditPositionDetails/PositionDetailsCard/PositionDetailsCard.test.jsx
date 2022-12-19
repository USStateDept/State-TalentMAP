import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { bidderUserObject } from '../../../__mocks__/userObject';
import PositionDetailsCard from './PositionDetailsCard';

describe('UserProfileContactInformationComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<PositionDetailsCard userProfile={bidderUserObject} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<PositionDetailsCard userProfile={bidderUserObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
