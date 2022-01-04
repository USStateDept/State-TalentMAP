import { shallow } from 'enzyme';
import sinon from 'sinon';
import ShortListLock from './ShortListLock';

describe('ShortListLock', () => {
  const props = {
    id: 1,
  };

  it('is defined', () => {
    const wrapper = shallow(<ShortListLock.WrappedComponent {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when status === true', () => {
    const wrapper = shallow(<ShortListLock.WrappedComponent {...props} status />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when statusHasErrored and statusUpdateHasErrored === true', () => {
    const wrapper = shallow(<ShortListLock.WrappedComponent
      {...props}
      statusHasErrored
      statusUpdateHasErrored
    />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when statusUpdateIsLoading === true', () => {
    const wrapper = shallow(<ShortListLock.WrappedComponent
      {...props}
      statusUpdateIsLoading
    />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when statusIsLoading === true', () => {
    const wrapper = shallow(<ShortListLock.WrappedComponent
      {...props}
      statusIsLoading
    />);
    expect(wrapper).toBeDefined();
  });

  it('calls updateStatus', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<ShortListLock.WrappedComponent
      {...props}
      statusIsLoading={false}
      statusUpdateIsLoading={false}
      updateStatus={spy}
    />);
    wrapper.instance().updateStatus();
    sinon.assert.calledOnce(spy);
  });
});
