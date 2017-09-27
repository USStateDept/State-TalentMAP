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
        cloneSavedSearch={() => {}}
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
        cloneSavedSearch={() => {}}
      />,
    );
    expect(wrapper.instance().props.savedSearch.id).toBe(searchObject.id);
  });

  it('can call functions on button click', () => {
    const goToSpy = sinon.spy();
    const deleteSpy = sinon.spy();
    const cloneSpy = sinon.spy();
    const wrapper = shallow(
      <SavedSearchesCard
        savedSearch={searchObject}
        goToSavedSearch={goToSpy}
        deleteSearch={deleteSpy}
        cloneSavedSearch={cloneSpy}
      />,
    );
    wrapper.find('button').at(0).simulate('click');
    sinon.assert.calledOnce(goToSpy);
    wrapper.find('button').at(1).simulate('click');
    sinon.assert.calledOnce(cloneSpy);
    wrapper.find('button').at(2).simulate('click');
    sinon.assert.calledOnce(deleteSpy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <SavedSearchesCard
        savedSearch={searchObject}
        goToSavedSearch={() => {}}
        deleteSearch={() => {}}
        cloneSavedSearch={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
