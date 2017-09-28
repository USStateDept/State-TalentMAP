import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import SavedSearchesCard from './SavedSearchesCard';
import searchObject from '../../__mocks__/searchObject';

describe('SavedSearchesCardComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <SavedSearchesCard
        savedSearch={searchObject}
        goToSavedSearch={() => {}}
        deleteSearch={() => {}}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <SavedSearchesCard
        savedSearch={searchObject}
        goToSavedSearch={() => {}}
        deleteSearch={() => {}}
      />,
    );
    expect(wrapper.instance().props.savedSearch.id).toBe(searchObject.id);
  });

  it('can call functions on button click', () => {
    const goToSpy = sinon.spy();
    const deleteSpy = sinon.spy();
    const wrapper = shallow(
      <SavedSearchesCard
        savedSearch={searchObject}
        goToSavedSearch={goToSpy}
        deleteSearch={deleteSpy}
      />,
    );
    wrapper.find('button').at(0).simulate('click');
    wrapper.find('button').at(1).simulate('click');
    sinon.assert.calledOnce(goToSpy);
    sinon.assert.calledOnce(deleteSpy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <SavedSearchesCard
        savedSearch={searchObject}
        goToSavedSearch={() => {}}
        deleteSearch={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
