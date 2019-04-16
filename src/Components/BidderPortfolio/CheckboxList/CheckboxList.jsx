import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../../CheckBox';
import CLIENT_EDITS from '../../../Constants/ClientEdits';

const CheckboxList = ({ id, isDisabled }) => (

  <div className="client-checkbox-list">
    {CLIENT_EDITS.map(c => (
      <CheckBox
        id={`${id}-${c.value}`}
        label={c.label}
        small
        value
        key={c.value}
        disabled={isDisabled}
        className={isDisabled ? 'tm-checkbox-disabled-alternate' : ''}
      />
    ))}
  </div>
);

CheckboxList.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isDisabled: PropTypes.bool,
};

CheckboxList.defaultProps = {
  isDisabled: false,
};

export default CheckboxList;
