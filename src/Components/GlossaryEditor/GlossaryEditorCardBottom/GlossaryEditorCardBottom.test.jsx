import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import GlossaryEditorCardBottom from './GlossaryEditorCardBottom';

describe('GlossaryEditorCardBottomComponent', () => {
  const props = {
    isNewTerm: true,
    hasErrored: false,
    showEmptyWarning: false,
    dateUpdated: '2018-02-07T13:59:13.282581Z',
    updatedBy: 'John Doe',
    isArchived: false,
    id: 1,
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

  it('displays a response error when ids match', () => {
    const wrapper = shallow(<GlossaryEditorCardBottom
      {...props}
      hasErrored={{ id: 1, hasErrored: true }}
      id={1}
    />);
    expect(wrapper.find('ErrorMessage').props().showResponseError).toBe(true);
  });

  it('does not display a response error when ids do not match', () => {
    const wrapper = shallow(<GlossaryEditorCardBottom
      {...props}
      hasErrored={{ id: 1, hasErrored: true }}
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
      isNewTerm={false}
    />);
    expect(wrapper.find('History').exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<GlossaryEditorCardBottom {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
