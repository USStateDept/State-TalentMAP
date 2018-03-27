import React from 'react';
import PropTypes from 'prop-types';
import { isNumber, isString, omit } from 'lodash';

export const columnsMap = {
  1: 'one-twelfth',
  2: 'one-sixth',
  3: 'one-fourth',
  4: 'one-third',
  5: 'five-twelfths',
  6: 'one-half',
  7: 'seven-twelfths',
  8: 'two-thirds',
  9: 'three-fourths',
  10: 'five-sixths',
  11: 'eleven-twelfths',
  12: 'one-whole',
};

const Column = (props) => {
  const Element = props.as;
  const options = omit(props, ['columns', 'as', 'children']);
  options.className = (`usa-width-${columnsMap[props.columns]} ${props.className}`).trim();
  return (
    <Element {...options}>
      {props.children}
    </Element>
  );
};

Column.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  as: PropTypes.string.isRequired,
  columns: (props, propName, componentName) => {
    const prop = props[propName];
    const error = `Invalid prop ${propName} supplied to ${componentName}. ` +
                  'Expects a string or number between 1 and 12.';
    const isValid = (
      prop &&
      (isString(prop) || isNumber(prop)) &&
      (/([1-9]|10|11|12)/).test(prop)
    );

    if (!isValid) {
      return new Error(error);
    }

    return null;
  },
};

Column.defaultProps = {
  className: '',
  children: null,
  as: 'div',
  columns: 12,
};

export default Column;
