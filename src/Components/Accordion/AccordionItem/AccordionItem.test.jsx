import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import AccordionItem from './AccordionItem';

describe('AccordionItemComponent', () => {
  it('can receive props', () => {
    const wrapper = shallow(
      <AccordionItem
        id="id"
        title="title"
        expanded
        setAccordion={() => {}}
      >
        <span>child</span>
      </AccordionItem>,
    );
    expect(wrapper.instance().props.id).toBe('id');
  });

  it('can receive different props', () => {
    const wrapper = shallow(
      <AccordionItem
        id="id"
        expanded
        setAccordion={() => {}}
        preContent={<span />}
      >
        <span>child</span>
      </AccordionItem>,
    );
    expect(wrapper.instance().props.id).toBe('id');
  });

  it('can click the button', () => {
    const expanded = { value: null };
    const wrapper = shallow(
      <AccordionItem
        id="id"
        title="title"
        expanded={false}
        setAccordion={(e) => { expanded.value = e; }}
      >
        <span>child</span>
      </AccordionItem>,
    );
    wrapper.find('button').simulate('click');
    expect(expanded.value).toBe('title');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <AccordionItem
        id="id"
        title="title"
        expanded
        setAccordion={() => {}}
      >
        <span>child</span>
      </AccordionItem>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
