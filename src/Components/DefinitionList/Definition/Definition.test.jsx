import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Definition from './Definition';

const mock = {
  term: 'Term #1',
  definition: 'Definition #1',
};

describe('Definition', () => {
  const props = {
    id: 'definition',
    className: 'definition-test',
  };

  it('can render `term` prop', () => {
    const wrapper = shallow(<Definition {...mock} />);
    expect(wrapper.find('dt').text()).toEqual(`${mock.term}:`);
  });

  it('can render `definition` prop', () => {
    const wrapper = shallow(<Definition {...mock} />);
    expect(wrapper.find('dd').text()).toEqual(mock.definition);
  });

  it('can recieve other props such as `className` and `id`', () => {
    const wrapper = shallow(<Definition {...props} />);

    expect(wrapper.find(`#${props.id}`).exists()).toBe(true);
    expect(wrapper.find(`.${props.className}`).exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<Definition {...props} {...mock} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
