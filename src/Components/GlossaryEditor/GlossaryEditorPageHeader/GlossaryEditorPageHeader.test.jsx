import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import GlossaryEditorPageHeader from './GlossaryEditorPageHeader';

describe('GlossaryEditorPageHeaderComponent', () => {
  const props = {
    submitNewGlossaryTerm: () => {},
    glossaryPostHasErrored: false,
  };

  it('is defined', () => {
    const wrapper = shallow(<GlossaryEditorPageHeader {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<GlossaryEditorPageHeader {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot wen glossaryPatchHasErrored is true', () => {
    const wrapper = shallow(<GlossaryEditorPageHeader {...props} glossaryPostHasErrored />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
