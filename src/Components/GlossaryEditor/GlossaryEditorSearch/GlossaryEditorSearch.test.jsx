import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import GlossaryEditorSearch from './GlossaryEditorSearch';

describe('GlossaryEditorSearchComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <GlossaryEditorSearch
        onUpdate={() => {}}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <GlossaryEditorSearch
        onUpdate={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
