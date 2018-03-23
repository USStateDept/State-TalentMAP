import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { map, zipObject } from 'lodash';
import DefinitionList, { Definition } from './';

const mock = [
  { term: 'Term #1', definition: 'Definition #1' },
  { term: 'Term #2', definition: 'Definition #2' },
  { term: 'Term #3', definition: 'Definition #3' },
  { term: 'Term #4', definition: 'Definition #4' },
];

const mock$ = () => (
  <DefinitionList>
    <Definition {...mock[0]} />
    <Definition {...mock[1]} />
    <Definition {...mock[2]} />
    <Definition {...mock[3]} />
  </DefinitionList>
);

describe('DefinitionList', () => {
  const selector = '.definitions';

  it('can receive children prop', () => {
    const wrapper = shallow(mock$());
    expect(wrapper.find(selector).children('Definition')).toHaveLength(4);
  });

  it('can receive `items` as a collection', () => {
    const wrapper = shallow(<DefinitionList items={mock} />);
    expect(wrapper.find(selector).children('Definition')).toHaveLength(4);
  });

  it('can receive `items` as an object of key/values', () => {
    const items = zipObject(
      map(mock, 'term'),
      map(mock, 'definition'),
    );

    const wrapper = shallow(<DefinitionList items={items} />);
    expect(wrapper.find(selector).children('Definition')).toHaveLength(4);
  });

  it('can recieve other props such as `className` and `id`', () => {
    const props = {
      id: 'definitions',
      className: 'definitions-theme-1',
    };

    const wrapper = shallow(<DefinitionList {...props} />);

    expect(wrapper.find(`#${props.id}`).exists()).toBe(true);
    expect(wrapper.find(`.${props.className}`).exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(mock$());
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
