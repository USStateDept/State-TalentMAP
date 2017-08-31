import React from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';

const AccordionItem = ({ id, title, expanded, setAccordion, children }) => (
  <li>
    <button
      className="usa-accordion-button"
      aria-expanded={expanded}
      aria-controls={id}
      onClick={() => setAccordion(expanded ? '' : title)}
    >
      {title}
    </button>
    <div id={id} className={`usa-accordion-content accordion-${id.toLowerCase()}`} aria-hidden={!expanded}>
      {children}
    </div>
  </li>
);

AccordionItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  setAccordion: PropTypes.func,
  children: PropTypes.node.isRequired,
};

AccordionItem.defaultProps = {
  setAccordion: EMPTY_FUNCTION,
  expanded: false,
};

export default AccordionItem;
