import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import GlossaryListing from './GlossaryListing';
import glossaryItems from '../../../__mocks__/glossaryItems';

describe('GlossaryListingComponent', () => {
  const props = {
    glossaryItems,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <GlossaryListing
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <GlossaryListing
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
