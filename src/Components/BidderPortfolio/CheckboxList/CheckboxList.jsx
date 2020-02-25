import React from 'react';
import { indexOf } from 'lodash';
import CheckBox from '../../CheckBox';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS } from '../../../Constants/PropTypes';

const CheckboxList = ({ list, clientClassifications }) => (

  <div className="client-checkbox-list">
    {list.map((c) => {
      const checked = indexOf(clientClassifications, c.code) > -1;
      return (
        <CheckBox
          id={c.id}
          label={c.text}
          small
          value={checked}
          key={c.code}
          disabled
          checked={checked}
          className="tm-checkbox-disabled-alternate"
        />
      );
    })
  }
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
