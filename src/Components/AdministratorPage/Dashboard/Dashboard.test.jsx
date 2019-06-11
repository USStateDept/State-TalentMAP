import React from 'react';
import { shallow } from 'enzyme';
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
});
