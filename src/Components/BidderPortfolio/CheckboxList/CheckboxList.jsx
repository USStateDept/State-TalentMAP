import React from 'react';
import CheckBox from '../../CheckBox';
import { CLASSIFICATIONS } from '../../../Constants/PropTypes';

const CheckboxList = ({ list }) => (

  <div className="client-checkbox-list">
    {list.map(c => (
      <CheckBox
        id={c.id}
        label={c.label}
        small
        value
        key={c.value}
        disabled={c.isDisabled}
        className={c.isDisabled ? 'tm-checkbox-disabled-alternate' : ''}
      />
    ))}
  </div>
);

CheckboxList.propTypes = {
  list: CLASSIFICATIONS,
};

CheckboxList.defaultProps = {
  isDisabled: false,
  list: [],
};

export default CheckboxList;
