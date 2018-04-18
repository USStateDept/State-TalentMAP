import React from 'react';
import PropTypes from 'prop-types';
import { keys, omit } from 'lodash';

const defaults = {
  term: '',
  definition: '',
  truncate: true,
  children: '',
};

const Definition = (props) => {
  const options = omit(props, keys(defaults));
  let { term, definition } = props;

  term = (term || '').length && `${term}:`;
  definition = definition || '';

  if (props.children) {
    definition = props.children;
  }

  return (
    <div {...options}>
      <dt>{term}</dt>
      <dd className={props.truncate && 'truncate'}>{definition}</dd>
    </div>
  );
};

const Node = PropTypes.node;

Definition.propTypes = {
  term: PropTypes.string,
  definition: PropTypes.node,
  truncate: PropTypes.bool,
  /** Takes precedence over `definition` if both props are used. */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(Node),
    Node,
  ]),
};

Definition.defaultProps = defaults;

export default Definition;
