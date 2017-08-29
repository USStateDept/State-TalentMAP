import React from 'react';
import PropTypes from 'prop-types';
import { PILL_ITEM_ARRAY } from '../../Constants/PropTypes';
import Pill from '../Pill/Pill';

const shortid = require('shortid');

const PillList = ({ items, onPillClick }) => (
  <div>
    {
      (items.sort((a, b) => { // sort our pills by description
        const descA = a.description.toLowerCase();
        const descB = b.description.toLowerCase();
        if (descA < descB) { // sort string ascending
          return -1;
        }
        if (descA > descB) { return 1; }
        return 0; // default return value (no sorting)
      }))
        .map(item =>
          (<Pill
            key={shortid.generate()}
            description={item.description}
            codeRef={item.codeRef}
            selectionRef={item.selectionRef}
            onPillClick={(p, v) => onPillClick(p, v)}
          />),
        )
    }
  </div>
  );

PillList.propTypes = {
  items: PILL_ITEM_ARRAY,
  onPillClick: PropTypes.func.isRequired,
};

PillList.defaultProps = {
  items: [],
};

export default PillList;
