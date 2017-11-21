import React from 'react';
import { shallow } from 'enzyme';
import PaginationWrapper from './PaginationWrapper';

// this is merely a wrapper for the react-paginate module, so we're just
// ensuring that it accepts props

describe('PaginationWrapper', () => {
  let wrapper = null;

  it('is defined', () => {
    wrapper = shallow(<PaginationWrapper
      totalResults={21}
      pageSize={5}
      onPageChange={() => {}}
      forcePage={1}
    />);
    expect(wrapper).toBeDefined();
  });

  it('can call the onPageChange function to reconcile zero base', () => {
    const value = 1;
    const page = { value: null };
    wrapper = shallow(<PaginationWrapper
      totalResults={21}
      pageSize={5}
      onPageChange={(e) => { page.value = e; }}
      forcePage={1}
    />);
    wrapper.instance().onPageChange({ selected: value });
    expect(page.value.page).toBe(value + 1);
  });

  it('can take different props', () => {
    wrapper = shallow(<PaginationWrapper
      totalResults={21}
      pageSize={5}
      onPageChange={() => {}}
      forcePage={1}
    />);
    expect(wrapper.instance().props.pageSize).toBe(5);
  });
});
