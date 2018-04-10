import React from 'react';
import Accordion, { AccordionItem } from '../../Accordion';
import { FILTER_ITEMS_ARRAY } from '../../../Constants/PropTypes';

const shortid = require('shortid'); // only use shortid if we don't have a key to use

const MultiSelectFilterContainer = ({ multiSelectFilterList }) => (
  <Accordion className="accordion-inverse">
    {
      multiSelectFilterList.map(item => (
        <AccordionItem
          key={item.title || shortid.generate()}
          id={`checkbox-${item.title}`}
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
