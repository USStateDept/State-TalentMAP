import { indexOf } from 'lodash';
import PropTypes from 'prop-types';
import CheckBox from '../../CheckBox';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS, EMPTY_FUNCTION } from '../../../Constants/PropTypes';

const CheckboxList = ({ list, editMode, updateClassifications,
  input }) => (

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
      const checked = indexOf(input, c.code) > -1;
      return (
        <CheckBox
          id={c.code}
          label={c.text}
          small
          value={checked}
          key={c.code}
          disabled={editMode}
          className="tm-checkbox-disabled-alternate"
          onChange={updateClassifications}
        />
      );
    })
    }
  </div>
);

CheckboxList.propTypes = {
  list: CLASSIFICATIONS,
  editMode: PropTypes.bool,
  updateClassifications: PropTypes.function,
  input: CLIENT_CLASSIFICATIONS,
};

CheckboxList.defaultProps = {
  isDisabled: false,
  list: [],
  input: [],
  editMode: false,
  updateClassifications: EMPTY_FUNCTION,
};

export default CheckboxList;
