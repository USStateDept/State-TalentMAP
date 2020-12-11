/* eslint-disable no-console */
import { indexOf } from 'lodash';
import PropTypes from 'prop-types';
import CheckBox from '../../CheckBox';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS, EMPTY_FUNCTION } from '../../../Constants/PropTypes';

const CheckboxList = ({ list, clientClassifications, editMode, updateClassifications,
  getClassifications }) => (

  <div className="client-checkbox-list">
    <CheckBox
      id="key"
      label="Bidder Has Classification"
      small
      value
      key="key"
      disabled
      checked
      className="tm-checkbox-disabled-alternate"
    />
    {list.map((c) => {
      const checked = indexOf(clientClassifications, c.code) > -1;
      console.log(checked);
      return (
        <CheckBox
          id={c.code}
          label={c.text}
          small
          // **** value is causing the error
          // with the blue check not appearing ****
          // value={checked} // adds check marks when true
          // value
          key={c.code}
          disabled={editMode}
          checked={checked}
          className="tm-checkbox-disabled-alternate"
          onChange={(h) => updateClassifications(h)}
          getClassifications={getClassifications}
        />
      );
    })
    }
  </div>
);

CheckboxList.propTypes = {
  list: CLASSIFICATIONS,
  clientClassifications: CLIENT_CLASSIFICATIONS,
  editMode: PropTypes.bool,
  updateClassifications: PropTypes.function,
  getClassifications: PropTypes.func.isRequired,
};

CheckboxList.defaultProps = {
  isDisabled: false,
  list: [],
  clientClassifications: [],
  editMode: false,
  updateClassifications: EMPTY_FUNCTION,
};

export default CheckboxList;
