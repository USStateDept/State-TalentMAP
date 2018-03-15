import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import GlossaryEditorCardBottom from './GlossaryEditorCardBottom';

describe('GlossaryEditorCardBottomComponent', () => {
  const props = {
    isNewTerm: true,
    hasErrored: {},
    showEmptyWarning: false,
    dateUpdated: '2018-02-07T13:59:13.282581Z',
    updatedBy: 'John Doe',
    isArchived: false,
    submitGlossaryTerm: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(<GlossaryEditorCardBottom {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('displays an empty string error', () => {
    const wrapper = shallow(<GlossaryEditorCardBottom {...props} showEmptyWarning />);
    expect(wrapper.find('ErrorMessage').props().showEmptyWarning).toBe(true);
  });

  it('displays a response error when is new term', () => {
    const state = { message: 'error', hasErrored: true };
    const wrapper = shallow(<GlossaryEditorCardBottom
      {...props}
      hasErrored={state}
      id={1}
    />);
    expect(wrapper.find('ErrorMessage').props().error).toBe(state);
  });

  it('does not display a response error when ids do not match', () => {
    const wrapper = shallow(<GlossaryEditorCardBottom
      {...props}
      isNewTerm={false}
      hasErrored={{ id: 1, message: 'error', hasErrored: true }}
      id={2}
    />);
    expect(wrapper.find('ErrorMessage').exists()).toBe(false);
  });

  it('does not display the bottom section when isNewTerm is true', () => {
    const wrapper = shallow(<GlossaryEditorCardBottom
      {...props}
      isNewTerm
    />);
    expect(wrapper.find('History').exists()).toBe(false);
  });

  it('displays the bottom section when isNewTerm is false', () => {
    const wrapper = shallow(<GlossaryEditorCardBottom
      {...props}
      id={1}
      isNewTerm={false}
    />);
    expect(wrapper.find('History').exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<GlossaryEditorCardBottom {...props} id={1} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
