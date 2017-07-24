import React from 'react';
import { shallow } from 'enzyme';
import Loading from './Loading';

describe('Loading', () => {
  it('is defined', () => {
    const loading = shallow(<Loading isLoading hasErrored={false} />);
    expect(loading).toBeDefined();
  });

  it('is can take different props', () => {
    let loading = null;
    loading = shallow(<Loading isLoading={false} hasErrored />);
    expect(loading).toBeDefined();
    loading = shallow(<Loading isLoading hasErrored />);
    expect(loading).toBeDefined();
  });
});
