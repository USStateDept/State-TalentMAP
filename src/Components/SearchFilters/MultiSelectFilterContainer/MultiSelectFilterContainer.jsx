import React from 'react';
import PropTypes from 'prop-types';
import Accordion, { AccordionItem } from '../../Accordion';
import { FILTER_ITEMS_ARRAY, EMPTY_FUNCTION } from '../../../Constants/PropTypes';

const shortid = require('shortid'); // only use shortid if we don't have a key to use

const MultiSelectFilterContainer = ({ multiSelectFilterList, setAccordion }) => (
  <Accordion className="accordion-inverse">
    {
          multiSelectFilterList.map(item => (
            <AccordionItem
              key={item.title || shortid.generate()}
              id={`checkbox-${item.title}`}
              title={item.title}
              expanded={item.expanded}
              setAccordion={setAccordion}
            >
              {item.content}
            </AccordionItem>))
        }
  </Accordion>
);

MultiSelectFilterContainer.propTypes = {
  multiSelectFilterList: FILTER_ITEMS_ARRAY.isRequired,
  setAccordion: PropTypes.func,
};

MultiSelectFilterContainer.defaultProps = {
  setAccordion: EMPTY_FUNCTION,
};

export default MultiSelectFilterContainer;
