import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import OBCUrl from './OBCUrl';

describe('OBCUrlComponent', () => {
  beforeEach(() => {
    process.env.PUBLIC_URL = '/talentmap/';
  });

  it('is defined', () => {
    const wrapper = shallow(<OBCUrl
      id={5}
    />);
    expect(wrapper).toBeDefined();
  });

  it('forms the url', () => {
    const wrapper = shallow(<OBCUrl
      id={5}
    />);
    expect(wrapper.find('a').props().href).toBe('/talentmap/obc/post/5');
  });

  it('forms the url when type is "country"', () => {
    const wrapper = shallow(<OBCUrl
      id={5}
      type="country"
    />);
    expect(wrapper.find('a').props().href).toBe('/talentmap/obc/country/5');
  });

  it('is defined when id is a string', () => {
    const wrapper = shallow(<OBCUrl
      id="5A"
    />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<OBCUrl
      id={5}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when type is "post-data"', () => {
    const wrapper = shallow(<OBCUrl
      id={5}
      type="post-data"
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when type is "country"', () => {
    const wrapper = shallow(<OBCUrl
      id={5}
      type="country"
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when id is a string', () => {
    const wrapper = shallow(<OBCUrl
      id="5A"
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isButton is true', () => {
    const wrapper = shallow(<OBCUrl
      id="5A"
      isButton
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
