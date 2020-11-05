import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import Administrator, { mapDispatchToProps } from './Administrator';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Administrator', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Administrator />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('calls the onDownloadClick function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Administrator.WrappedComponent getLogs={spy} />,
    );
    wrapper.instance().onDownloadClick();
    sinon.assert.calledOnce(spy);
  });

  it('calls the onDownloadOne function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Administrator.WrappedComponent getLogToDownload={spy} />,
    );
    wrapper.instance().onDownloadOne('access.log');
    sinon.assert.calledOnce(spy);
  });

  it('calls the getLogById function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Administrator.WrappedComponent getLog={spy} />,
    );
    wrapper.instance().getLogById('access.log');
    sinon.assert.calledOnce(spy);
  });

  it('is defined when receiving new props that trigger a download', () => {
    const wrapper = shallow(
      <Administrator.WrappedComponent logsIsLoading logToDownloadIsLoading />,
    );
    wrapper.setProps({ logsIsLoading: false, logs: 'data', logToDownloadIsLoading: false, logToDownload: 'data' });
    expect(wrapper).toBeDefined();
  });

  it('calls putAllSyncJobs on runAllJobs() if putAllSyncsIsLoading === false', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Administrator.WrappedComponent putAllSyncJobs={spy} putAllSyncsIsLoading={false} />,
    );
    // should call spy since isloading === false
    wrapper.instance().runAllJobs();
    sinon.assert.calledOnce(spy);

    // set isloading to true
    wrapper.setProps({ putAllSyncsIsLoading: true });

    // should not call spy since isloading === true
    wrapper.instance().runAllJobs();
    sinon.assert.calledOnce(spy);
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    getLog: ['test'],
    getLogToDownload: ['test'],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
