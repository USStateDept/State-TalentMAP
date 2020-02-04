import React from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { get } from 'lodash';
import { Row, Column } from '../../../Layout';
import { EMPTY_FUNCTION } from '../../../../Constants/PropTypes';
import InteractiveElement from '../../../InteractiveElement';

export const stopProp = (e) => { if (e && e.stopPropagation) { e.stopPropagation(); } };

const UserRow = (props) => {
  const {
    name, onClick, isSelected,
  } = props;

  const onClick$ = (e) => {
    if (get(e, 'target.name') !== 'download') {
      onClick(props.name);
    }
  };

  return (
    <InteractiveElement
      onClick={onClick$}
      title={`View contents of ${name}`}
      type={Row}
      role="radio"
      aria-checked={isSelected}
      className={`usa-grid-full log-list-row ${isSelected ? 'log-list-row--selected' : ''}`}
    >
      <Column columns={1}>
        <FA name={isSelected ? 'dot-circle-o' : 'circle-o'} />
      </Column>
      <Column columns={9}>
        <span>{name}</span>
      </Column>
    </InteractiveElement>
  );
};

UserRow.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
};

UserRow.defaultProps = {
  onClick: EMPTY_FUNCTION,
  isSelected: false,
};

export default UserRow;
