import { shallow } from 'enzyme';
import NotificationsPopover from './NotificationsPopover';

describe('NotificationsPopover', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <NotificationsPopover />,
    );
    expect(wrapper).toBeDefined();
  });
});
