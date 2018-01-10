import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import Accordion from './Accordion';

describe('AccordionItemComponent', () => {
  const child = (
    <li>
      <button />
      <div className="usa-accordion-content" aria-hidden="false">
        <span />
      </div>
    </li>
  );

  it('receives elements', () => {
    const wrapper = shallow(
      <Accordion>
        {child}
      </Accordion>,
    );
    expect(wrapper.instance().props.children).toBe(child);
  });

  it('receives className prop', () => {
    const wrapper = shallow(
      <Accordion className="my-class">
        {child}
      </Accordion>,
    );
    expect(wrapper.find('.my-class').exists()).toBe(true);
  });

  it('receives isMultiselectable prop', () => {
    const wrapper = shallow(
      <Accordion isMultiselectable>
        {child}
      </Accordion>,
    );
    expect(wrapper.find('ul').prop('aria-multiselectable')).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Accordion>
        {child}
      </Accordion>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
