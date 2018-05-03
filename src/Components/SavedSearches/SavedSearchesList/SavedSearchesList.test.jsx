import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import SavedSearchesList from './SavedSearchesList';
import searchObjectParent from '../../../__mocks__/searchObjectParent';

describe('SavedSearchesListComponent', () => {
  const props = {
    savedSearches: searchObjectParent,
    goToSavedSearch: () => {},
    deleteSavedSearch: () => {},
    deleteSearch: () => {},
    cloneSavedSearch: () => {},
    mappedParams: [],
  };

  it('is defined', () => {
    const wrapper = shallow(
      <SavedSearchesList
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  [true, false].forEach((val) => {
    it(`is defined after componentDidMount and $scroll = ${val}`, (done) => {
      const wrapper = shallow(
        <SavedSearchesList
          {...props}
        />,
      );
      wrapper.instance().scroll$ = val ? { handleWindowResize: () => {} } : false;
      window.addEventListener = sinon.spy();
      wrapper.instance().componentDidMount();
      const f = () => {
        setTimeout(() => {
          expect(wrapper).toBeDefined();
          done();
        }, 0);
      };
      f();
    });
  });

  it('is defined after componentWillUnmount', () => {
    const wrapper = shallow(
      <SavedSearchesList
        {...props}
      />,
    );
    window.addEventListener = sinon.spy();
    wrapper.instance().componentWillUnmount();
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <SavedSearchesList
        {...props}
      />,
    );
    expect(wrapper.instance().props.savedSearches.results[0].id)
      .toBe(searchObjectParent.results[0].id);
  });

  it('can call updateScroll', () => {
    global.document.getElementById = () => ({ offsetHeight: 101 });
    const wrapper = shallow(
      <SavedSearchesList
        {...props}
      />,
    );
    wrapper.instance().container$ = true;
    wrapper.instance().updateScroll();
    expect(wrapper.instance().state.scroll.style.height).toBe(557);
  });

  it('can call setContainerRef', () => {
    const wrapper = shallow(
      <SavedSearchesList
        {...props}
      />,
    );
    wrapper.instance().setContainerRef(1);
    expect(wrapper.instance().container$).toBe(1);
  });

  it('can call setScrollRef', () => {
    const wrapper = shallow(
      <SavedSearchesList
        {...props}
      />,
    );
    wrapper.instance().setScrollRef(1);
    expect(wrapper.instance().scroll$).toBe(1);
  });

  it('displays an alert if there are no results', () => {
    const wrapper = shallow(
      <SavedSearchesList
        {...props}
        savedSearches={{ results: [] }}
      />,
    );
    expect(wrapper.find('NoSavedSearches').exists()).toBe(true);
  });
});
