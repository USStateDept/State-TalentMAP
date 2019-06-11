import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
  const props = {
    isLoading: false,
    logsIsLoading: false,
    onDownloadClick: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when loading states are true', () => {
    const wrapper = shallow(<Dashboard {...props} isLoading logsIsLoading />);
    expect(wrapper).toBeDefined();
  });

  it('responds to ExportButton onClick', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<Dashboard {...props} onDownloadClick={spy} />);
    wrapper.find('ExportButton').props().onClick();
    sinon.assert.calledOnce(spy);
  });
});
