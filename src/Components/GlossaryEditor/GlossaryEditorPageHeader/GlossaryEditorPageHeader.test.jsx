import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import GlossaryEditorPageHeader from './GlossaryEditorPageHeader';

describe('GlossaryEditorPageHeaderComponent', () => {
  const props = {
    submitNewGlossaryTerm: () => {},
    glossaryPostHasErrored: {},
  };

  it('is defined', () => {
    const wrapper = shallow(<GlossaryEditorPageHeader {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('displays a success alert', () => {
    const wrapper = shallow(<GlossaryEditorPageHeader
      {...props}
      glossaryPostSuccess={{ success: true }}
    />);
    expect(wrapper.find('[type="success"]').exists()).toBe(true);
  });

  it('displays the term editor when showNewTerm is true', () => {
    const wrapper = shallow(<GlossaryEditorPageHeader {...props} />);
    wrapper.instance().toggleNewTermEditor();
    expect(wrapper.instance().state.showNewTerm).toBe(true);
    expect(wrapper.find('GlossaryEditorCard').exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<GlossaryEditorPageHeader {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when glossaryPostSuccess is true', () => {
    const wrapper = shallow(<GlossaryEditorPageHeader
      {...props}
      glossaryPostSuccess={{ success: true }}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when showNewTerm is true', () => {
    const wrapper = shallow(<GlossaryEditorPageHeader
      {...props}
    />);
    wrapper.instance().toggleNewTermEditor();
    expect(wrapper.instance().state.showNewTerm).toBe(true);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
