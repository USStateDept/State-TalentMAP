import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import OBCUrl from './OBCUrl';

describe('OBCUrlComponent', () => {
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
    expect(wrapper.find('a').props().href).toBe('/obc/post/5');
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

  it('matches snapshot when id is a string', () => {
    const wrapper = shallow(<OBCUrl
      id="5A"
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
