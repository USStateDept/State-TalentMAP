import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import OBCUrl from './OBCUrl';

describe('OBCUrlComponent', () => {
  beforeEach(() => {
    process.env.PUBLIC_URL = '/talentmap/';
  });

  const url = 'https://google.com/1';

  it('is defined', () => {
    const wrapper = shallow(<OBCUrl
      url={url}
    />);
    expect(wrapper).toBeDefined();
  });

  it('forms the url', () => {
    const wrapper = shallow(<OBCUrl
      url={url}
    />);
    expect(wrapper.find('a').props().href).toBe(url);
  });

  it('is defined when id is a string', () => {
    const wrapper = shallow(<OBCUrl
      url={url}
    />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<OBCUrl
      url={url}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when type is "post-data"', () => {
    const wrapper = shallow(<OBCUrl
      url={url}
      type="post-data"
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when type is "country"', () => {
    const wrapper = shallow(<OBCUrl
      url={url}
      type="country"
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when id is a string', () => {
    const wrapper = shallow(<OBCUrl
      url={url}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isButton is true', () => {
    const wrapper = shallow(<OBCUrl
      url={url}
      isButton
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
