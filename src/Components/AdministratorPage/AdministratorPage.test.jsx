import React from 'react';
import { shallow } from 'enzyme';
import AdministratorPage from './AdministratorPage';

describe('AdministratorPage', () => {
  it('is defined', () => {
    const wrapper = shallow(<AdministratorPage />);
    expect(wrapper).toBeDefined();
  });
});
