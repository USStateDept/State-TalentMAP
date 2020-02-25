import React from 'react';
import CheckBox from '../../CheckBox';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS } from '../../../Constants/PropTypes';

const CheckboxList = ({ list, clientClassifications }) => (

  <div className="client-checkbox-list">
    {list.map(c => (
      <CheckBox
        id={c.id}
        label={c.text}
        small
        value={clientClassifications.indexOf(c.code) > -1}
        key={c.code}
        disabled
        checked={clientClassifications.indexOf(c.code) > -1}
        className={'tm-checkbox-disabled-alternate'}
      />
    ))}
  </div>
);

CheckboxList.propTypes = {
  list: CLASSIFICATIONS,
  clientClassifications: CLIENT_CLASSIFICATIONS,
};

CheckboxList.defaultProps = {
  isDisabled: false,
  list: [],
  clientClassifications: [],
};

export default CheckboxList;
