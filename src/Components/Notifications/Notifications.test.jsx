import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Notifications from './Notifications';

describe('NotificationsComponent', () => {
  const props = {
    deleteOne: () => {},
    notifications: { count: 1, results: [{ id: 1, message: 'message' }] },
    isLoading: false,
    hasErrored: false,
    page: 1,
    pageSize: 10,
    onPageChange: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <Notifications {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when there are no results', () => {
    const wrapper = shallow(
      <Notifications {...props} notifications={{}} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when isLoading is true', () => {
    const wrapper = shallow(
      <Notifications {...props} isLoading />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when hasErrored is true', () => {
    const wrapper = shallow(
      <Notifications {...props} hasErrored />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Notifications {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
