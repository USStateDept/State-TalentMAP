import { shallow } from 'enzyme';
import React from 'react';
import TextEditorLoadable, { path } from './TextEditorLoadable';

describe('TextEditorLoadable', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <TextEditorLoadable />,
    );
    expect(wrapper).toBeDefined();
  });

  it('has a defined loadable content', (done) => {
    const loadablePath = path();
    setTimeout(() => {
      expect(loadablePath).toBeDefined();
      done();
    }, 0);
  });
});
