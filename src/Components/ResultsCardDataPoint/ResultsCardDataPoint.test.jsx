import { shallow } from 'enzyme';
import React from 'react';
import ResultsCardDataPoint from './ResultsCardDataPoint';

describe('ResultsCardDataPointComponent', () => {
  const description = 'description';
  const text = 'text';

  it('can receive props', () => {
    const wrapper =
      shallow(<ResultsCardDataPoint description={description} text={text} />);
    expect(wrapper.instance().props.description).toBe(description);
  });
});
