import React from 'react';
import { shallow } from 'enzyme';
import GlossaryTermTrigger from './GlossaryTermTrigger';

describe('GlossaryTermTriggerComponent', () => {
  const props = {
    text: 'text',
    term: 'term',
    toggle: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <GlossaryTermTrigger.WrappedComponent
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });
});
