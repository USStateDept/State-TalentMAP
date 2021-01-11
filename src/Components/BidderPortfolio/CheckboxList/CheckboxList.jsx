/* eslint-disable no-console */
import { indexOf } from 'lodash';
import PropTypes from 'prop-types';
import CheckBox from '../../CheckBox';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS, EMPTY_FUNCTION } from '../../../Constants/PropTypes';

const CheckboxList = ({ list, editMode, updateClassifications,
  getClassifications, input }) => (

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
      // const checked = indexOf(clientClassifications, c.code) > -1;
      // console.log(input, 'input right now');
      const checked = indexOf(input, c.code) > -1;
      // console.log('input checkboxlist', input);
      // console.log('this is c:', c);
      // console.log('this is c.code:', c.code);
      return (
        <CheckBox
          id={c.code}
          label={c.text}
          small
          value={checked}
          key={c.code}
          disabled={editMode}
          // checked={checked}
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
  // clientClassifications: CLIENT_CLASSIFICATIONS,
  editMode: PropTypes.bool,
  updateClassifications: PropTypes.function,
  getClassifications: PropTypes.func.isRequired,
  input: CLIENT_CLASSIFICATIONS,
};

CheckboxList.defaultProps = {
  isDisabled: false,
  list: [],
  // clientClassifications: [],
  input: [],
  editMode: false,
  updateClassifications: EMPTY_FUNCTION,
};

export default CheckboxList;
