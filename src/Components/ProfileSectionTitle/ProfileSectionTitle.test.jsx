import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import FavoritePositionsTitle from './ProfileSectionTitle';

describe('FavoritePositionsTitleComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <FavoritePositionsTitle title="test" />,
    );
    expect(wrapper).toBeDefined();
  });

  it('it can receive props', () => {
    const title = 'test';
    const wrapper = shallow(
      <FavoritePositionsTitle title={title} />,
    );
    expect(wrapper.instance().props.title).toBe(title);
    expect(wrapper.find('test')).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <FavoritePositionsTitle title="test" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
