import React from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import { formatIdSpacing } from '../../../utilities';

const AccordionItem = ({ id, title, expanded, setAccordion, children, className, useIdClass,
buttonClass, childClass, preContent }) => {
  const formattedId = formatIdSpacing(id);
  const idClass = useIdClass ? `accordion-${(formattedId || 'accordion').toLowerCase()}` : '';
  return (
    <li className={className}>
      {preContent}
      <button
        className={`usa-accordion-button ${buttonClass} ${preContent ? 'has-pre-content' : ''}`}
        aria-expanded={expanded}
        aria-controls={formattedId}
        onClick={() => setAccordion(expanded || !title ? '' : title)}
      >
        <div className="accordion-item-title">{title}</div>
      </button>
      <div id={formattedId} className={`usa-accordion-content ${childClass} ${idClass}`} aria-hidden={!expanded}>
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
  buttonClass: PropTypes.string,
  childClass: PropTypes.string,
  preContent: PropTypes.node,
};

AccordionItem.defaultProps = {
  title: '',
  setAccordion: EMPTY_FUNCTION,
  expanded: false,
  children: null,
  className: '',
  useIdClass: true,
  buttonClass: '',
  childClass: '',
  preContent: undefined,
};

export default AccordionItem;
