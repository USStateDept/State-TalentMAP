import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import CompareList from './CompareList';
import resultsObject from '../../__mocks__/resultsObject';

describe('CompareListComponent', () => {
  let compare = null;
  let wrapper = null;

  beforeEach(() => {
    compare = TestUtils.renderIntoDocument(<MemoryRouter>
      <CompareList compare={resultsObject.results} />
    </MemoryRouter>);
  });

  it('is defined', () => {
    expect(compare).toBeDefined();
  });

  it('can receive props', () => {
    wrapper = shallow(<CompareList compare={resultsObject.results} />);
    expect(wrapper.instance().props.compare[0].id).toBe(6);
  });
});
