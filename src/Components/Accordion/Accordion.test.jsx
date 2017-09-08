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

  it('can receive props', () => {
    const wrapper = shallow(
      <Accordion>
        {child}
      </Accordion>,
    );
    expect(wrapper.instance().props.children).toBe(child);
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
