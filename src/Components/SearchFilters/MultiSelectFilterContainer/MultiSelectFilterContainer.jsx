import React from 'react';
import Accordion, { AccordionItem } from '../../Accordion';
import { FILTER_ITEMS_ARRAY } from '../../../Constants/PropTypes';

const shortid = require('shortid'); // only use shortid if we don't have a key to use

// replace spaces with hyphens so that id attributes are valid
export const formatIdSpacing = (id) => {
  if (id) {
    let idString = id.toString();
    idString = idString.split(' ').join('-');
    // remove any non-alphanumeric character, excluding hyphen
    idString = idString.replace(/[^a-zA-Z0-9 -]/g, '');
    return idString;
  }
  // if id is not defined, return null
  return null;
};

const MultiSelectFilterContainer = ({ multiSelectFilterList }) => (
  <Accordion className="accordion-inverse">
    {
      multiSelectFilterList.map(item => (
        <AccordionItem
          key={item.title || shortid.generate()}
          id={`checkbox-${formatIdSpacing(item.title)}`}
          title={item.title}
        >
          {item.content}
        </AccordionItem>))
    }
  </Accordion>
);

MultiSelectFilterContainer.propTypes = {
  multiSelectFilterList: FILTER_ITEMS_ARRAY.isRequired,
};

export default MultiSelectFilterContainer;
