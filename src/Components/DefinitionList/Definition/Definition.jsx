import React from 'react';
import PropTypes from 'prop-types';
import { keys, omit } from 'lodash';

const defaults = {
  term: '',
  definition: '',
  truncate: true,
};

const Definition = (props) => {
  const options = omit(props, keys(defaults));
  let { term, definition } = props;

  term = (term || '').length && `${term}:`;
  definition = definition || '';

  return (
    <div {...options}>
      <dt>{term}</dt>
      <dd className={props.truncate && 'truncate'}>{definition}</dd>
    </div>
  );
};

Definition.propTypes = {
  term: PropTypes.string,
  definition: PropTypes.string,
  truncate: PropTypes.bool,
};

Definition.defaultProps = defaults;

export default Definition;
