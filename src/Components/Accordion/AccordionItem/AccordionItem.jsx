import React from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';

const AccordionItem = ({ id, title, expanded, setAccordion, children, className, useIdClass }) => {
  const idClass = useIdClass ? `accordion-${(id || 'accordion').toLowerCase()}` : '';
  return (
    <li className={className}>
      <button
        className="usa-accordion-button"
        aria-expanded={expanded}
        aria-controls={id}
        onClick={() => setAccordion(expanded || !title ? '' : title)}
      >
        <div className="accordion-item-title">{title}</div>
      </button>
      <div id={id} className={`usa-accordion-content ${idClass}`} aria-hidden={!expanded}>
        {children}
      </div>
    </li>
  );
};

AccordionItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  expanded: PropTypes.bool,
  setAccordion: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  useIdClass: PropTypes.bool,
};

AccordionItem.defaultProps = {
  title: '',
  setAccordion: EMPTY_FUNCTION,
  expanded: false,
  children: null,
  className: '',
  useIdClass: true,
};

export default AccordionItem;
