import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import SaveNewSearchPrompt from './SaveNewSearchPrompt';

describe('SaveNewSearchPromptComponent', () => {
  let wrapper = null;

  it('is defined', () => {
    wrapper = shallow(
      <SaveNewSearchPrompt
        toggleInput={() => {}}
        newSavedSearchSuccess="success"
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('calls functions after clicking InteractiveElement', () => {
    const spy = sinon.spy();
    wrapper = shallow(
      <SaveNewSearchPrompt
        toggleInput={spy}
        newSavedSearchSuccess="success"
      />,
    );
    wrapper.find('InteractiveElement').simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('can handle receiving currently selected saved searches', () => {
    const savedSearch = { id: 1, name: 'test' };
    wrapper = shallow(
      <SaveNewSearchPrompt
        toggleInput={() => {}}
        newSavedSearchSuccess="success"
        currentSavedSearch={savedSearch}
      />,
    );
    expect(wrapper.find(savedSearch.name)).toBeDefined();
    expect(wrapper.find('Edit')).toBeDefined();
  });

  it('matches snapshot', () => {
    wrapper = shallow(
      <SaveNewSearchPrompt
        toggleInput={() => {}}
        newSavedSearchSuccess="success"
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
