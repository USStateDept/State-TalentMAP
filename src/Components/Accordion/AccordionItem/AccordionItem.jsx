import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual, isUndefined } from 'lodash';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import { formatIdSpacing } from '../../../utilities';

class AccordionItem extends Component {
  constructor(props) {
    super(props);
    this.setExpanded = this.setExpanded.bind(this);
    this.state = {
      expanded: props.expanded,
    };
  }

  // Update the value of expanded, only if the prop value changed and the new value is not undefined
  componentWillReceiveProps(nextProps) {
    if (!isUndefined(nextProps.expanded) && !(isEqual(nextProps.expanded, this.props.expanded))) {
      this.setState({ expanded: nextProps.expanded });
    }
  }

  // Update local state and emit to the parent
  setExpanded() {
    this.setState({ expanded: !this.state.expanded }, () => {
      this.props.setAccordion(this.props.id, this.state.expanded);
    });
  }

  // helper function for parents to use via ref, to set the expanded state to a desired value
  setExpandedFromRef(expanded) {
    this.setState({ expanded });
  }

  // helper function for parents to use via ref, to get current expanded state value
  isExpanded() {
    return this.state.expanded;
  }

  render() {
    const { expanded } = this.state;
    const { id, title, children, className, useIdClass,
      buttonClass, childClass, preContent } = this.props;
    const formattedId = formatIdSpacing(id);
    const idClass = useIdClass ? `accordion-${(formattedId || 'accordion').toLowerCase()}` : '';
    return (
      <li className={className}>
        {preContent}
        <button
          id={`${id}-button`}
          className={`usa-accordion-button ${buttonClass} ${preContent ? 'has-pre-content' : ''}`}
          aria-expanded={expanded}
          aria-controls={formattedId}
          onClick={this.setExpanded}
        >
          <div className="accordion-item-title">{title}</div>
        </button>
        <div id={formattedId} className={`usa-accordion-content ${childClass} ${idClass}`} aria-hidden={!expanded}>
          {children}
        </div>
      </li>
    );
  }
}

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
