import React from 'react';
import Accordion from '../../Accordion/Accordion';
import AccordionItem from '../../Accordion/AccordionItem/AccordionItem';
import { GLOSSARY_ARRAY } from '../../../Constants/PropTypes';

const GlossaryComponent = ({ glossaryItems }) => (
  <Accordion>
    {
      glossaryItems.map(item =>
        (<AccordionItem key={item.id} title={item.title} id={item.title} useIdClass={false}>
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
