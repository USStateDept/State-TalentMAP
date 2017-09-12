import React from 'react';
import { shallow } from 'enzyme';
import PaginationWrapper from './PaginationWrapper';

// this is merely a wrapper for the react-paginate module, so we're just
// ensuring that it accepts props

describe('PaginationWrapper', () => {
  let wrapper = null;

  it('is defined', () => {
    wrapper = shallow(<PaginationWrapper
      pageCount={5}
      onPageChange={() => {}}
      forcePage={1}
    />);
    expect(wrapper).toBeDefined();
  });

  it('it can take different props', () => {
    wrapper = shallow(<PaginationWrapper
      pageCount={5}
      onPageChange={() => {}}
      forcePage={1}
    />);
    expect(wrapper.instance().props.pageCount).toBe(5);
  });
});
