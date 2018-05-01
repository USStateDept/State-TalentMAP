import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SavedSearchPillList from './SavedSearchPillList';

describe('FavoriteContentComponent', () => {
  const pills = ['1', '0A', 'Los Angeles, CA United States of America (Post)'];
  it('is defined', () => {
    const wrapper = shallow(
      <SavedSearchPillList
        pills={pills}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when length is 0', () => {
    const wrapper = shallow(
      <SavedSearchPillList
        pills={[]}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <SavedSearchPillList
        pills={pills}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
