import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import TotalResults from './TotalResults';

describe('TotalResults', () => {
  let wrapper = null;

  const resultsObj = { count: 500 };

  it('can receive props', () => {
    wrapper = shallow(
      <TotalResults totalResults={resultsObj} />,
    );
    expect(wrapper.instance().props.totalResults.count).toBe(resultsObj.count);
  });

  it('matches snapshot', () => {
    wrapper = shallow(
      <TotalResults totalResults={resultsObj} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
