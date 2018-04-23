import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import ResultsFilterContainer from './ResultsFilterContainer';
import { bidderUserObject } from '../../__mocks__/userObject';

describe('ResultsFilterContainerComponent', () => {
  const items = [{
    title: 'title', expanded: true,
  }];

  const props = {
    filters: items,
    onQueryParamUpdate: () => {},
    onChildToggle: () => {},
    onQueryParamToggle: () => {},
    resetFilters: () => {},
    setAccordion: () => {},
    fetchMissionAutocomplete: () => {},
    missionSearchResults: [],
    missionSearchIsLoading: false,
    missionSearchHasErrored: false,
    fetchPostAutocomplete: () => {},
    postSearchResults: [],
    postSearchIsLoading: false,
    postSearchHasErrored: false,
    userProfile: bidderUserObject,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <ResultsFilterContainer
        {...props}
      />);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(<ResultsFilterContainer
      {...props}
    />);
    expect(wrapper.instance().props.filters).toBe(items);
  });

  it('is defined after receiving new props', () => {
    const wrapper = shallow(<ResultsFilterContainer
      {...props}
    />);
    wrapper.setProps({ newProp: 'abz' });
    expect(wrapper).toBeDefined();
  });

  it('can call the onQueryParamUpdate function', () => {
    const value = 1;
    const queryUpdateSpy = sinon.spy();
    const toggleSpy = sinon.spy();
    const wrapper = shallow(<ResultsFilterContainer
      {...props}
      onQueryParamUpdate={queryUpdateSpy}
      onChildToggle={toggleSpy}
    />);
    wrapper.instance().onQueryParamUpdate(value);
    sinon.assert.calledOnce(queryUpdateSpy);
    sinon.assert.calledOnce(toggleSpy);
  });

  it('can call the onQueryParamToggle function', () => {
    const value = 1;
    const queryToggleSpy = sinon.spy();
    const toggleSpy = sinon.spy();
    const wrapper = shallow(<ResultsFilterContainer
      {...props}
      onChildToggle={toggleSpy}
      onQueryParamToggle={queryToggleSpy}
    />);
    wrapper.instance().onQueryParamToggle(value, value, value);
    sinon.assert.calledOnce(queryToggleSpy);
    sinon.assert.calledOnce(toggleSpy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ResultsFilterContainer
      {...props}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
