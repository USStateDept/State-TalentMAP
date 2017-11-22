import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import ResultsFilterContainer from './ResultsFilterContainer';
import { ACCORDION_SELECTION } from '../../Constants/DefaultProps';
import userObject from '../../__mocks__/userObject';

describe('ResultsFilterContainerComponent', () => {
  const items = [{
    title: 'title', expanded: true,
  }];

  const accordion = ACCORDION_SELECTION;

  it('is defined', () => {
    const wrapper = shallow(
      <ResultsFilterContainer
        filters={items}
        onQueryParamUpdate={() => {}}
        onChildToggle={() => {}}
        onQueryParamToggle={() => {}}
        resetFilters={() => {}}
        setAccordion={() => {}}
        selectedAccordion={accordion}
        fetchMissionAutocomplete={() => {}}
        missionSearchResults={[]}
        missionSearchIsLoading={false}
        missionSearchHasErrored={false}
        fetchPostAutocomplete={() => {}}
        postSearchResults={[]}
        postSearchIsLoading={false}
        postSearchHasErrored={false}
        userProfile={userObject}
      />);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(<ResultsFilterContainer
      filters={items}
      onQueryParamUpdate={() => {}}
      onChildToggle={() => {}}
      onQueryParamToggle={() => {}}
      resetFilters={() => {}}
      setAccordion={() => {}}
      selectedAccordion={accordion}
      fetchMissionAutocomplete={() => {}}
      missionSearchResults={[]}
      missionSearchIsLoading={false}
      missionSearchHasErrored={false}
      fetchPostAutocomplete={() => {}}
      postSearchResults={[]}
      postSearchIsLoading={false}
      postSearchHasErrored={false}
      userProfile={userObject}
    />);
    expect(wrapper.instance().props.filters).toBe(items);
  });

  it('can call the onQueryParamUpdate function', () => {
    const value = 1;
    const queryUpdateSpy = sinon.spy();
    const toggleSpy = sinon.spy();
    const wrapper = shallow(<ResultsFilterContainer
      filters={items}
      onQueryParamUpdate={queryUpdateSpy}
      onChildToggle={toggleSpy}
      onQueryParamToggle={() => {}}
      resetFilters={() => {}}
      setAccordion={() => {}}
      selectedAccordion={accordion}
      fetchMissionAutocomplete={() => {}}
      missionSearchResults={[]}
      missionSearchIsLoading={false}
      missionSearchHasErrored={false}
      fetchPostAutocomplete={() => {}}
      postSearchResults={[]}
      postSearchIsLoading={false}
      postSearchHasErrored={false}
      userProfile={userObject}
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
      filters={items}
      onQueryParamUpdate={() => {}}
      onChildToggle={toggleSpy}
      onQueryParamToggle={queryToggleSpy}
      resetFilters={() => {}}
      setAccordion={() => {}}
      selectedAccordion={accordion}
      fetchMissionAutocomplete={() => {}}
      missionSearchResults={[]}
      missionSearchIsLoading={false}
      missionSearchHasErrored={false}
      fetchPostAutocomplete={() => {}}
      postSearchResults={[]}
      postSearchIsLoading={false}
      postSearchHasErrored={false}
      userProfile={userObject}
    />);
    wrapper.instance().onQueryParamToggle(value, value, value);
    sinon.assert.calledOnce(queryToggleSpy);
    sinon.assert.calledOnce(toggleSpy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ResultsFilterContainer
      filters={items}
      onQueryParamUpdate={() => {}}
      onChildToggle={() => {}}
      onQueryParamToggle={() => {}}
      resetFilters={() => {}}
      setAccordion={() => {}}
      selectedAccordion={accordion}
      fetchMissionAutocomplete={() => {}}
      missionSearchResults={[]}
      missionSearchIsLoading={false}
      missionSearchHasErrored={false}
      fetchPostAutocomplete={() => {}}
      postSearchResults={[]}
      postSearchIsLoading={false}
      postSearchHasErrored={false}
      userProfile={userObject}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
