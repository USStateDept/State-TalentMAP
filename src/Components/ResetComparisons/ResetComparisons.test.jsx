import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import ResetComparisons from './ResetComparisons';

describe('ResetComparisons', () => {
  let favoritesButton = null;

  beforeEach(() => {
    localStorage.setItem('compare', JSON.stringify(['1', '2']));
    favoritesButton = TestUtils.renderIntoDocument(<ResetComparisons />);
  });

  it('is defined', () => {
    expect(favoritesButton).toBeDefined();
  });

  it('can click on the button', () => {
    const wrapper = shallow(<ResetComparisons />);
    wrapper.find('a').simulate('click');
  });
});
