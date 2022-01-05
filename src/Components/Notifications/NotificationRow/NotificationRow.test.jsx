import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import { NotificationRow } from './NotificationRow';

describe('NotificationRowComponent', () => {
  const props = {
    id: 1,
    message: 'You have received a handshake',
    tags: ['bidding'],
    deleteOne: () => {},
    date: '2019-03-05T20:15:09.587724Z',
  };

  it('is defined', () => {
    const wrapper = shallow(
      <NotificationRow {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined with different props', () => {
    let wrapper = shallow(
      <NotificationRow {...props} tags={['saved_search']} />,
    );
    expect(wrapper).toBeDefined();

    wrapper = shallow(
      <NotificationRow {...props} tags={['bureau_bidding']} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when there are no tags', () => {
    const wrapper = shallow(
      <NotificationRow {...props} tags={[]} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('responds to deleteOne', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <NotificationRow {...props} deleteOne={spy} />,
    );
    wrapper.find('#delete-notification-button').simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <NotificationRow {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
