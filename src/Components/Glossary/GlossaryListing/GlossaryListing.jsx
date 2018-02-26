import React from 'react';
import Accordion, { AccordionItem } from '../../Accordion';
import { GLOSSARY_ARRAY } from '../../../Constants/PropTypes';
import { formatIdSpacing } from '../../../utilities';

const GlossaryComponent = ({ glossaryItems }) => (
  <Accordion className="accordion-inverse" isMultiselectable>
    {
      glossaryItems.map(item =>
        (<AccordionItem
          key={item.id}
          title={item.title}
          id={formatIdSpacing(item.title)}
          useIdClass={false}
        >
          {item.definition}
        </AccordionItem>),
     )
    }
  </Accordion>
);

GlossaryComponent.propTypes = {
  glossaryItems: GLOSSARY_ARRAY.isRequired,
};

export default GlossaryComponent;
