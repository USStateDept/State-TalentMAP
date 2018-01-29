import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import SaveNewSearchContainer from './SaveNewSearchContainer';

describe('SaveNewSearchContainerComponent', () => {
  let wrapper = null;

  it('is defined', () => {
    wrapper = shallow(
      <SaveNewSearchContainer
        saveSearch={() => {}}
        newSavedSearchHasErrored="message"
        newSavedSearchSuccess={false}
        newSavedSearchIsSaving={false}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('accepts different props', () => {
    const success = 'success';
    wrapper = shallow(
      <SaveNewSearchContainer
        saveSearch={() => {}}
        newSavedSearchHasErrored={false}
        newSavedSearchSuccess="success"
        newSavedSearchIsSaving={false}
      />,
    );
    expect(wrapper.instance().props.newSavedSearchSuccess).toBe(success);
  });

  it('can call the save search function', () => {
    const spy = sinon.spy();
    wrapper = shallow(
      <SaveNewSearchContainer
        saveSearch={spy}
        newSavedSearchHasErrored={false}
        newSavedSearchSuccess="success"
        newSavedSearchIsSaving={false}
      />,
    );
    wrapper.instance().props.saveSearch();
    sinon.assert.calledOnce(spy);
  });

  it('can call the toggleInput function', () => {
    wrapper = shallow(
      <SaveNewSearchContainer
        saveSearch={() => {}}
        newSavedSearchHasErrored={false}
        newSavedSearchSuccess={false}
        newSavedSearchIsSaving={false}
      />,
    );
    expect(wrapper.instance().state.showInput.value).toBe(false);
    wrapper.instance().toggleInput({ preventDefault: () => {} });
    expect(wrapper.instance().state.showInput.value).toBe(true);
  });

  it('can call the changeNewSearchName function', () => {
    const text = 'text';
    wrapper = shallow(
      <SaveNewSearchContainer
        saveSearch={() => {}}
        newSavedSearchHasErrored={false}
        newSavedSearchSuccess="success"
        newSavedSearchIsSaving={false}
      />,
    );
    wrapper.instance().changeNewSearchName(text);
    expect(wrapper.instance().state.newSearchName.value).toBe(text);
  });

  it('can call the submitSavedSearch function', () => {
    const text = 'text';
    const textToChange = { value: 'old' };
    wrapper = shallow(
      <SaveNewSearchContainer
        saveSearch={(e) => { textToChange.value = e; }}
        newSavedSearchHasErrored={false}
        newSavedSearchSuccess="success"
        newSavedSearchIsSaving={false}
      />,
    );
    wrapper.instance().changeNewSearchName(text);
    wrapper.instance().submitSavedSearch({ preventDefault: () => {} });
    expect(textToChange.value).toBe(text);
  });

  it('matches snapshot', () => {
    wrapper = shallow(
      <SaveNewSearchContainer
        saveSearch={() => {}}
        newSavedSearchHasErrored="message"
        newSavedSearchSuccess={false}
        newSavedSearchIsSaving={false}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
