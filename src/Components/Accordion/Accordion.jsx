import React from 'react';
import PropTypes from 'prop-types';

const Accordion = ({ items }) => (
  <ul className="usa-accordion">
    {
      items.map(item =>
        (
          <li>
            <button
              className="usa-accordion-button"
              aria-expanded="false"
              aria-controls={item.id}
            >
              {item.title}
            </button>
            <div id={item.id} className="usa-accordion-content">
              {item.content}
            </div>
          </li>
        ),
      )
    }
  </ul>
);

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.node,
    }),
  ).isRequired,
};

export default Accordion;
