import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
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

  it('can respond to an enter key on the link', () => {
    const spy = sinon.spy();
    wrapper = shallow(
      <SaveNewSearchPrompt
        toggleInput={spy}
        newSavedSearchSuccess="success"
      />,
    );
    wrapper.find('a').simulate('keyUp', { keyCode: 13 });
    sinon.assert.calledOnce(spy);
    // should only respond to 13
    wrapper.find('a').simulate('keyUp', { keyCode: 14 });
    // therefore, it should still have only been called once
    sinon.assert.calledOnce(spy);
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
