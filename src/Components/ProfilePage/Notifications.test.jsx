import { shallow } from 'enzyme';
import Notifications from './Notifications';

describe('Notifications', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <Notifications />,
    );
    expect(wrapper).toBeDefined();
  });
});
