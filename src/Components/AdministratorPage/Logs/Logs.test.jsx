import { shallow } from 'enzyme';
import sinon from 'sinon';
import Logs from './Logs';

describe('Logs', () => {
  const props = {
    logsList: ['a', 'b', 'c'],
    logsListIsLoading: false,
    logsListHasErrored: false,
    log: ['a', 'b', 'c'],
    logIsLoading: false,
    logHasErrored: false,
    getLog: () => {},
    onDownloadOne: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(<Logs {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when loading states are true', () => {
    const wrapper = shallow(<Logs {...props} isLoading logsIsLoading />);
    expect(wrapper).toBeDefined();
  });

  it('responds to download button onClick', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<Logs {...props} onDownloadOne={spy} />);
    // set log
    wrapper.instance().selectLog('a');
    wrapper.find('button').props().onClick();
    sinon.assert.calledOnce(spy);
  });

  it('defined when it receives new props that affect a nested scroll location', () => {
    const wrapper = shallow(<Logs {...props} />);
    wrapper.setProps({ log: ['a'] });
    expect(wrapper).toBeDefined();
  });

  it('defined when it receives new props that match the old props', (done) => {
    global.document.getElementById = () => ({ scrollHeight: 50 });
    const wrapper = shallow(<Logs {...props} />);
    wrapper.setProps(props);
    setTimeout(() => {
      expect(wrapper).toBeDefined();
      done();
    }, 0);
  });

  it('updates state onPageChange', () => {
    const wrapper = shallow(<Logs {...props} />);
    wrapper.instance().onPageChange({ page: 101 });
    expect(wrapper.instance().state.page).toBe(101);
  });
});
