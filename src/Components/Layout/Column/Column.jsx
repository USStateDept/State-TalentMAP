import { isNumber, isString, merge } from 'lodash';
import Base from '../Base';

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

/* eslint-disable react/prop-types */
const Column = (props) => {
  const options = merge({}, props);
  options.className = (`usa-width-${columnsMap[props.columns]} ${props.className}`).trim();
  return (
    <Base {...options}>
      {props.children}
    </Base>
  );
};
/* eslint-enable react/prop-types */

Column.propTypes = merge({}, Base.propTypes, {
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
});

Column.defaultProps = merge({}, Base.defaultProps, {
  columns: 12,
});

export default Column;
