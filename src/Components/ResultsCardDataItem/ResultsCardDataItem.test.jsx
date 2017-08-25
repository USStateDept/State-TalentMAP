import { shallow } from 'enzyme';
import React from 'react';
import ResultsCardDataItem from './ResultsCardDataItem';

describe('ResultsCardDataItemComponent', () => {
  const title = 'title';
  const items = [
    { description: 'test', text: 'text' },
  ];

  it('can receive props', () => {
    const wrapper =
      shallow(<ResultsCardDataItem title={title} items={items} />);
    expect(wrapper.instance().props.title).toBe(title);
  });
});
