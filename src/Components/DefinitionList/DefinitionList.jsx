import React from 'react';
import { isPlainObject, keys, map, merge, omit } from 'lodash';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Definition from './Definition/Definition';

const defaults = {
  items: [],
  children: [],
};

const DefinitionList = (props) => {
  const options = omit(props, keys(defaults));
  let items = props.items;

  // Transform prop type objects
  if (isPlainObject(items)) {
    items = map(items, (item, key) => merge({
      term: key,
      definition: item,
    }));
  }

  options.className = options.className ? `definitions ${options.className}` : 'definitions';

  return (
    <dl {...options}>
      {
        props.children.length ?
          props.children :
          items.map(item => (
            <Definition id="hi" key={shortid.generate()} {...item} />
          ))
       }
    </dl>
  );
};

const node = PropTypes.shape({
  type: PropTypes.oneOf([Definition]),
});

DefinitionList.propTypes = {
  /** Ignored if `children` if both props are used */
  items: PropTypes.oneOfType([
    /** Object: keys => terms, values => definitions */
    PropTypes.shape(),
    /** Array of { term: term, definition: definition } */
    PropTypes.arrayOf(
      PropTypes.shape({
        term: PropTypes.string,
        definition: PropTypes.string,
      }),
    ),
  ]),

  /** Takes precedence over `items` if both props are used. */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(node),
    node,
  ]),
};

DefinitionList.defaultProps = defaults;

export default DefinitionList;
